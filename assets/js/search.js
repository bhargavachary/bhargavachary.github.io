// Simple Search System with Fuse.js
// Search through blog posts

(function() {
  'use strict';

  // Search state
  const searchState = {
    index: null,
    fuse: null,
    searchData: null,
    selectedIndex: -1
  };

  // DOM elements
  const elements = {
    modal: null,
    input: null,
    results: null,
    clearBtn: null
  };

  // Initialize search system
  async function initSearch() {
    elements.modal = document.getElementById('search-modal');
    elements.input = document.getElementById('search-input');
    elements.results = document.getElementById('results-container');
    elements.clearBtn = document.getElementById('search-clear');

    if (!elements.modal || !elements.input) return;

    // Event listeners
    setupEventListeners();

    // Load search index on first open (lazy loading)
    document.getElementById('search-trigger')?.addEventListener('click', loadSearchIndex, { once: true });
  }

  // Setup all event listeners
  function setupEventListeners() {
    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      }
    });

    // Search input
    elements.input.addEventListener('input', debounce(handleSearch, 200));

    // Clear button
    elements.clearBtn?.addEventListener('click', clearSearch);

    // Keyboard navigation in results
    elements.input.addEventListener('keydown', handleKeyboardNav);

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.modal.classList.contains('active')) {
        closeSearchModal();
      }
    });
  }

  // Load search index (lazy)
  async function loadSearchIndex() {
    if (searchState.searchData) return; // Already loaded

    try {
      showLoading();

      const response = await fetch('/search.json');
      const data = await response.json();

      searchState.searchData = data.posts;

      // Initialize Fuse.js
      const options = {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'excerpt', weight: 0.3 },
          { name: 'content', weight: 0.2 },
          { name: 'tags', weight: 0.05 },
          { name: 'categories', weight: 0.05 }
        ],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
        ignoreLocation: true
      };

      searchState.fuse = new Fuse(searchState.searchData, options);

      hideLoading();

      // Track in analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'search_index_loaded', {
          'event_category': 'Search',
          'event_label': 'Index Loaded',
          'value': data.posts.length
        });
      }
    } catch (error) {
      console.error('Failed to load search index:', error);
      hideLoading();
      showError('Failed to load search index. Please try again.');
    }
  }

  // Handle search input
  function handleSearch(e) {
    const query = e.target.value.trim();

    // Show/hide clear button
    elements.clearBtn.style.display = query ? 'block' : 'none';

    if (query.length < 2) {
      showInitialState();
      return;
    }

    // Perform search
    performSearch(query);
  }

  // Perform fuzzy search
  function performSearch(query) {
    if (!searchState.fuse) {
      loadSearchIndex().then(() => performSearch(query));
      return;
    }

    const results = searchState.fuse.search(query);

    displayResults(results, query);

    // Track in analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'search', {
        'search_term': query,
        'event_category': 'Search',
        'event_label': query,
        'value': results.length
      });
    }
  }

  // Display search results
  function displayResults(results, query) {
    const resultsContainer = document.getElementById('results-container');
    const searchMeta = document.getElementById('search-meta');
    const searchResultsList = document.getElementById('search-results-list');
    const searchInitial = document.getElementById('search-initial');
    const searchEmpty = document.getElementById('search-empty');

    // Hide other states
    searchInitial.style.display = 'none';
    searchEmpty.style.display = 'none';

    if (results.length === 0) {
      searchResultsList.style.display = 'none';
      searchEmpty.style.display = 'block';
      return;
    }

    // Show results
    searchResultsList.style.display = 'block';

    // Update meta
    searchMeta.innerHTML = `
      <p class="search-meta-text">
        Found <strong>${results.length}</strong> result${results.length !== 1 ? 's' : ''} for "<strong>${query}</strong>"
      </p>
    `;

    // Render results
    resultsContainer.innerHTML = results.map((result, index) => {
      const post = result.item;
      const score = ((1 - result.score) * 100).toFixed(0);

      return `
        <a href="${post.url}" class="search-result-item" data-index="${index}">
          ${post.image ? `
            <div class="search-result-image">
              <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
          ` : ''}
          <div class="search-result-content">
            <h4 class="search-result-title">${highlightMatch(post.title, query)}</h4>
            <p class="search-result-excerpt">${highlightMatch(post.excerpt, query)}</p>
            <div class="search-result-meta">
              <span class="result-date">
                <i class="far fa-calendar"></i> ${post.dateDisplay}
              </span>
              ${post.tags && post.tags.length > 0 ? `
                <span class="result-tags">
                  <i class="fas fa-tag"></i> ${post.tags.slice(0, 2).join(', ')}
                </span>
              ` : ''}
              <span class="result-score" title="Relevance score">
                ${score}% match
              </span>
            </div>
          </div>
        </a>
      `;
    }).join('');

    // Reset selection
    searchState.selectedIndex = -1;
  }

  // Highlight search matches
  function highlightMatch(text, query) {
    if (!text || !query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Keyboard navigation
  function handleKeyboardNav(e) {
    const results = document.querySelectorAll('.search-result-item');
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      searchState.selectedIndex = Math.min(searchState.selectedIndex + 1, results.length - 1);
      updateSelection(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      searchState.selectedIndex = Math.max(searchState.selectedIndex - 1, -1);
      updateSelection(results);
    } else if (e.key === 'Enter' && searchState.selectedIndex >= 0) {
      e.preventDefault();
      results[searchState.selectedIndex].click();
    }
  }

  // Update visual selection
  function updateSelection(results) {
    results.forEach((result, index) => {
      if (index === searchState.selectedIndex) {
        result.classList.add('selected');
        result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        result.classList.remove('selected');
      }
    });
  }

  // Clear search
  function clearSearch() {
    elements.input.value = '';
    elements.clearBtn.style.display = 'none';
    showInitialState();
    elements.input.focus();
  }

  // Modal controls
  window.openSearchModal = function() {
    elements.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    elements.input.focus();

    // Close mobile menu if open (Alpine.js integration)
    const navElement = document.querySelector('[x-data*="openNav"]');
    if (navElement && window.Alpine) {
      // Use Alpine's $data to access component state
      const alpineData = window.Alpine.$data(navElement);
      if (alpineData && alpineData.openNav) {
        alpineData.openNav = false;
      }
    }

    // Load index if not loaded
    if (!searchState.searchData) {
      loadSearchIndex();
    }
  };

  window.closeSearchModal = function() {
    elements.modal.classList.remove('active');
    document.body.style.overflow = '';
    clearSearch();
  };

  // UI state helpers
  function showInitialState() {
    document.getElementById('search-initial').style.display = 'block';
    document.getElementById('search-results-list').style.display = 'none';
    document.getElementById('search-empty').style.display = 'none';
    document.getElementById('search-loading').style.display = 'none';
  }

  function showLoading() {
    document.getElementById('search-loading').style.display = 'block';
    document.getElementById('search-initial').style.display = 'none';
  }

  function hideLoading() {
    document.getElementById('search-loading').style.display = 'none';
    showInitialState();
  }

  function showError(message) {
    const errorEl = document.getElementById('search-empty');
    errorEl.querySelector('h3').textContent = 'Error';
    errorEl.querySelector('p').textContent = message;
    errorEl.style.display = 'block';
    document.getElementById('search-initial').style.display = 'none';
  }

  // Utility: Debounce
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
