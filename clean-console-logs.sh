#!/bin/bash

#############################################################
# Console.log Cleanup Script
# Removes development console.log statements
# Keeps console.error and console.warn for production debugging
#############################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

JS_FILE="assets/js/app.js"
BACKUP_FILE="assets/js/app.js.backup"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Console.log Cleanup Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if file exists
if [ ! -f "$JS_FILE" ]; then
    echo -e "${RED}Error: $JS_FILE not found${NC}"
    exit 1
fi

# Create backup
echo -e "${YELLOW}Creating backup: $BACKUP_FILE${NC}"
cp "$JS_FILE" "$BACKUP_FILE"

# Count console statements before
BEFORE_LOG=$(grep -c "console\.log" "$JS_FILE" || true)
BEFORE_WARN=$(grep -c "console\.warn" "$JS_FILE" || true)
BEFORE_ERROR=$(grep -c "console\.error" "$JS_FILE" || true)
TOTAL_BEFORE=$((BEFORE_LOG + BEFORE_WARN + BEFORE_ERROR))

echo -e "${BLUE}Before cleanup:${NC}"
echo -e "  console.log:   $BEFORE_LOG"
echo -e "  console.warn:  $BEFORE_WARN"
echo -e "  console.error: $BEFORE_ERROR"
echo -e "  Total:         $TOTAL_BEFORE"
echo ""

# Create temporary file with cleaned code
echo -e "${GREEN}Removing console.log statements...${NC}"

# Remove lines containing console.log (but keep console.error and console.warn)
sed -i.tmp '/console\.log/d' "$JS_FILE"

# Clean up temporary file
rm -f "${JS_FILE}.tmp"

# Count console statements after
AFTER_LOG=$(grep -c "console\.log" "$JS_FILE" || true)
AFTER_WARN=$(grep -c "console\.warn" "$JS_FILE" || true)
AFTER_ERROR=$(grep -c "console\.error" "$JS_FILE" || true)
TOTAL_AFTER=$((AFTER_LOG + AFTER_WARN + AFTER_ERROR))

echo -e "${BLUE}After cleanup:${NC}"
echo -e "  console.log:   $AFTER_LOG"
echo -e "  console.warn:  $AFTER_WARN (${GREEN}kept${NC})"
echo -e "  console.error: $AFTER_ERROR (${GREEN}kept${NC})"
echo -e "  Total:         $TOTAL_AFTER"
echo ""

REMOVED=$((BEFORE_LOG - AFTER_LOG))
echo -e "${GREEN}✓ Removed $REMOVED console.log statements${NC}"
echo -e "${GREEN}✓ Kept $AFTER_WARN console.warn for production debugging${NC}"
echo -e "${GREEN}✓ Kept $AFTER_ERROR console.error for error tracking${NC}"
echo ""

echo -e "${YELLOW}Backup saved to: $BACKUP_FILE${NC}"
echo -e "${YELLOW}To restore: mv $BACKUP_FILE $JS_FILE${NC}"
echo ""
