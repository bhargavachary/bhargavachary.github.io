// Performance optimizations for BhargavAchary.in
// CRITICAL: Force override navbar styles immediately (before DOMContentLoaded)
(function() {
    // Inject critical inline styles that will override EVERYTHING
    const style = document.createElement('style');
    style.id = 'navbar-flicker-fix-critical';
    style.textContent = `
        /* Maximum priority override for navbar white flicker */
        .navbar.is-primary a.navbar-item:hover,
        .navbar.is-primary a.navbar-item:focus,
        .navbar.is-primary a.navbar-item:active,
        .navbar.is-primary .navbar-item:hover,
        .navbar.is-primary .navbar-item:focus,
        .navbar.is-primary .navbar-item:active,
        .navbar.is-primary .navbar-link:hover,
        .navbar.is-primary .navbar-link:focus,
        .navbar.is-primary .navbar-link:active {
            background-color: rgba(255, 255, 255, 0.1) !important;
            color: white !important;
            transition: background-color 200ms ease !important;
        }

        /* Disable tap highlight globally */
        .navbar-item, .navbar-link {
            -webkit-tap-highlight-color: transparent !important;
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            user-select: none !important;
        }
    `;

    // Insert as first style tag in head (highest priority)
    const firstStyle = document.querySelector('style, link[rel="stylesheet"]');
    if (firstStyle) {
        document.head.insertBefore(style, firstStyle);
    } else {
        document.head.appendChild(style);
    }
})();

// ===================================
// DARK MODE TOGGLE - Initialize theme early
// ===================================
(function() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
})();

