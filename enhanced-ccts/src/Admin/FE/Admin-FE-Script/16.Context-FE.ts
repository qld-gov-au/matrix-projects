//Observe when Matrix context changes (loading starts and loading finishes)
//load functions on change of context as needed.


// Target the native DOM overlay element with strict element/null handling
const loadingOverlay = document.querySelector('[data-react="loading-overlay"]') as HTMLElement | null;

// Arrays of functions to run on change of context - explicitly typed as arrays of executable actions
const onLoadingStart: Array<() => void> = [ 
    cctCloseModal // close modal when moving between pages
];
const onLoadingEnd: Array<() => void> = [];

if (loadingOverlay) { 
    new MutationObserver((): void => {
        // Fallback textContent to an empty string if it evaluates to null at runtime
        const overlayText = loadingOverlay.textContent || "";
        const isLoading = loadingOverlay.children.length > 0 || overlayText.trim().length > 0;
        
        // Pick the correct array based on state
        const taskList = isLoading ? onLoadingStart : onLoadingEnd;

        // Execute each function in the list safely
        taskList.forEach((fn) => { fn(); });

    }).observe(loadingOverlay, { childList: true, characterData: true, subtree: true });
}
