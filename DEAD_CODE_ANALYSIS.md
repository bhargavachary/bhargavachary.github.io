# 50-PASS DEAD CODE ANALYSIS

## PASS 1-10: FILE INVENTORY

### Active Pages (IN USE):
- ✅ index.html (homepage)
- ✅ about.md (about page with sidebar)
- ✅ professional.md (init.d page)
- ✅ favorites.md (favorites)
- ✅ categories.md (category listing)
- ✅ tags.md (tag listing)
- ✅ terms.md (policy page)
- ✅ 404.md (error page)
- ✅ 35 blog posts in _posts/

### Active Layouts (IN USE):
- ✅ default.html (main layout - used by all)
- ✅ page.html (used by about, favorites, categories, tags)
- ✅ post.html (used by blog posts)
- ✅ blog.html (used by index)

### DEAD Layouts (UNUSED):
- ❌ links.html (7KB - never used)
- ❌ product-category.html (1.3KB - never used)
- ❌ product.html (1.8KB - never used)
- ❌ promo-page.html (4.9KB - never used)
- ❌ recipe.html (3KB - never used)

### Active Includes (IN USE):
- ✅ header.html (navbar)
- ✅ hero.html (hero section)
- ✅ footer.html (footer)
- ✅ head.html (HTML head)
- ✅ post-card.html (blog cards)
- ✅ compact-post-card.html (sidebar cards)
- ✅ author-profile.html (sidebar profile)
- ✅ latest-posts.html (sidebar)
- ✅ pagination.html (blog pagination)
- ✅ optimized-image.html (image handling)
- ✅ google-analytics.html (analytics)
- ✅ skip-to-content.html (accessibility)

### QUESTIONABLE Includes (MAY BE UNUSED):
- ⚠️ callouts.html (included in default.html but no data)
- ⚠️ tabs.html (included in default.html but no usage)
- ⚠️ showcase.html (included in default.html but no data)
- ⚠️ sponsors.html (included in default.html but no data)
- ⚠️ gallery.html (included in default.html but no usage)
- ⚠️ menubar.html (not used, greedy nav instead)
- ⚠️ toc.html (table of contents - not used)
- ⚠️ series.html (not used)

### DEAD Includes (CONFIRMED UNUSED):
- ❌ newsletter.html (447B - never used)
- ❌ subscribe.html (209B - never used)
- ❌ rating.html (447B - never used)
- ❌ review.html (879B - never used)
- ❌ share-buttons.html (1.2KB - never used)
- ❌ notification.html (832B - never used)
- ❌ youtube.html (261B - never used)
- ❌ vimeo.html (373B - never used)
- ❌ tiktok.html (190B - never used)
- ❌ tag.html (126B - never used)
- ❌ follow.html (2.1KB - never used)
- ❌ cookie-banner.html (1.8KB - not enabled in config)
- ❌ disqus.html (800B - comments disabled)

## PASS 11-20: JAVASCRIPT ANALYSIS

### Active JS (IN USE):
- ✅ app.js (30KB - main custom JS)
  - Page transitions ✅
  - Greedy navigation ✅
  - All active functions ✅

### DEAD JS (UNUSED):
- ❌ app.js.bak (27KB - backup file, DELETE)
- ❌ _main.js (2.2KB - old file from theme)
- ❌ main.min.js (131KB - old minified theme JS)
- ❌ plugins/ directory (theme plugins not used)
- ❌ vendor/ directory (old vendor JS)

## PASS 21-30: CSS/SCSS ANALYSIS

### Active SCSS (IN USE):
- ✅ app.scss (main custom styles)

### DEAD SCSS (UNUSED):
- ❌ assets/_scss/ entire directory (old theme SCSS)
  - _base.scss
  - _masthead.scss
  - _page.scss
  - _footer.scss
  - _mixins.scss
  - _sidebar.scss
  - _archive.scss
  - _navigation.scss
  - _utilities.scss
  - _reset.scss
  - _variables.scss
  - _notices.scss
  - vendor/ (susy, breakpoint, magnific-popup, font-awesome)

**NOTE:** All this SCSS is from the old theme. We use Bulma now via remote_theme.

## PASS 31-40: CONFIGURATION & DATA

### Active Config (IN USE):
- ✅ _config.yml (site config)
- ✅ _data/navigation.yml (navbar items)

### DEAD Config/Data (UNUSED):
- ❌ _data/showcase_example.yml (example data)
- ❌ _data/home_callouts.yml (callouts - empty/unused)

## PASS 41-45: OTHER FILES

### Active (IN USE):
- ✅ Gemfile & Gemfile.lock (Ruby dependencies)
- ✅ images/ directory (blog images)
- ✅ manifest.json (PWA config)
- ✅ sw.js (service worker)
- ✅ offline.html (offline page)

### DEAD/UNNECESSARY:
- ❌ bulma-clean-theme.gemspec (theme gem spec - not needed)
- ❌ changelog.txt (5KB - old theme changelog)
- ❌ MIGRATION_README.md (5KB - old migration guide)
- ❌ package.json & package-lock.json (npm - not used)
- ❌ .prettierrc & .prettierignore (Prettier config - not used)
- ❌ .editorconfig (editor config - optional)
- ❌ LICENSE.txt (theme license - keep for attribution)
- ❌ google99fef22f19b50e24.html (Google verification)
- ❌ vendor/ directory (bundler vendor files)

## PASS 46-50: SUMMARY & RECOMMENDATIONS

### SAFE TO DELETE (19.5 KB+ freed):

#### Layouts (14.9 KB):
- links.html
- product-category.html
- product.html
- promo-page.html
- recipe.html

#### Includes (8.5 KB):
- newsletter.html
- subscribe.html
- rating.html
- review.html
- share-buttons.html
- notification.html
- youtube.html
- vimeo.html
- tiktok.html
- tag.html
- follow.html
- cookie-banner.html
- disqus.html

#### JavaScript (160 KB):
- app.js.bak
- _main.js
- main.min.js
- plugins/ directory
- vendor/ directory

#### SCSS (est. 500+ KB):
- entire assets/_scss/ directory

#### Other (11 KB):
- bulma-clean-theme.gemspec
- changelog.txt
- MIGRATION_README.md
- package.json
- package-lock.json
- .prettierrc
- .prettierignore
- _data/showcase_example.yml

### QUESTIONABLE (Needs Investigation):
- callouts.html (included but no data)
- tabs.html (included but no usage)
- showcase.html (included but no data)
- sponsors.html (included but no data)
- gallery.html (included but no usage)
- menubar.html (replaced by greedy nav)
- toc.html (ToC feature not used)
- series.html (series feature not used)

### KEEP (Active or Needed):
- All .md pages (8 files)
- All blog posts (35 files)
- Active layouts: default.html, page.html, post.html, blog.html
- Active includes: header, footer, head, hero, post-card, etc.
- app.js (30KB main JS)
- app.scss (main CSS)
- _config.yml, navigation.yml
- images/, Gemfile, manifest.json, sw.js, offline.html

## TOTAL DEAD CODE: ~670 KB

**Recommendation: Delete all SAFE items first, test thoroughly, then investigate QUESTIONABLE items.**