// Function to initialize theme toggle - can be called multiple times safely
// This uses event delegation on the document to ensure it always works
(function() {
    'use strict';

    const html = document.documentElement;
    let isInitialized = false;

    // Toggle theme function
    function toggleTheme(e) {
        console.log('toggleTheme called via delegation!', e);

        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        console.log('Switching from', currentTheme, 'to', newTheme);

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#000000' : '#ffffff');
        }

        // Track theme change
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'event_category': 'UI',
                'event_label': newTheme
            });
        }

        console.log('Theme toggle complete');
        return false;
    }

    // Use event delegation at document level - this ALWAYS works regardless of DOM changes
    function initThemeToggleWithDelegation() {
        if (isInitialized) {
            console.log('Theme toggle already initialized via delegation');
            return;
        }

        console.log('Initializing theme toggle with event delegation');

        // Click handler with delegation - HIGHEST PRIORITY
        document.addEventListener('click', function(e) {
            // Multiple ways to identify theme toggle for maximum reliability
            const toggle = e.target.closest('#theme-toggle') ||
                          e.target.closest('[data-theme-toggle]') ||
                          e.target.closest('.theme-toggle-item');
            if (toggle) {
                console.log('Theme toggle click captured!');
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation(); // CRITICAL: Stop ALL other listeners
                toggleTheme(e);
                return false;
            }
        }, true); // Use capture phase - fires BEFORE bubble phase

        // Keyboard handler with delegation - HIGHEST PRIORITY
        document.addEventListener('keydown', function(e) {
            // Multiple ways to identify theme toggle for maximum reliability
            const toggle = e.target.closest('#theme-toggle') ||
                          e.target.closest('[data-theme-toggle]') ||
                          e.target.closest('.theme-toggle-item');
            if (toggle && (e.key === 'Enter' || e.key === ' ')) {
                console.log('Theme toggle keyboard captured!');
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation(); // CRITICAL: Stop ALL other listeners
                toggleTheme(e);
                return false;
            }
        }, true); // Capture phase

        // Touch handler with delegation - HIGHEST PRIORITY
        document.addEventListener('touchend', function(e) {
            // Multiple ways to identify theme toggle for maximum reliability
            const toggle = e.target.closest('#theme-toggle') ||
                          e.target.closest('[data-theme-toggle]') ||
                          e.target.closest('.theme-toggle-item');
            if (toggle) {
                console.log('Theme toggle touch captured!');
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation(); // CRITICAL: Stop ALL other listeners
                toggleTheme(e);
                return false;
            }
        }, { capture: true, passive: false }); // Capture phase, not passive

        isInitialized = true;
        console.log('Theme toggle initialized successfully with delegation');
    }

    // Initialize immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggleWithDelegation);
    } else {
        initThemeToggleWithDelegation();
    }

    // Also re-initialize on any page visibility change (handles all navigation scenarios)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('Page became visible, ensuring theme toggle works');
            // Just verify button exists, delegation handles the rest
            const toggle = document.getElementById('theme-toggle');
            if (toggle) {
                console.log('Theme toggle button found');
            } else {
                console.warn('Theme toggle button not found on this page');
            }
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    // ===================================
    // Verify theme toggle is ready
    // ===================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        console.log('Theme toggle button present on page');
    } else {
        console.warn('Theme toggle button not found on this page layout');
    }

    // ===================================
    // iOS-STYLE NAVBAR - SIMPLE ZOOM ON CLICK
    // ===================================

    // EXCLUDE theme toggle from zoom effect
    document.querySelectorAll('.navbar-item:not(.theme-toggle-item), .navbar-link').forEach(el => {
        // Click: Subtle zoom in
        el.addEventListener('mousedown', function(e) {
            // Subtle zoom in - reduced from 0.88 to 0.96 for less dramatic effect
            this.style.transition = 'transform 50ms cubic-bezier(0.4, 0, 1, 1)';
            this.style.transform = 'scale(0.96)';
        });

        // Release: Zoom back smoothly
        el.addEventListener('mouseup', function() {
            // Smooth return without excessive bounce
            this.style.transition = 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'scale(1)';
        });

        // If mouse leaves while pressed, reset
        el.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 150ms ease-out';
            this.style.transform = 'scale(1)';
        });
    });

    // Enhance burger menu with smooth rotation
    const burger = document.querySelector('.navbar-burger');
    if (burger) {
        burger.addEventListener('click', function() {
            this.style.transform = this.classList.contains('is-active')
                ? 'scale(0.95) rotate(90deg)'
                : 'scale(1)';
        });
    }
    // Enhanced performance monitoring
    const performanceMonitor = {
        metrics: {},
        
        // Track Core Web Vitals
        trackCoreWebVitals() {
            if ('PerformanceObserver' in window) {
                // Track Largest Contentful Paint (LCP)
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = lastEntry.startTime;
                    console.log('LCP:', lastEntry.startTime);
                    
                    // Send to analytics if available
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'web_vitals', {
                            'event_category': 'Web Vitals',
                            'event_label': 'LCP',
                            'value': Math.round(lastEntry.startTime)
                        });
                    }
                }).observe({ type: 'largest-contentful-paint', buffered: true });

                // Track First Input Delay (FID)
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        const fid = entry.processingStart - entry.startTime;
                        this.metrics.fid = fid;
                        console.log('FID:', fid);
                        
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'web_vitals', {
                                'event_category': 'Web Vitals',
                                'event_label': 'FID',
                                'value': Math.round(fid)
                            });
                        }
                    });
                }).observe({ type: 'first-input', buffered: true });

                // Track Cumulative Layout Shift (CLS)
                let clsValue = 0;
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    this.metrics.cls = clsValue;
                    console.log('CLS:', clsValue);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'web_vitals', {
                            'event_category': 'Web Vitals',
                            'event_label': 'CLS',
                            'value': Math.round(clsValue * 1000)
                        });
                    }
                }).observe({ type: 'layout-shift', buffered: true });
            }
        },
        
        // Track custom performance metrics
        trackCustomMetrics() {
            // Time to first byte
            if (window.performance && window.performance.timing) {
                const ttfb = window.performance.timing.responseStart - window.performance.timing.requestStart;
                this.metrics.ttfb = ttfb;
                console.log('TTFB:', ttfb);
            }
            
            // DOM content loaded time
            window.addEventListener('DOMContentLoaded', () => {
                const domTime = performance.now();
                this.metrics.domContentLoaded = domTime;
                console.log('DOM Content Loaded:', domTime);
            });
            
            // Window load time
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                this.metrics.windowLoad = loadTime;
                console.log('Window Load:', loadTime);
            });
        }
    };
    
    // Initialize performance monitoring
    performanceMonitor.trackCoreWebVitals();
    performanceMonitor.trackCustomMetrics();

    // Advanced lazy loading with intersection observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        // Track image loading performance
                        const startTime = performance.now();
                        
                        // Preload image for smoother transition
                        const imageLoader = new Image();
                        imageLoader.onload = () => {
                            const loadTime = performance.now() - startTime;
                            console.log(`Image loaded in ${loadTime}ms:`, img.dataset.src);
                            
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            img.classList.remove('lazy-image');
                            
                            // Track successful image loads
                            if (typeof gtag !== 'undefined') {
                                gtag('event', 'image_load', {
                                    'event_category': 'Performance',
                                    'event_label': 'Lazy Load Success',
                                    'value': Math.round(loadTime)
                                });
                            }
                        };
                        imageLoader.onerror = () => {
                            console.error('Failed to load image:', img.dataset.src);
                            // Track failed image loads
                            if (typeof gtag !== 'undefined') {
                                gtag('event', 'image_error', {
                                    'event_category': 'Performance',
                                    'event_label': 'Lazy Load Error'
                                });
                            }
                        };
                        imageLoader.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            // Load images 50px before they come into view
            rootMargin: '50px',
            threshold: 0.01
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src], .lazy-image').forEach(img => {
            imageObserver.observe(img);
        });

        // Prefetch links on hover for faster navigation
        const linkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = entry.target;
                    link.addEventListener('mouseenter', prefetchLink, { once: true });
                    linkObserver.unobserve(link);
                }
            });
        });

        document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]').forEach(link => {
            linkObserver.observe(link);
        });
    }

    // Prefetch link on hover with performance tracking
    function prefetchLink(e) {
        const startTime = performance.now();
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = e.target.href;
        link.onload = () => {
            const prefetchTime = performance.now() - startTime;
            console.log(`Link prefetched in ${prefetchTime}ms:`, e.target.href);
        };
        document.head.appendChild(link);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Track anchor link usage
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'anchor_click', {
                        'event_category': 'Navigation',
                        'event_label': this.getAttribute('href')
                    });
                }
            }
        });
    });

    // ===================================
    // MODERN ANIMATION ENGINE (iOS-Style)
    // ===================================

    // Scroll-driven animations with IntersectionObserver (opt-in only)
    const scrollReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add visible class immediately (no artificial delay)
                entry.target.classList.add('scroll-reveal-visible');
                scrollReveal.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Only observe elements that explicitly opt-in
    document.querySelectorAll('.scroll-reveal, .animate-on-scroll').forEach(el => {
        scrollReveal.observe(el);
    });

    // Smart detection: Only animate cards that are below the fold
    const viewportHeight = window.innerHeight;
    document.querySelectorAll('.card').forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        // If card is below viewport, add subtle scroll reveal
        if (rect.top > viewportHeight) {
            card.classList.add('scroll-reveal', 'reveal-fade-up');
            scrollReveal.observe(card);
        }
        // If card is visible on load, show immediately with no animation
        else {
            card.style.opacity = '1';
            card.style.transform = 'none';
        }
    });

    // Reading progress indicator with performance optimization
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    // Navbar scroll effect (frosted glass)
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    // Throttled scroll handler for better performance
    let ticking = false;
    function updateProgress() {
        const scrollY = window.scrollY;
        const scrollPercent = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';

        // Add scrolled class to navbar
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    // Parallax effect for hero sections
    const parallaxHero = document.querySelector('.hero.parallax-enabled');
    if (parallaxHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBody = parallaxHero.querySelector('.hero-body');
            if (heroBody) {
                heroBody.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }, { passive: true });
    }

    // Subtle ripple effect (iOS-style, less aggressive)
    function createRipple(event) {
        const element = event.currentTarget;

        // Skip ripple for navbar items (causes white flicker)
        if (element.classList.contains('navbar-item')) {
            return;
        }

        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        // Determine ripple color based on element background
        const isButton = element.classList.contains('button');
        const rippleColor = isButton ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)';

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            background: ${rippleColor};
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.5s ease-out;
            pointer-events: none;
            will-change: transform, opacity;
        `;

        // Add ripple animation once
        if (!document.querySelector('#ripple-animation-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation-style';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(3);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Ensure element has proper positioning (only once)
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        if (getComputedStyle(element).overflow === 'visible') {
            element.style.overflow = 'hidden';
        }

        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    }

    // Add ripple only to buttons and cards (not navbar items)
    document.querySelectorAll('.button, .card').forEach(el => {
        el.addEventListener('click', createRipple);
    });

    // Touch gesture support for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    }, { passive: true });

    function handleGesture() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped up
                console.log('Swipe up detected');
            } else {
                // Swiped down
                console.log('Swipe down detected');

                // Pull to refresh effect (when at top of page)
                if (window.scrollY === 0) {
                    showPullToRefresh();
                }
            }
        }
    }

    // Pull to refresh visual feedback
    function showPullToRefresh() {
        const pullIndicator = document.createElement('div');
        pullIndicator.className = 'pull-refresh pull-refresh-active';
        pullIndicator.innerHTML = '↻';
        pullIndicator.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #3273dc;
        `;
        document.body.appendChild(pullIndicator);

        setTimeout(() => {
            pullIndicator.classList.remove('pull-refresh-active');
            setTimeout(() => pullIndicator.remove(), 300);
        }, 1000);
    }

    // 3D tilt effect disabled - using simple CSS zoom instead
    // The tilt effect has been removed in favor of cleaner centered zoom (handled by CSS)

    // Keyboard navigation enhancements
    let focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    let firstFocusable = document.querySelectorAll(focusableElements)[0];
    let lastFocusable = document.querySelectorAll(focusableElements)[document.querySelectorAll(focusableElements).length - 1];

    // Add focus visible styles dynamically
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Enhance form accessibility and track interactions
    document.querySelectorAll('input, textarea, select').forEach(field => {
        if (!field.hasAttribute('aria-label') && !field.hasAttribute('aria-labelledby')) {
            const label = document.querySelector(`label[for="${field.id}"]`);
            if (label) {
                field.setAttribute('aria-labelledby', label.id || (label.id = 'label_' + field.id));
            }
        }
        
        // Track form interactions
        field.addEventListener('focus', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_interaction', {
                    'event_category': 'Form',
                    'event_label': field.type || 'field'
                });
            }
        });
    });

    // Network information API for adaptive loading
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            console.log('Connection type:', connection.effectiveType);
            console.log('Downlink speed:', connection.downlink, 'Mbps');
            
            // Adapt loading strategy based on connection
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Disable some animations for slow connections
                document.documentElement.style.setProperty('--animation-duration', '0s');
                console.log('Animations disabled for slow connection');
            }
        }
    }

    // Error tracking
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'javascript_error', {
                'event_category': 'Error',
                'event_label': e.error.message,
                'value': 1
            });
        }
    });

    // Track page engagement
    let startTime = Date.now();
    let isVisible = true;
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page became hidden
            const engagementTime = Date.now() - startTime;
            if (typeof gtag !== 'undefined' && isVisible) {
                gtag('event', 'page_engagement', {
                    'event_category': 'Engagement',
                    'event_label': 'Time on Page',
                    'value': Math.round(engagementTime / 1000)
                });
            }
            isVisible = false;
        } else {
            // Page became visible
            startTime = Date.now();
            isVisible = true;
        }
    });
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
                
                // Track SW registration success
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'sw_registered', {
                        'event_category': 'PWA',
                        'event_label': 'Service Worker'
                    });
                }
            })
            .catch(error => {
                console.log('SW registration failed:', error);
                
                // Track SW registration failure
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'sw_error', {
                        'event_category': 'PWA',
                        'event_label': 'Service Worker Error'
                    });
                }
            });
    });
}

