//## UTILS ANIMATION

// Interface for the animation configuration options
interface CctAnimateOptions {
    elem: JQuery<HTMLElement>;
    state: boolean;
    callbackStart?: (state: boolean) => void;
    callbackEnd?: (state: boolean) => void;
}

// Interface specifically for animating a table row
interface CctAnimateRowOptions {
    row: JQuery<HTMLElement>;
    state: boolean;
    callbackStart?: (state: boolean) => void;
    callbackEnd?: (state: boolean) => void;
}

// Interface for structural transition property maps
interface TransitionStyles {
    stylesBefore: JQuery.PlainObject<string | number>;
    stylesAfter: JQuery.PlainObject<string | number>;
    duration: number;
}

const _cctAnimateBlock = ({ elem, state, callbackStart, callbackEnd }: CctAnimateOptions): Promise<boolean> => {

    return new Promise((resolve) => {
        
        // Apply css styles to block
        elem.addClass("slide-area");
        
        // CallbackStart function requested
        if (callbackStart) callbackStart(state);

        // Clear any pending listener from previous clicks
        const oldTimer = elem.data('cct-timer') as number | undefined;
        if (oldTimer) clearTimeout(oldTimer);

        // Internal callback function 
        const finish = (targetState: boolean): void => {
            
            // clear timer
            const currentTimer = elem.data('cct-timer') as number | undefined;
            if (currentTimer) clearTimeout(currentTimer);
              
            // add class hidden if closing  
            if (!targetState) elem.addClass('hidden');
            
            // clean up
            elem.removeClass("slide-area is-closing is-opening");
            elem.css({ 'max-height': '', 'opacity': '', 'transition-duration': '' }); 
            // remove the style attribute from the animated element if the attribute is now empty
            elem.filter('[style=""]').removeAttr('style');
                
            // CallbackEnd function requested
            if (callbackEnd) callbackEnd(targetState);
            
            // resolve
            resolve(targetState);
            
        };
        
        // Internal transition function
        const applyTransition = ({ stylesBefore, stylesAfter, duration }: TransitionStyles): void => {
            
            // Set initial states
            elem.css(stylesBefore);
        
            // Force the reflow inside the frame
            const firstNode = elem[0];
            const reflow = firstNode ? firstNode.offsetHeight : 0; 
    
            // Start transition
            const className = state ? 'is-opening' : 'is-closing';
            elem.addClass(className).css(stylesAfter);
                
            // End of transition Listener
            elem.data('cct-timer', window.setTimeout(() => finish(state), duration));

        };
                
        // OPENING
        if (state) {
            
            // DOM styles - Make visible but clamped to 0 max-height
            elem.css({
                'max-height'    : '0', 
                'opacity'       : '0',
            }).removeClass('is-closing hidden');
                
            // Capture current height 
            const firstNode = elem.get(0);
            const actualHeight = firstNode ? firstNode.scrollHeight + 20 : 20; 
                
            // Calculate raw value based on 75ms per 100px ratio + 100ms
            const rounded = (Math.round(actualHeight / 100) * 75) + 100;
                
            // Clamp between 300ms and 600ms
            const duration = Math.min(600, Math.max(300, rounded));
                
            // Apply transition
            applyTransition({
                stylesBefore  : {
                    'transition-duration'   : `${duration}ms, 450ms`,
                },
                stylesAfter  : {
                    'max-height'            : actualHeight + 'px',
                    'opacity'               : '1'
                },
                duration
            });

        } else {
            // CLOSING

            // Short transition-speed for closing
            const duration = 300; 
            
            // Capture current height 
            const firstNode = elem.get(0);
            const actualHeight = firstNode ? firstNode.scrollHeight + 20 : 20; 
            
            // DOM styles
            elem.removeClass('is-opening');
            
            // Apply transition
            applyTransition({
                stylesBefore  : {
                    'transition-duration'   : `${duration}ms, 350ms`,
                    'max-height'            : actualHeight + 'px',
                    'opacity'               : '1',
                },
                stylesAfter  : {
                    'max-height'          : '',
                    'opacity'             : ''
                },
                duration
            });
            
        }
        
    });

};
            

