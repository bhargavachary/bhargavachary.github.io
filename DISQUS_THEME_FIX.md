# Disqus Theme Integration Fix

## Problem Statement
Disqus comments section was not properly matching the site theme, causing readability issues:
- Some text was white on grey background
- Some preview items had grey text on grey background
- Overall poor visibility and theme consistency

## Solution Implemented

### 1. Dynamic Theme Detection in Disqus (`_includes/disqus.html`)

Added JavaScript code to automatically detect the current theme and configure Disqus accordingly:

```javascript
// Set Disqus theme based on current site theme
var currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
this.page.colorScheme = currentTheme === 'dark' ? 'dark' : 'light';
```

### 2. Automatic Theme Switching

Implemented a MutationObserver to watch for theme changes and reload Disqus automatically:

```javascript
// Listen for theme changes and reload Disqus if needed
if (window.MutationObserver) {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'data-theme' && window.DISQUS) {
        // Reload Disqus with new theme
        var currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        window.DISQUS.reset({
          reload: true,
          config: function() {
            this.page.url = '{{ page.url | absolute_url }}';
            this.page.identifier = '{{ page.url | absolute_url }}';
            this.page.colorScheme = currentTheme === 'dark' ? 'dark' : 'light';
          }
        });
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}
```

### 3. Enhanced CSS Styling (`assets/css/app.scss`)

Updated the Disqus CSS to ensure better integration with the theme:

```scss
/* Disqus comments */
#disqus_thread {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  
  /* Force Disqus iframe to respect theme colors */
  iframe {
    background-color: var(--card-bg) !important;
    color-scheme: auto;
  }
  
  /* Style Disqus elements that may leak through */
  a {
    color: var(--link-color);
    
    &:hover {
      color: var(--link-hover);
    }
  }
}

/* Additional styling for Disqus comment section header */
.content h4.title.is-4 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}
```

## Key Features

1. **Automatic Theme Detection**: Disqus now automatically detects whether the site is in dark or light mode on page load
2. **Dynamic Theme Switching**: When users toggle the theme, Disqus reloads with the new theme automatically
3. **Consistent Styling**: CSS ensures that the Disqus container and surrounding elements match the site theme
4. **Better Readability**: Text colors and backgrounds are now properly matched to ensure readability in both light and dark modes

## Technical Details

### Disqus Color Scheme API
Disqus supports a `colorScheme` configuration option that can be set to:
- `'dark'` - Dark theme for Disqus comments
- `'light'` - Light theme for Disqus comments

### Theme Detection
The site uses the `data-theme` attribute on the `<html>` element to track the current theme:
- `data-theme="dark"` - Dark mode
- `data-theme="light"` - Light mode

### CSS Custom Properties
The solution leverages CSS custom properties (CSS variables) to ensure consistent theming:
- `--card-bg` - Background color for cards and containers
- `--border-subtle` - Subtle border color
- `--text-primary` - Primary text color
- `--link-color` - Link color
- `--link-hover` - Link hover color

## Testing

To test the fix:
1. Navigate to any blog post with comments enabled
2. Verify that the Disqus comments section matches the current theme
3. Toggle the theme using the theme switcher
4. Verify that Disqus automatically reloads with the new theme
5. Check readability in both light and dark modes

## Browser Compatibility

The solution uses standard web APIs that are supported in all modern browsers:
- MutationObserver (IE11+)
- CSS Custom Properties (IE11+ with fallbacks)
- Disqus embed.js (all modern browsers)

## Future Improvements

If needed, additional enhancements could include:
1. Custom CSS injection into Disqus iframe (if Disqus allows it)
2. Preloading theme preference before Disqus loads
3. Adding transition animations when theme switches
