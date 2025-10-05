/**
 * Search functionality for BhargavAchary.in
 * Uses Fuse.js for fuzzy/semantic search across posts
 */
(function() {
    'use strict';

    // Configuration
    const SEARCH_CONFIG = {
        debounceDelay: 300,
        maxResults: 50,
        minCharacters: 2,
        fuseOptions: {
            includeScore: true,
            includeMatches: true,
            threshold: 0.4,
            ignoreLocation: true,
            keys: [
                { name: 'title', weight: 3 },
                { name: 'categories', weight: 2 },
                { name: 'tags', weight: 2 },
                { name: 'excerpt', weight: 1.5 },
                { name: 'content', weight: 1 }
            ]
        }
    };

    let searchData = [];
    let fuse = null;
    let debounceTimer = null;
    let selectedIndex = -1;

    // DOM elements
    const modal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchResultsStatus = document.getElementById('search-results-status');
    const searchClearBtn = document.getElementById('search-clear');
    const searchButton = document.getElementById('search-button');

    /**
     * Initialize search functionality
     */
    function init() {
        if (!modal || !searchInput || !searchResults) {
            console.warn('Search components not found on this page');
            return;
        }

        loadSearchData();
        attachEventListeners();
    }

    /**
     * Load search data from JSON endpoint
     */
    function loadSearchData() {
        fetch('/search.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load search data');
                }
                return response.json();
            })
            .then(data => {
                searchData = data;
                fuse = new Fuse(searchData, SEARCH_CONFIG.fuseOptions);
            })
            .catch(error => {
                console.error('Error loading search data:', error);
                showError('Failed to load search data. Please try again later.');
            });
    }

    /**
     * Attach event listeners
     */
    function attachEventListeners() {
        // Open search modal
        if (searchButton) {
            searchButton.addEventListener('click', openModal);
        }

        // Close modal events
        const closeButtons = modal.querySelectorAll('[data-search-close]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        // Search input events
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('keydown', handleKeyNavigation);

        // Clear button
        if (searchClearBtn) {
            searchClearBtn.addEventListener('click', clearSearch);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', handleGlobalKeyboard);

        // Click on result
        searchResults.addEventListener('click', handleResultClick);

        // Prevent modal close when clicking inside container
        const container = modal.querySelector('.search-modal-container');
        if (container) {
            container.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    /**
     * Open search modal
     */
    function openModal(e) {
        if (e) {
            e.preventDefault();
        }

        modal.classList.add('is-active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus search input after a brief delay for animation
        setTimeout(() => {
            searchInput.focus();
        }, 100);

        // Reset search state
        selectedIndex = -1;
    }

    /**
     * Close search modal
     */
    function closeModal() {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Clear search when closing
        clearSearch();
    }

    /**
     * Handle search input
     */
    function handleSearchInput(e) {
        const query = e.target.value.trim();

        // Show/hide clear button
        if (searchClearBtn) {
            searchClearBtn.style.display = query.length > 0 ? 'flex' : 'none';
        }

        // Debounce search
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(query);
        }, SEARCH_CONFIG.debounceDelay);
    }

    /**
     * Perform search
     */
    function performSearch(query) {
        selectedIndex = -1;

        if (!fuse) {
            showError('Search is still loading. Please wait...');
            return;
        }

        if (query.length === 0) {
            showEmptyState();
            return;
        }

        if (query.length < SEARCH_CONFIG.minCharacters) {
            showMessage(`Type at least ${SEARCH_CONFIG.minCharacters} characters to search...`);
            return;
        }

        // Perform search
        const results = fuse.search(query, { limit: SEARCH_CONFIG.maxResults });

        if (results.length === 0) {
            showNoResults(query);
        } else {
            displayResults(results, query);
        }

        // Update status for screen readers
        updateResultsStatus(results.length, query);
    }

    /**
     * Display search results
     */
    function displayResults(results, query) {
        let html = '<div class="search-results-list">';

        results.forEach((result, index) => {
            const post = result.item;
            const score = result.score;
            
            // Highlight matching text
            let title = highlightMatches(post.title, result.matches, 'title');
            let excerpt = highlightMatches(post.excerpt, result.matches, 'excerpt');

            html += `
                <article class="search-result-item" data-index="${index}" data-url="${post.url}" tabindex="0" role="button">
                    <div class="search-result-content">
                        <h3 class="search-result-title">${title}</h3>
                        <p class="search-result-excerpt">${excerpt}</p>
                        <div class="search-result-meta">
                            <span class="search-result-date">
                                <i class="far fa-calendar-alt"></i> ${post.date}
                            </span>
                            ${post.categories && post.categories.length > 0 ? `
                                <span class="search-result-categories">
                                    <i class="fas fa-folder"></i> ${post.categories.slice(0, 2).join(', ')}
                                </span>
                            ` : ''}
                            ${post.tags && post.tags.length > 0 ? `
                                <span class="search-result-tags">
                                    <i class="fas fa-tags"></i> ${post.tags.slice(0, 3).join(', ')}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </article>
            `;
        });

        html += '</div>';
        searchResults.innerHTML = html;
    }

    /**
     * Highlight matching text
     */
    function highlightMatches(text, matches, key) {
        if (!matches || !text) return escapeHtml(text);

        const keyMatches = matches.filter(m => m.key === key);
        if (keyMatches.length === 0) return escapeHtml(text);

        let highlighted = text;
        const positions = [];

        // Collect all match positions
        keyMatches.forEach(match => {
            if (match.indices) {
                match.indices.forEach(([start, end]) => {
                    positions.push({ start, end });
                });
            }
        });

        // Sort positions by start index (descending) to avoid offset issues
        positions.sort((a, b) => b.start - a.start);

        // Apply highlighting
        positions.forEach(({ start, end }) => {
            const before = highlighted.substring(0, start);
            const match = highlighted.substring(start, end + 1);
            const after = highlighted.substring(end + 1);
            highlighted = before + '<mark>' + match + '</mark>' + after;
        });

        return escapeHtml(highlighted).replace(/&lt;mark&gt;/g, '<mark>').replace(/&lt;\/mark&gt;/g, '</mark>');
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeyNavigation(e) {
        const items = searchResults.querySelectorAll('.search-result-item');
        
        if (items.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateSelection(items);
                break;

            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                updateSelection(items);
                break;

            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    items[selectedIndex].click();
                }
                break;
        }
    }

    /**
     * Update visual selection
     */
    function updateSelection(items) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('is-selected');
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                item.focus();
            } else {
                item.classList.remove('is-selected');
            }
        });
    }

    /**
     * Handle global keyboard shortcuts
     */
    function handleGlobalKeyboard(e) {
        // Open search with Ctrl/Cmd + K or /
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openModal();
        } else if (e.key === '/' && !isInputFocused()) {
            e.preventDefault();
            openModal();
        }

        // Close search with Escape
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            e.preventDefault();
            closeModal();
        }
    }

    /**
     * Check if an input is focused
     */
    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
        );
    }

    /**
     * Handle result click
     */
    function handleResultClick(e) {
        const resultItem = e.target.closest('.search-result-item');
        if (resultItem) {
            const url = resultItem.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        }
    }

    /**
     * Clear search
     */
    function clearSearch() {
        searchInput.value = '';
        if (searchClearBtn) {
            searchClearBtn.style.display = 'none';
        }
        showEmptyState();
        selectedIndex = -1;
        updateResultsStatus(0, '');
    }

    /**
     * Show empty state
     */
    function showEmptyState() {
        searchResults.innerHTML = `
            <div class="search-results-empty">
                <span class="icon is-large">
                    <i class="fas fa-search fa-2x"></i>
                </span>
                <p>Start typing to search through posts...</p>
            </div>
        `;
    }

    /**
     * Show no results message
     */
    function showNoResults(query) {
        searchResults.innerHTML = `
            <div class="search-results-empty">
                <span class="icon is-large">
                    <i class="fas fa-search-minus fa-2x"></i>
                </span>
                <p>No results found for "<strong>${escapeHtml(query)}</strong>"</p>
                <p class="search-hint-text">Try different keywords or check your spelling</p>
            </div>
        `;
    }

    /**
     * Show error message
     */
    function showError(message) {
        searchResults.innerHTML = `
            <div class="search-results-empty search-error">
                <span class="icon is-large has-text-danger">
                    <i class="fas fa-exclamation-triangle fa-2x"></i>
                </span>
                <p>${escapeHtml(message)}</p>
            </div>
        `;
    }

    /**
     * Show message
     */
    function showMessage(message) {
        searchResults.innerHTML = `
            <div class="search-results-empty">
                <span class="icon is-large">
                    <i class="fas fa-info-circle fa-2x"></i>
                </span>
                <p>${escapeHtml(message)}</p>
            </div>
        `;
    }

    /**
     * Update results status for screen readers
     */
    function updateResultsStatus(count, query) {
        if (searchResultsStatus) {
            if (count === 0 && query.length >= SEARCH_CONFIG.minCharacters) {
                searchResultsStatus.textContent = `No results found for ${query}`;
            } else if (count > 0) {
                searchResultsStatus.textContent = `Found ${count} result${count !== 1 ? 's' : ''} for ${query}`;
            } else {
                searchResultsStatus.textContent = '';
            }
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