/* =========================================================================
   PAGE TRANSITION FADE
   Smooth fade between pages using sessionStorage
   ========================================================================= */

(function() {
    'use strict';

    // Check if we arrived from another page on this site
    const cameFromTransition = sessionStorage.getItem('pageTransition') === 'true';

    if (cameFromTransition) {
        // Fade in when arriving from another page
        document.body.classList.add('page-arrived');
        sessionStorage.removeItem('pageTransition');

        // Remove class after animation completes
        setTimeout(function() {
            document.body.classList.remove('page-arrived');
        }, 200);
    }

    // Fade out when clicking internal links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');

        // CRITICAL: Skip theme toggle button to prevent interference
        if (link && link.id === 'theme-toggle') {
            console.log('Page transition handler: skipping theme toggle');
            return;
        }

        // ALSO: Skip any element with theme-toggle class
        if (link && (link.classList.contains('theme-toggle') || link.classList.contains('theme-toggle-item'))) {
            console.log('Page transition handler: skipping theme toggle item');
            return;
        }

        if (link && link.href && !link.target && !link.hasAttribute('download')) {
            try {
                const url = new URL(link.href);
                const currentUrl = new URL(window.location.href);

                // Only fade out for internal navigation (same origin, different path)
                if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
                    e.preventDefault();

                    // Mark that we're transitioning
                    sessionStorage.setItem('pageTransition', 'true');

                    // Fade out current page
                    document.body.classList.add('page-transitioning');

                    // Navigate after fade out
                    setTimeout(function() {
                        window.location.href = link.href;
                    }, 200);
                }
            } catch (err) {
                // If URL parsing fails, just let the link work normally
                console.log('Link navigation error:', err);
            }
        }
    });
})();

