#!/bin/bash

# Dark Theme Application Script
# Applies Stonecoat dark theme styling to all page files
# This script performs safe find-and-replace operations

set -e

echo "🎨 Applying Stonecoat Dark Theme to all pages..."

# Define the project root
PROJECT_ROOT="/Users/austinwarren/Stone-Coat MVP/stonecoat-mvp"
cd "$PROJECT_ROOT"

# Find all .tsx files in app directory
find app -name "*.tsx" -type f | while read file; do
  echo "Processing: $file"

  # Create backup
  cp "$file" "$file.bak"

  # Apply transformations using sed
  sed -i '' \
    -e 's/className="bg-gray-50/className="bg-[#141414]/g' \
    -e 's/className="bg-white /className="bg-[#1a1a1a] /g' \
    -e 's/className="bg-white"/className="bg-[#1a1a1a]"/g' \
    -e 's/text-gray-900/text-white/g' \
    -e 's/text-gray-800/text-white/g' \
    -e 's/text-gray-700/text-[#cccccc]/g' \
    -e 's/text-gray-600/text-[#cccccc]/g' \
    -e 's/text-gray-500/text-[#888888]/g' \
    -e 's/text-gray-400/text-[#888888]/g' \
    -e 's/border-gray-200/border-[#2a2a2a]/g' \
    -e 's/border-gray-300/border-[#2a2a2a]/g' \
    -e 's/divide-gray-200/divide-[#2a2a2a]/g' \
    -e 's/bg-gray-100 /bg-[#1a1a1a] /g' \
    -e 's/bg-gray-100"/bg-[#1a1a1a]"/g' \
    -e 's/bg-gray-200 /bg-[#222222] /g' \
    -e 's/bg-gray-200"/bg-[#222222]"/g' \
    -e 's/hover:bg-gray-50/hover:bg-[#1a1a1a]/g' \
    -e 's/hover:bg-gray-100/hover:bg-[#222222]/g' \
    -e 's/hover:bg-gray-200/hover:bg-[#333333]/g' \
    "$file"

  echo "✅ Updated: $file"
done

echo ""
echo "🎉 Dark theme applied successfully!"
echo "📝 Backups created with .bak extension"
echo "💡 Test the application and remove .bak files if satisfied"
echo ""
echo "To restore backups if needed:"
echo "  find app -name '*.bak' | while read f; do mv \"\$f\" \"\${f%.bak}\"; done"
