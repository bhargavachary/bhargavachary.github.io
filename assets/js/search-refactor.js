/**
 * Search UI - Modern JavaScript Architecture
 * Clean, modular implementation following best practices
 * Features: Accessibility, Performance, Error Handling
 */

(function() {
  'use strict';

  /* ================================
     SEARCH CONFIGURATION & CONSTANTS
     ================================ */
  
  const SEARCH_CONFIG = {
    // Performance Settings
    DEBOUNCE_DELAY: 200,
    MIN_QUERY_LENGTH: 2,
    MAX_RESULTS: 50,
    
    // Animation Settings
    ANIMATION_DURATION: 250,
    LOADING_DELAY: 100,
    
    // Keyboard Shortcuts
    SHORTCUTS: {
      OPEN: ['Control+k', 'Meta+k'],
      CLOSE: ['Escape'],
      NAVIGATE_UP: ['ArrowUp'],
      NAVIGATE_DOWN: ['ArrowDown'],
      SELECT: ['Enter']
    },
    
    // API Settings
    SEARCH_INDEX_URL: '/search.json',
    FUSE_OPTIONS: {
      includeScore: true,
      includeMatches: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        { name: 'title', weight: 0.8 },
        { name: 'content', weight: 0.5 },
        { name: 'excerpt', weight: 0.6 },
        { name: 'categories', weight: 0.3 },
        { name: 'tags', weight: 0.2 }
      ]
    }
  };

  /* ================================
     SEARCH STATE MANAGEMENT
     ================================ */
  
  class SearchState {
    constructor() {
      this.isOpen = false;
      this.isLoading = false;
      this.query = '';
      this.results = [];
      this.selectedIndex = -1;
      this.searchIndex = null;
      this.fuse = null;
    }

    reset() {
      this.query = '';
      this.results = [];
      this.selectedIndex = -1;
      this.isLoading = false;
    }

    setQuery(query) {
      this.query = query.trim();
      this.selectedIndex = -1;
    }

    setResults(results) {
      this.results = results;
      this.selectedIndex = -1;
    }

    setSelectedIndex(index) {
      const maxIndex = this.results.length - 1;
      if (index < -1) {
        this.selectedIndex = maxIndex;
      } else if (index > maxIndex) {
        this.selectedIndex = -1;
      } else {
        this.selectedIndex = index;
      }
    }

    getSelectedResult() {
      return this.selectedIndex >= 0 ? this.results[this.selectedIndex] : null;
    }
  }

  /* ================================
     DOM ELEMENT MANAGEMENT
     ================================ */
  
  class SearchElements {
    constructor() {
      this.cache = new Map();
      this.init();
    }

    init() {
      // Cache all search-related elements
      const selectors = {
        modal: '[data-search-modal]',
        trigger: '[data-search-trigger]',
        input: '[data-search-input]',
        clear: '[data-search-clear]',
        close: '[data-search-close]',
        meta: '#search-meta',
        container: '#search-results-container',
        states: {
          initial: '[data-search-state="initial"]',
          loading: '[data-search-state="loading"]',
          results: '[data-search-state="results"]',
          empty: '[data-search-state="empty"]',
          error: '[data-search-state="error"]'
        }
      };

      // Cache elements
      for (const [key, selector] of Object.entries(selectors)) {
        if (typeof selector === 'object') {
          this.cache.set(key, {});
          for (const [subKey, subSelector] of Object.entries(selector)) {
            this.cache.get(key)[subKey] = document.querySelector(subSelector);
          }
        } else {
          this.cache.set(key, document.querySelector(selector));
        }
      }
    }

    get(elementKey) {
      return this.cache.get(elementKey);
    }

    exists(elementKey) {
      const element = this.get(elementKey);
      return element && element instanceof HTMLElement;
    }
  }

  /* ================================
     SEARCH FUNCTIONALITY
     ================================ */
  
  class SearchEngine {
    constructor() {
      this.loadPromise = null;
    }

    async loadIndex() {
      if (this.loadPromise) {
        return this.loadPromise;
      }

      this.loadPromise = fetch(SEARCH_CONFIG.SEARCH_INDEX_URL)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load search index: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Initialize Fuse.js search
          if (typeof Fuse !== 'undefined') {
            return new Fuse(data, SEARCH_CONFIG.FUSE_OPTIONS);
          } else {
            // Fallback to simple search if Fuse.js not available
            return { search: (query) => this.simpleSearch(data, query) };
          }
        })
        .catch(error => {
          console.error('Search index loading failed:', error);
          throw error;
        });

      return this.loadPromise;
    }

    simpleSearch(data, query) {
      const lowerQuery = query.toLowerCase();
      return data
        .filter(item => {
          return item.title.toLowerCase().includes(lowerQuery) ||
                 item.content.toLowerCase().includes(lowerQuery) ||
                 item.excerpt.toLowerCase().includes(lowerQuery);
        })
        .slice(0, SEARCH_CONFIG.MAX_RESULTS)
        .map(item => ({ item, score: 0 }));
    }

    async search(query) {
      if (!query || query.length < SEARCH_CONFIG.MIN_QUERY_LENGTH) {
        return [];
      }

      try {
        const fuse = await this.loadIndex();
        const results = fuse.search(query);
        return results.slice(0, SEARCH_CONFIG.MAX_RESULTS);
      } catch (error) {
        console.error('Search failed:', error);
        throw error;
      }
    }

    highlightMatches(text, matches = []) {
      if (!matches.length) return text;

      let highlightedText = text;
      const sortedMatches = matches.sort((a, b) => b.indices[0][0] - a.indices[0][0]);

      sortedMatches.forEach(match => {
        match.indices.forEach(([start, end]) => {
          const before = highlightedText.substring(0, start);
          const highlighted = highlightedText.substring(start, end + 1);
          const after = highlightedText.substring(end + 1);
          highlightedText = `${before}<mark>${highlighted}</mark>${after}`;
        });
      });

      return highlightedText;
    }
  }

  /* ================================
     UI MANAGEMENT
     ================================ */
  
  class SearchUI {
    constructor(elements, state) {
      this.elements = elements;
      this.state = state;
    }

    showModal() {
      const modal = this.elements.get('modal');
      if (!modal) return;

      modal.classList.add('search__modal--active');
      this.state.isOpen = true;
      
      // Focus management
      setTimeout(() => {
        const input = this.elements.get('input');
        if (input) {
          input.focus();
        }
      }, SEARCH_CONFIG.ANIMATION_DURATION);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Announce to screen readers
      this.announceToScreenReader('Search dialog opened');
    }

    hideModal() {
      const modal = this.elements.get('modal');
      if (!modal) return;

      modal.classList.remove('search__modal--active');
      this.state.isOpen = false;
      this.state.reset();

      // Reset UI state
      this.clearInput();
      this.showState('initial');
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Return focus to trigger
      const trigger = this.elements.get('trigger');
      if (trigger) {
        trigger.focus();
      }

      // Announce to screen readers
      this.announceToScreenReader('Search dialog closed');
    }

    showState(stateName) {
      const states = this.elements.get('states');
      if (!states) return;

      // Hide all states
      Object.values(states).forEach(state => {
        if (state) state.style.display = 'none';
      });

      // Show requested state
      if (states[stateName]) {
        states[stateName].style.display = 'flex';
      }
    }

    showLoading() {
      this.state.isLoading = true;
      this.showState('loading');
      
      // Update meta information
      this.updateMeta('Searching...');
      this.announceToScreenReader('Searching for results');
    }

    hideLoading() {
      this.state.isLoading = false;
    }

    showResults(results) {
      this.hideLoading();
      this.state.setResults(results);

      if (results.length === 0) {
        this.showState('empty');
        this.updateMeta(`No results found for "${this.state.query}"`);
        this.announceToScreenReader('No search results found');
      } else {
        this.showState('results');
        this.renderResults(results);
        this.updateMeta(`Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${this.state.query}"`);
        this.announceToScreenReader(`Found ${results.length} search results`);
      }
    }

    showError(error) {
      this.hideLoading();
      this.showState('error');
      this.updateMeta('Search error occurred');
      this.announceToScreenReader('Search error occurred');
      console.error('Search UI Error:', error);
    }

    renderResults(results) {
      const container = this.elements.get('states').results;
      if (!container) return;

      const html = results.map((result, index) => {
        const item = result.item;
        const isSelected = index === this.state.selectedIndex;
        
        return `
          <article class="search__result-item${isSelected ? ' search__result-item--selected' : ''}" 
                   data-search-result="${index}"
                   role="option"
                   aria-selected="${isSelected}">
            <div class="search__result-icon" aria-hidden="true">
              <i class="fas fa-file-alt"></i>
            </div>
            <div class="search__result-content">
              <h3 class="search__result-title">
                <a href="${item.url}" data-search-link>
                  ${this.highlightText(item.title, result.matches)}
                </a>
              </h3>
              <p class="search__result-excerpt">
                ${this.highlightText(item.excerpt || '', result.matches)}
              </p>
              <div class="search__result-meta">
                <span class="search__result-date">
                  <i class="fas fa-calendar" aria-hidden="true"></i>
                  <time datetime="${item.date}">${this.formatDate(item.date)}</time>
                </span>
                ${item.categories ? `
                  <span class="search__result-category">
                    <i class="fas fa-tag" aria-hidden="true"></i>
                    ${Array.isArray(item.categories) ? item.categories[0] : item.categories}
                  </span>
                ` : ''}
              </div>
            </div>
          </article>
        `;
      }).join('');

      container.innerHTML = html;
    }

    highlightText(text, matches) {
      if (!matches || !matches.length) return text;
      
      // Find matches for this specific text field
      const textMatches = matches.filter(match => 
        match.key === 'title' || match.key === 'excerpt' || match.key === 'content'
      );
      
      if (!textMatches.length) return text;
      
      // Apply highlights
      let highlightedText = text;
      textMatches.forEach(match => {
        match.indices.forEach(([start, end]) => {
          const matchedText = text.substring(start, end + 1);
          highlightedText = highlightedText.replace(
            new RegExp(this.escapeRegExp(matchedText), 'gi'),
            `<mark>$&</mark>`
          );
        });
      });
      
      return highlightedText;
    }

    escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }

    updateMeta(text) {
      const meta = this.elements.get('meta');
      if (meta) {
        meta.textContent = text;
      }
    }

    clearInput() {
      const input = this.elements.get('input');
      const clear = this.elements.get('clear');
      
      if (input) {
        input.value = '';
      }
      
      if (clear) {
        clear.classList.remove('search__clear-button--visible');
      }
    }

    updateClearButton(hasValue) {
      const clear = this.elements.get('clear');
      if (clear) {
        if (hasValue) {
          clear.classList.add('search__clear-button--visible');
        } else {
          clear.classList.remove('search__clear-button--visible');
        }
      }
    }

    selectResult(index) {
      this.state.setSelectedIndex(index);
      
      // Update visual selection
      const results = document.querySelectorAll('[data-search-result]');
      results.forEach((result, i) => {
        if (i === this.state.selectedIndex) {
          result.classList.add('search__result-item--selected');
          result.setAttribute('aria-selected', 'true');
          result.scrollIntoView({ block: 'nearest' });
        } else {
          result.classList.remove('search__result-item--selected');
          result.setAttribute('aria-selected', 'false');
        }
      });
    }

    activateSelected() {
      const selected = this.state.getSelectedResult();
      if (selected && selected.item.url) {
        window.location.href = selected.item.url;
      }
    }

    announceToScreenReader(message) {
      // Create temporary announcement element
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }

  /* ================================
     EVENT HANDLING
     ================================ */
  
  class SearchEventHandler {
    constructor(elements, ui, engine, state) {
      this.elements = elements;
      this.ui = ui;
      this.engine = engine;
      this.state = state;
      this.debounceTimer = null;
    }

    init() {
      this.bindEvents();
      this.loadSearchIndex();
    }

    bindEvents() {
      // Modal trigger
      const trigger = this.elements.get('trigger');
      if (trigger) {
        trigger.addEventListener('click', () => this.openModal());
      }

      // Modal close
      const closeButtons = this.elements.get('close');
      if (closeButtons) {
        if (closeButtons.length) {
          closeButtons.forEach(btn => btn.addEventListener('click', () => this.closeModal()));
        } else {
          closeButtons.addEventListener('click', () => this.closeModal());
        }
      }

      // Overlay close
      const modal = this.elements.get('modal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal || e.target.closest('[data-search-close]')) {
            this.closeModal();
          }
        });
      }

      // Search input
      const input = this.elements.get('input');
      if (input) {
        input.addEventListener('input', (e) => this.handleInput(e));
        input.addEventListener('keydown', (e) => this.handleKeyDown(e));
      }

      // Clear button
      const clear = this.elements.get('clear');
      if (clear) {
        clear.addEventListener('click', () => this.clearSearch());
      }

      // Global keyboard shortcuts
      document.addEventListener('keydown', (e) => this.handleGlobalKeyDown(e));

      // Result clicks
      document.addEventListener('click', (e) => {
        const resultLink = e.target.closest('[data-search-link]');
        if (resultLink) {
          this.closeModal();
        }
      });
    }

    async loadSearchIndex() {
      try {
        await this.engine.loadIndex();
        console.log('Search index loaded successfully');
      } catch (error) {
        console.error('Failed to load search index:', error);
      }
    }

    openModal() {
      this.ui.showModal();
    }

    closeModal() {
      this.ui.hideModal();
    }

    handleInput(e) {
      const query = e.target.value.trim();
      this.state.setQuery(query);
      
      // Update clear button
      this.ui.updateClearButton(query.length > 0);
      
      // Debounced search
      this.debounceSearch(query);
    }

    debounceSearch(query) {
      clearTimeout(this.debounceTimer);
      
      if (!query || query.length < SEARCH_CONFIG.MIN_QUERY_LENGTH) {
        this.ui.showState('initial');
        return;
      }

      this.debounceTimer = setTimeout(async () => {
        await this.performSearch(query);
      }, SEARCH_CONFIG.DEBOUNCE_DELAY);
    }

    async performSearch(query) {
      try {
        this.ui.showLoading();
        const results = await this.engine.search(query);
        this.ui.showResults(results);
      } catch (error) {
        this.ui.showError(error);
      }
    }

    clearSearch() {
      this.ui.clearInput();
      this.state.reset();
      this.ui.showState('initial');
      
      // Focus input
      const input = this.elements.get('input');
      if (input) {
        input.focus();
      }
    }

    handleKeyDown(e) {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.closeModal();
          break;
          
        case 'ArrowDown':
          e.preventDefault();
          this.ui.selectResult(this.state.selectedIndex + 1);
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          this.ui.selectResult(this.state.selectedIndex - 1);
          break;
          
        case 'Enter':
          e.preventDefault();
          if (this.state.selectedIndex >= 0) {
            this.ui.activateSelected();
          }
          break;
      }
    }

    handleGlobalKeyDown(e) {
      // Check for search shortcuts
      const isSearchShortcut = (e.ctrlKey || e.metaKey) && e.key === 'k';
      
      if (isSearchShortcut) {
        e.preventDefault();
        this.openModal();
      }
      
      // Close modal on escape (when modal is open)
      if (e.key === 'Escape' && this.state.isOpen) {
        e.preventDefault();
        this.closeModal();
      }
    }
  }

  /* ================================
     SEARCH APPLICATION INITIALIZATION
     ================================ */
  
  class SearchApp {
    constructor() {
      this.state = new SearchState();
      this.elements = new SearchElements();
      this.engine = new SearchEngine();
      this.ui = new SearchUI(this.elements, this.state);
      this.eventHandler = new SearchEventHandler(this.elements, this.ui, this.engine, this.state);
    }

    init() {
      // Check if required elements exist
      if (!this.elements.exists('modal') || !this.elements.exists('trigger')) {
        console.warn('Search UI: Required elements not found');
        return;
      }

      // Initialize event handling
      this.eventHandler.init();
      
      console.log('Search UI initialized successfully');
    }
  }

  /* ================================
     AUTO-INITIALIZATION
     ================================ */
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const searchApp = new SearchApp();
      searchApp.init();
    });
  } else {
    const searchApp = new SearchApp();
    searchApp.init();
  }

  // Add screen reader only utility class
  const style = document.createElement('style');
  style.textContent = `
    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  `;
  document.head.appendChild(style);

})();