/* =========================================================================
   GREEDY NAVIGATION (Priority+)
   Based on working implementation from bhargavachary.github.io
   Intelligently moves menu items to overflow dropdown based on space
   ========================================================================= */

(function() {
    'use strict';

    function initGreedyNav() {
        const nav = document.querySelector('.greedy-nav');
        if (!nav) return;

        const vlinks = nav.querySelector('.visible-links');
        const hlinks = nav.querySelector('.hidden-links');
        const btn = nav.querySelector('.greedy-nav-btn');
        const navbarContainer = document.querySelector('.navbar .container');
        const navbarBrand = document.querySelector('.navbar-brand');
        const navbarEnd = document.querySelector('.navbar-end');

        if (!vlinks || !hlinks || !btn) return;

        let breaks = [];
        let recursionDepth = 0;
        const MAX_RECURSION = 10;

        function updateNav() {
            // Reset recursion depth
            if (recursionDepth === 0) {
                recursionDepth = 0;
            }

            // Only run on desktop (above 1023px where Bulma keeps navbar visible)
            if (window.innerWidth <= 1023) {
                btn.classList.add('hidden');
                // Move all hidden items back to visible
                while (hlinks.children.length > 0) {
                    vlinks.appendChild(hlinks.children[0]);
                }
                breaks = [];
                recursionDepth = 0;
                return;
            }

            // Prevent infinite recursion
            if (recursionDepth >= MAX_RECURSION) {
                console.warn('Priority+ navigation: max recursion depth reached');
                recursionDepth = 0;
                return;
            }

            // Calculate available space properly
            const containerWidth = navbarContainer ? navbarContainer.offsetWidth : window.innerWidth;
            const brandWidth = navbarBrand ? navbarBrand.offsetWidth : 0;
            const endWidth = navbarEnd ? navbarEnd.offsetWidth : 0;
            const btnWidth = btn.classList.contains('hidden') ? 0 : btn.offsetWidth;
            const padding = 40; // Buffer for margins and padding

            const availableSpace = containerWidth - brandWidth - endWidth - btnWidth - padding;

            // If visible links overflow available space, move last item to hidden
            if (vlinks.offsetWidth > availableSpace && vlinks.children.length > 0) {
                breaks.push(vlinks.offsetWidth);
                const lastItem = vlinks.children[vlinks.children.length - 1];
                if (lastItem) {
                    // Prepend to hidden links (so order is maintained when moved back)
                    hlinks.insertBefore(lastItem, hlinks.children[0]);
                    btn.classList.remove('hidden');
                }

                // Recursively update if still overflowing
                recursionDepth++;
                updateNav();
                return;
            }
            // If space is available and there are hidden items, move first hidden back to visible
            else if (breaks.length > 0 && availableSpace > breaks[breaks.length - 1]) {
                const firstHidden = hlinks.children[0];
                if (firstHidden) {
                    vlinks.appendChild(firstHidden);
                    breaks.pop();
                }

                // Hide button if no more hidden items
                if (breaks.length === 0) {
                    btn.classList.add('hidden');
                }
            }

            recursionDepth = 0;
        }

        // Toggle dropdown on button click
        btn.addEventListener('click', function() {
            hlinks.classList.toggle('is-active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target)) {
                hlinks.classList.remove('is-active');
            }
        });

        // Initial update with delay to let DOM settle
        setTimeout(updateNav, 100);

        // Update on resize with debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateNav, 150);
        });

        // Update when fonts load
        if (document.fonts) {
            document.fonts.ready.then(() => setTimeout(updateNav, 100));
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGreedyNav);
    } else {
        initGreedyNav();
    }
})();
