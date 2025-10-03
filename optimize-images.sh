#!/bin/bash

#############################################################
# WebP Image Optimization Script
# Converts JPG and PNG images to WebP format
# Quality: 85 (optimal balance), Method: 6 (best compression)
#############################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
QUALITY=85
METHOD=6
IMAGES_DIR="images"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  WebP Image Optimization Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo -e "${RED}Error: cwebp is not installed${NC}"
    echo "Install with: brew install webp"
    exit 1
fi

echo -e "${GREEN}✓ cwebp found:${NC} $(which cwebp)"
echo ""

# Function to convert image to WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"

    # Skip if WebP already exists and is newer
    if [ -f "$output_file" ] && [ "$output_file" -nt "$input_file" ]; then
        echo -e "${YELLOW}⊙ Skipping (WebP exists):${NC} $input_file"
        return 0
    fi

    # Get original file size
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)

    # Convert to WebP
    if cwebp -q $QUALITY -m $METHOD "$input_file" -o "$output_file" &> /dev/null; then
        # Get new file size
        local webp_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)

        # Calculate savings
        local savings=$(( (original_size - webp_size) * 100 / original_size ))
        local original_kb=$(( original_size / 1024 ))
        local webp_kb=$(( webp_size / 1024 ))

        echo -e "${GREEN}✓ Converted:${NC} $input_file"
        echo -e "  ${BLUE}Original:${NC} ${original_kb} KB → ${BLUE}WebP:${NC} ${webp_kb} KB (${GREEN}-${savings}%${NC})"

        # Track statistics
        TOTAL_ORIGINAL=$((TOTAL_ORIGINAL + original_size))
        TOTAL_WEBP=$((TOTAL_WEBP + webp_size))
        CONVERTED_COUNT=$((CONVERTED_COUNT + 1))
    else
        echo -e "${RED}✗ Failed:${NC} $input_file"
        FAILED_COUNT=$((FAILED_COUNT + 1))
    fi
}

# Initialize counters
TOTAL_ORIGINAL=0
TOTAL_WEBP=0
CONVERTED_COUNT=0
FAILED_COUNT=0
TOTAL_COUNT=0

echo -e "${BLUE}Converting images in: $IMAGES_DIR/${NC}"
echo -e "${BLUE}Quality: $QUALITY | Method: $METHOD${NC}"
echo ""

# Find and convert all JPG and PNG files
while IFS= read -r -d '' file; do
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    convert_to_webp "$file"
done < <(find "$IMAGES_DIR" \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -type f -print0)

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Conversion Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Total images found:${NC}     $TOTAL_COUNT"
echo -e "${GREEN}Successfully converted:${NC} $CONVERTED_COUNT"
if [ $FAILED_COUNT -gt 0 ]; then
    echo -e "${RED}Failed conversions:${NC}     $FAILED_COUNT"
fi

if [ $CONVERTED_COUNT -gt 0 ]; then
    TOTAL_ORIGINAL_MB=$(echo "scale=2; $TOTAL_ORIGINAL / 1048576" | bc)
    TOTAL_WEBP_MB=$(echo "scale=2; $TOTAL_WEBP / 1048576" | bc)
    TOTAL_SAVINGS=$(echo "scale=1; ($TOTAL_ORIGINAL - $TOTAL_WEBP) * 100 / $TOTAL_ORIGINAL" | bc)
    SAVED_MB=$(echo "scale=2; ($TOTAL_ORIGINAL - $TOTAL_WEBP) / 1048576" | bc)

    echo ""
    echo -e "${BLUE}Original size:${NC}  ${TOTAL_ORIGINAL_MB} MB"
    echo -e "${BLUE}WebP size:${NC}      ${TOTAL_WEBP_MB} MB"
    echo -e "${GREEN}Savings:${NC}        ${SAVED_MB} MB (${TOTAL_SAVINGS}%)"
fi

echo ""
echo -e "${GREEN}✓ WebP optimization complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update HTML/Markdown to use <picture> elements"
echo "2. Test WebP images in browser"
echo "3. Consider removing originals after verification"
echo ""
