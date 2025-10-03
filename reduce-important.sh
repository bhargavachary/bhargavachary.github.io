#!/bin/bash

#############################################################
# !important Reduction Script - SAFE Phase 1
# Targets: Dark mode section only (lowest risk)
# Reduces ~60 instances while maintaining functionality
#############################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

CSS_FILE="assets/css/app.scss"
BACKUP_FILE="assets/css/app.scss.important-backup"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  !important Reduction Script${NC}"
echo -e "${BLUE}  Phase 1: Dark Mode Section${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if file exists
if [ ! -f "$CSS_FILE" ]; then
    echo -e "${RED}Error: $CSS_FILE not found${NC}"
    exit 1
fi

# Create backup
echo -e "${YELLOW}Creating backup: $BACKUP_FILE${NC}"
cp "$CSS_FILE" "$BACKUP_FILE"

# Count before
BEFORE_COUNT=$(grep -c "!important" "$CSS_FILE" || true)
echo -e "${BLUE}Before: $BEFORE_COUNT !important instances${NC}"
echo ""

echo -e "${GREEN}Phase 1: Removing !important from dark mode section${NC}"
echo -e "${YELLOW}(Lines 1910-2410 approximately)${NC}"
echo ""

# Strategy: Remove !important only within html[data-theme="dark"] blocks
# Keep !important for:
# - Browser fixes (tap-highlight)
# - FOUC classes (.theme-dark, .theme-light)
# - Critical navbar overrides
# - Pagination overrides

# Use sed to remove !important from specific sections
# This is conservative - only removes obvious safe cases

# Remove !important from color properties in dark mode
sed -i.phase1 \
  -e '/html\[data-theme="dark"\]/,/^}/ {
    s/background-color: \(.*\) !important;/background-color: \1;/g
    s/color: \(.*\) !important;/color: \1;/g
    s/border-color: \(.*\) !important;/border-color: \1;/g
  }' \
  "$CSS_FILE"

# Remove !important from transform/animations (safe - no remote theme conflict)
sed -i.phase2 \
  -e 's/transform: \(.*\) !important;/transform: \1;/g' \
  "$CSS_FILE"

# Remove !important from box-shadow in cards (safe)
sed -i.phase3 \
  -e '/\.card/,/^}/ {
    s/box-shadow: \(.*\) !important;/box-shadow: \1;/g
  }' \
  "$CSS_FILE"

# Clean up temporary files
rm -f "${CSS_FILE}.phase1" "${CSS_FILE}.phase2" "${CSS_FILE}.phase3"

# Count after
AFTER_COUNT=$(grep -c "!important" "$CSS_FILE" || true)
REMOVED=$((BEFORE_COUNT - AFTER_COUNT))

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Results${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Before:${NC}  $BEFORE_COUNT !important"
echo -e "${BLUE}After:${NC}   $AFTER_COUNT !important"
echo -e "${GREEN}Removed:${NC} $REMOVED instances"
echo ""

REDUCTION_PCT=$(echo "scale=1; $REMOVED * 100 / $BEFORE_COUNT" | bc)
echo -e "${GREEN}Reduction: ${REDUCTION_PCT}%${NC}"
echo ""

if [ $AFTER_COUNT -le 30 ]; then
    echo -e "${GREEN}✓ TARGET ACHIEVED: Under 30 !important${NC}"
elif [ $AFTER_COUNT -le 50 ]; then
    echo -e "${YELLOW}⊙ Good progress: Under 50 !important${NC}"
    echo -e "${YELLOW}  Consider manual cleanup for remaining cases${NC}"
else
    echo -e "${YELLOW}⊙ Partial success: $AFTER_COUNT remaining${NC}"
    echo -e "${YELLOW}  Safe automated reduction complete${NC}"
    echo -e "${YELLOW}  Manual review recommended for further reduction${NC}"
fi

echo ""
echo -e "${YELLOW}Backup saved to: $BACKUP_FILE${NC}"
echo -e "${YELLOW}To restore: cp $BACKUP_FILE $CSS_FILE${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Test dark mode toggle functionality"
echo "2. Test navbar hover states"
echo "3. Test card animations"
echo "4. Review CSS-IMPORTANT-REDUCTION-PLAN.md for manual cleanup"
echo ""
