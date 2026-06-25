import { defineConfig } from 'vite';
import { globSync } from 'glob';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs'; 
import { dirname } from 'path';
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin'; 

// 1. Scan the directory tree for source files
const tsFiles = globSync(['src/**/*.ts']).map(f => f.replace(/\\/g, '/'));
const scssFiles = globSync(['src/**/*.scss']).map(f => f.replace(/\\/g, '/'));

const folderBundles = {};

// Group TS files by parent folder name
tsFiles.forEach(file => {
  const folderName = dirname(file).split('/').pop().toLowerCase();
  if (!folderBundles[folderName]) folderBundles[folderName] = { ts: [], scss: [] };
  folderBundles[folderName].ts.push(file);
});

// Group SCSS files by parent folder name
scssFiles.forEach(file => {
  const folderName = dirname(file).split('/').pop().toLowerCase();
  if (!folderBundles[folderName]) folderBundles[folderName] = { ts: [], scss: [] };
  folderBundles[folderName].scss.push(file);
});

// Create Rollup entries map
const rollupInputs = {};
Object.keys(folderBundles).forEach(folder => {
  rollupInputs[folder] = `virtual-entry-${folder}`;
});

export default defineConfig({
  plugins: [
    {
      name: 'dynamic-folder-bundle-plugin',
      resolveId(id) {
        if (id.startsWith('virtual-entry-')) return id;
      },
      load(id) {
        // Return a clean baseline mock target string to satisfy Vite's entry compiler pipeline
        if (id.startsWith('virtual-entry-')) return 'export const init = true;';
      },
      //Fires after Vite wraps up, manually outputting files with full mapping traces
      async closeBundle() {
        // Explicitly clear out old compiled js and css assets while preserving other assets assets
        rmSync('assets/js', { recursive: true, force: true });
        rmSync('assets/css', { recursive: true, force: true });

        // Ensure both subdirectories are generated cleanly
        mkdirSync('assets/js', { recursive: true });
        mkdirSync('assets/css', { recursive: true });

        for (const [folderName, bundle] of Object.entries(folderBundles)) {
          
          // A. PROCESS JAVASCRIPT BUNDLE (Alphabetically Sorted with Native Maps)
          if (bundle.ts.length > 0) {
            const sortedTsFiles = [...bundle.ts].sort((a, b) => a.localeCompare(b));
            const rawTsCode = sortedTsFiles.map(file => readFileSync(file, 'utf-8')).join('\n\n');

            const result = await esbuild.transform(rawTsCode, {
              loader: 'ts',
              minifyIdentifiers: false, 
              minifyWhitespace: true,
              minifySyntax: true,
              sourcemap: true,
              sourcefile: `src/${folderName}-bundle.ts`
            });

            // Write targets moved into assets/js/ folder with the embedded comment map
            const outputCodeWithMapLink = `${result.code}\n//# sourceMappingURL=${folderName}.js.map`;
            writeFileSync(`assets/js/${folderName}.js`, outputCodeWithMapLink);
            if (result.map) writeFileSync(`assets/js/${folderName}.js.map`, result.map);
          }

          // B. PROCESS CSS BUNDLE (Alphabetically Sorted with Forced Source Maps)
          if (bundle.scss.length > 0) {
            const sortedScssFiles = [...bundle.scss].sort((a, b) => a.localeCompare(b));
            
            // Build an absolute mapping manifest block string for Esbuild's preprocessor
            const scssEntries = sortedScssFiles.map(file => `@import "${file}";`).join('\n');
            
            // Compile styles manually. This successfully forces the creation of a physical .css.map file
            const cssResult = await esbuild.build({
              stdin: {
                contents: scssEntries,
                resolveDir: process.cwd(),
                loader: 'css'
              },
              bundle: true,
              minify: true,
              sourcemap: true, 
              outfile: `assets/css/${folderName}.css`, // Output path targets assets/css/ folder
              plugins: [sassPlugin()],
              write: false // Passes tracking files directly to memory buffers first
            });

            // Write the generated stylesheet and map assets natively straight hard drive
            for (const file of cssResult.outputFiles) {
              writeFileSync(file.path, file.text);
            }
          }
        }
      },
      // Clear out intermediate framework chunks completely before they touch the drive
      generateBundle(options, bundle) {
        Object.keys(bundle).forEach(fileName => {
          delete bundle[fileName];
        });
      }
    }
  ],
  build: {
    outDir: 'assets',
    emptyOutDir: false, // STOP VITE FROM AUTOMATICALLY CLEARING THE ASSETS FOLDER
    minify: true,
    cssCodeSplit: true,
    sourcemap: true,
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: rollupInputs,
      output: {
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