// Animate Row
const _cctAnimateRow = ({ row, state, callbackStart, callbackEnd }: CctAnimateRowOptions): void => {

    const $tds: JQuery<HTMLElement> = row.find('> td');
    
    // Wrap
    const wrap = (): void => {
        const $divs = $tds.find('> .cct-row-animate-toggle');

        if ($divs.length) return;
            
        const hiddenClass = state ? ' hidden' : '';

        $tds.wrapInner(function (this: HTMLElement) {
            const $td = $(this);
            
            // Shift X-Padding and X-Borders to divs
            const styleObj: Record<string, string> = {};
            const defaultTdCssProp = (prop: string, val: string): void => {
                if (parseFloat(val) > 0) {
                    styleObj[prop] = val;
                    const nativeTd = $td[0];
                    if (nativeTd) {
                        nativeTd.style.setProperty(prop, '0', 'important');
                    }
                }
            };
                
            (['top', 'bottom'] as const).forEach(side => {
                // Capture Padding
                const padProp = `padding-${side}`;
                const padVal = $td.css(padProp) as string;
                defaultTdCssProp(padProp, padVal);
            });
            
            const styleAttr = Object.entries(styleObj).length 
                ? ` style="${Object.entries(styleObj).map(([p, v]) => `${p}:${v}`).join(';')}"` 
                : '';
            
            // Wrap the original HTML inside the inner styled div
            return `<div class="cct-row-animate-toggle${hiddenClass}"><div class="cct-row-animate-toggle__spacingWrapper"${styleAttr}></div></div>`;
        });
    };
    
    // Animate
    const animate = (): Promise<boolean> => {
        const $divs = $tds.find('> .cct-row-animate-toggle');
        
        // callback start
        const callbackStartCombined = (cbState: boolean): void => {
            // show wrapping row
            if (cbState) row.removeClass('hidden');
            
            // Run callbackStart passed to the function
            if (callbackStart) callbackStart(cbState);
        };
        
        // callback end
        const callbackEndCombined = (cbState: boolean): void => {
            // hide wrapping row
            if (!cbState) row.addClass('hidden');

            // Run callbackEnd passed to the function
            if (callbackEnd) callbackEnd(cbState);
        };
        
        // animate divs
        return _cctAnimateBlock({ elem: $divs, state, callbackStart: callbackStartCombined, callbackEnd: callbackEndCombined });
    };

    // Unwrap
    const unwrap = (): void => {
        const $tdsInternal = row.find('> td');
        const $divs = $tdsInternal.find('> .cct-row-animate-toggle');
    
        if (!$divs.length) return;
        
        // Restore original TD padding and border by removing inline overrides
        $tdsInternal.css({ 'padding-top': '', 'padding-bottom': '' });
        
        // Remove the style attribute from the td if it's now empty
        $tdsInternal.filter('[style=""]').removeAttr('style');
    };

    // Orchestrate workflow actions based on internal states
    if (state) {
        wrap();
        animate();
    } else {
        animate().then((endedState) => {
            if (!endedState) {
                unwrap();
            }
        });
    }
};


    //toggle visibility of fields and sections
interface VisibilityToggleOptions {
  elems: JQuery;
  state?: boolean | null;
  animate?: boolean;
  callbackStart?: ((toShow: boolean) => void) | false;
  callbackEnd?: ((toShow: boolean) => void) | false;
}


// Toggle visibility of fields and sections
interface VisibilityToggleOptions {
  elems: JQuery;
  state?: boolean | null;
  animate?: boolean;
  callbackStart?: ((toShow: boolean) => void) | false;
  callbackEnd?: ((toShow: boolean) => void) | false;
}

// Toggle visibility of fields and sections
const cctVisibilityToggle = ({
  elems,
  state = null,
  animate = true,
  callbackStart = false,
  callbackEnd = false
}: VisibilityToggleOptions): void => {

  elems.each(function(this: HTMLElement, index: number) {
    const elem: JQuery = $(this);
    const isHidden: boolean = elem.hasClass("hidden");
    const toShow: boolean = state === null ? isHidden : state;
    
    // Action only if there is a change of state
    if (toShow === isHidden) {
      // Animation
      const applyAnimate: boolean = elem.hasClass('cct-no-toggle-animation') ? false : animate;
      if (applyAnimate) {
        // 🚀 FIX: Convert boolean 'false' to 'undefined' to satisfy the strict signature expectations of your animation functions
        const options = { 
          state: toShow, 
          callbackStart: callbackStart || undefined, 
          callbackEnd: callbackEnd || undefined 
        };
        const isTr: boolean = elem.is('tr');
        
        // Animate table row
        if (isTr) {
          _cctAnimateRow({ row: elem, ...options });
        } else {
          // Animate block element
          _cctAnimateBlock({ elem, ...options });
        }
      } else {
        // No animation
        if (callbackStart) callbackStart(toShow);
        elem.toggleClass('hidden', !toShow);
        if (callbackEnd) callbackEnd(toShow);
      }
    }
  });

};
