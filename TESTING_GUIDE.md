# Theme Toggle Testing Guide

## Quick Test Checklist

Use this checklist to verify the theme toggle is working correctly after deployment.

### Basic Functionality
- [ ] Click theme toggle button - theme switches immediately
- [ ] Icons animate smoothly (sun ↔️ moon)
- [ ] Theme persists after page refresh
- [ ] No flash of wrong theme on page load

### Cross-Page Testing
- [ ] Navigate from homepage to blog post - theme maintained
- [ ] Navigate from blog post to about page - theme maintained
- [ ] Use browser back button - theme maintained
- [ ] Use browser forward button - theme maintained

### Mobile Testing
- [ ] Open mobile menu (burger icon)
- [ ] Theme toggle is visible in mobile menu
- [ ] Click theme toggle in mobile menu - works correctly
- [ ] Mobile menu closes smoothly after theme change

### Keyboard Navigation
- [ ] Tab to theme toggle button (should show focus ring)
- [ ] Press Enter - theme switches
- [ ] Press Space - theme switches
- [ ] ARIA label reads correctly for screen readers

### Edge Cases
- [ ] Rapid clicking (10+ times fast) - no glitches
- [ ] Switch themes during page transition - no conflicts
- [ ] Open in new tab - theme from original tab applied
- [ ] Private/Incognito mode - theme toggle works (doesn't persist)

### Different Page Types
- [ ] Homepage (blog layout) - works
- [ ] Individual post pages - works
- [ ] Static pages (about, professional) - works
- [ ] Category/tag pages - works

### Browser Testing
- [ ] Chrome/Edge (Windows)
- [ ] Firefox (Windows)
- [ ] Safari (macOS)
- [ ] Safari (iOS)
- [ ] Chrome (Android)

## Manual Testing Procedure

### Test 1: Basic Toggle Function
1. Open homepage in browser
2. Observe current theme (should be dark by default for new visitors)
3. Click theme toggle button in navbar
4. Verify:
   - Background color changes immediately
   - Text color inverts
   - Theme toggle icon changes (sun ↔️ moon)
   - Icon animates smoothly with rotation
   - No JavaScript errors in console

### Test 2: Theme Persistence
1. Set theme to light mode
2. Navigate to a blog post
3. Verify theme is still light
4. Refresh page (Ctrl+R / Cmd+R)
5. Verify theme is still light
6. Close browser tab
7. Reopen same URL
8. Verify theme is still light

### Test 3: Mobile Menu
1. Resize browser to mobile width (<768px) or use device
2. Click burger menu icon
3. Verify mobile menu opens with smooth animation
4. Verify theme toggle button is visible
5. Click theme toggle
6. Verify theme changes
7. Click outside menu to close
8. Verify theme change persisted

### Test 4: Page Navigation
1. Start on homepage
2. Set theme to dark
3. Click on a blog post
4. Verify theme is dark
5. Click back button
6. Verify theme is still dark
7. Click forward button
8. Verify theme is still dark

### Test 5: Keyboard Navigation
1. Load any page
2. Press Tab repeatedly until theme toggle has focus
3. Verify focus indicator is visible
4. Press Enter
5. Verify theme switches
6. Press Tab then Shift+Tab to return focus
7. Press Space
8. Verify theme switches again

## Automated Testing (Browser DevTools)

### Console Commands

```javascript
// Check current theme
document.documentElement.getAttribute('data-theme')

// Check localStorage
localStorage.getItem('theme')

// Manually toggle theme
document.getElementById('theme-toggle').click()

// Verify button exists
document.getElementById('theme-toggle') !== null

// Check button ARIA label
document.getElementById('theme-toggle').getAttribute('aria-label')

// Check icon visibility
getComputedStyle(document.querySelector('.theme-icon-light')).opacity
getComputedStyle(document.querySelector('.theme-icon-dark')).opacity
```

### Performance Testing

```javascript
// Measure theme toggle performance
console.time('theme-toggle');
document.getElementById('theme-toggle').click();
console.timeEnd('theme-toggle');
// Should be < 50ms
```

## Common Issues and Solutions

### Issue: Theme doesn't persist
**Solution:** Check if localStorage is enabled (not in private browsing)
```javascript
try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    console.log('localStorage works');
} catch(e) {
    console.error('localStorage not available:', e);
}
```

### Issue: Icons don't show correctly
**Solution:** Verify Font Awesome is loaded
```javascript
// Check if Font Awesome icons are loaded
document.querySelector('.fa-sun') !== null
document.querySelector('.fa-moon') !== null
```

### Issue: Button doesn't respond to clicks
**Solution:** Check for JavaScript errors
1. Open DevTools Console (F12)
2. Look for red error messages
3. Check if `handleThemeToggle` function exists
```javascript
// Should show function definition
console.log(typeof handleThemeToggle)
```

### Issue: Theme flashes on page load
**Solution:** Verify head.html script runs before CSS
1. View page source (Ctrl+U / Cmd+Option+U)
2. Confirm theme initialization script is first in `<head>`
3. Should be before any CSS files

## Regression Testing

After any changes to navbar, JavaScript, or CSS, re-run this checklist:

1. [ ] All Basic Functionality tests pass
2. [ ] All Cross-Page tests pass
3. [ ] Mobile menu still shows toggle
4. [ ] Keyboard navigation works
5. [ ] No new console errors
6. [ ] Performance is still fast (<50ms toggle time)

## Accessibility Testing

Use these tools to verify accessibility:
- **axe DevTools** - Chrome/Firefox extension
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Chrome DevTools Accessibility audit
- **Screen Reader** - NVDA (Windows), JAWS, VoiceOver (macOS/iOS)

### Screen Reader Test
1. Enable screen reader
2. Navigate to theme toggle with Tab
3. Verify announcement: "Toggle dark/light theme, button"
4. Activate button
5. Verify new announcement reflects new theme state

## Performance Benchmarks

Expected performance metrics:
- **Theme toggle time:** <50ms
- **Icon animation:** 300ms (CSS)
- **Page transition with theme:** <200ms
- **Memory usage:** No leaks after 100+ toggles

## Sign-Off

After completing all tests:

```
✓ All basic functionality tests passed
✓ Cross-page navigation maintains theme
✓ Mobile menu works correctly
✓ Keyboard navigation works
✓ No JavaScript errors in console
✓ Performance is acceptable
✓ Accessibility requirements met

Tested by: _________________
Date: _________________
Browser(s): _________________
```

---

**Last Updated:** 2025-10-10
**Related Files:** THEME_TOGGLE_FIXES.md
