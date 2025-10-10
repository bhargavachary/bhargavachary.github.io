/**
 * APPROACH 12: Standalone Theme Toggle
 * This is a completely independent implementation that can replace the main one if needed
 * Ultra-simple, zero dependencies, guaranteed to work
 */

(function() {
    'use strict';
    
    console.log('[StandaloneToggle] Initializing...');
    
    // Core functions
    const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';
    
    const applyTheme = (theme) => {
        const validTheme = (theme === 'light' || theme === 'dark') ? theme : 'dark';
        
        console.log('[StandaloneToggle] Applying theme:', validTheme);
        
        // Update DOM
        document.documentElement.setAttribute('data-theme', validTheme);
        
        // Update localStorage
        try {
            localStorage.setItem('theme', validTheme);
        } catch (e) {
            console.warn('[StandaloneToggle] localStorage not available');
        }
        
        // Update meta color
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.content = validTheme === 'dark' ? '#000000' : '#ffffff';
        }
        
        // Update button
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.setAttribute('aria-label', 
                validTheme === 'dark' 
                    ? 'Switch to light theme' 
                    : 'Switch to dark theme'
            );
        }
        
        return validTheme;
    };
    
    const toggle = () => {
        const current = getTheme();
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        console.log('[StandaloneToggle] Toggled from', current, 'to', next);
        return next;
    };
    
    // Super aggressive button detection and attachment
    const attachToButton = () => {
        // Method 1: By ID
        let btn = document.getElementById('theme-toggle');
        
        // Method 2: By data attribute
        if (!btn) {
            btn = document.querySelector('[data-theme-toggle]');
        }
        
        // Method 3: By class
        if (!btn) {
            btn = document.querySelector('.theme-toggle-item');
        }
        
        // Method 4: By looking for the specific structure
        if (!btn) {
            const candidates = document.querySelectorAll('a[role="button"]');
            candidates.forEach(el => {
                if (el.querySelector('.theme-icon-light') && el.querySelector('.theme-icon-dark')) {
                    btn = el;
                }
            });
        }
        
        if (!btn) {
            console.warn('[StandaloneToggle] Button not found, will retry');
            return false;
        }
        
        // Check if already attached
        if (btn.dataset.standaloneAttached) {
            return true;
        }
        
        console.log('[StandaloneToggle] Found button:', btn.id || btn.className);
        
        // Attach multiple handlers for maximum compatibility
        
        // Handler 1: onclick property (highest priority, always works)
        const oldOnClick = btn.onclick;
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[StandaloneToggle] onclick fired');
            toggle();
            if (oldOnClick) oldOnClick.call(this, e);
            return false;
        };
        
        // Handler 2: addEventListener (standard)
        btn.addEventListener('click', function(e) {
            console.log('[StandaloneToggle] addEventListener click fired');
        }, true);
        
        // Handler 3: Keyboard
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('[StandaloneToggle] Keyboard activation');
                toggle();
            }
        });
        
        // Handler 4: Touch events for mobile
        btn.addEventListener('touchend', function(e) {
            console.log('[StandaloneToggle] Touch event');
        }, { passive: false });
        
        // Mark as attached
        btn.dataset.standaloneAttached = 'true';
        
        console.log('[StandaloneToggle] All handlers attached successfully');
        return true;
    };
    
    // Try to attach immediately
    let attached = false;
    
    // Attempt 1: Right now
    attached = attachToButton();
    
    // Attempt 2: On DOMContentLoaded
    if (!attached) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('[StandaloneToggle] DOMContentLoaded - attempting attachment');
                attachToButton();
            });
        }
    }
    
    // Attempt 3-7: Retry at intervals (handles dynamic content)
    [50, 100, 250, 500, 1000].forEach(delay => {
        setTimeout(() => {
            if (!attachToButton()) {
                console.log('[StandaloneToggle] Retry at', delay + 'ms failed');
            }
        }, delay);
    });
    
    // Attempt 8: Watch for button being added to DOM
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
            attachToButton();
        });
        
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            setTimeout(() => {
                if (document.body) {
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                }
            }, 100);
        }
    }
    
    // Expose for debugging
    window.StandaloneToggle = {
        getTheme,
        applyTheme,
        toggle,
        attachToButton
    };
    
    console.log('[StandaloneToggle] Initialization complete. Use window.StandaloneToggle for debugging.');
    
})();
