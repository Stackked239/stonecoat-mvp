#!/bin/bash

# Revert Dark Theme Script
# Reverts all dark theme changes back to light theme

set -e

echo "🔄 Reverting dark theme changes..."

PROJECT_ROOT="/Users/austinwarren/Stone-Coat MVP/stonecoat-mvp"
cd "$PROJECT_ROOT"

# Find all .tsx files in app directory and revert colors
find app -name "*.tsx" -type f | while read file; do
  echo "Reverting: $file"

  # Revert all dark theme color changes
  sed -i '' \
    -e 's/className="bg-\[#141414\]/className="bg-gray-50/g' \
    -e 's/className="bg-\[#1a1a1a\] /className="bg-white /g' \
    -e 's/className="bg-\[#1a1a1a\]"/className="bg-white"/g' \
    -e 's/text-white /text-gray-900 /g' \
    -e 's/text-white"/text-gray-900"/g' \
    -e 's/text-\[#cccccc\]/text-gray-600/g' \
    -e 's/text-\[#888888\]/text-gray-500/g' \
    -e 's/border-\[#2a2a2a\]/border-gray-200/g' \
    -e 's/divide-\[#2a2a2a\]/divide-gray-200/g' \
    -e 's/bg-\[#1a1a1a\] /bg-gray-100 /g' \
    -e 's/bg-\[#1a1a1a\]"/bg-gray-100"/g' \
    -e 's/bg-\[#222222\] /bg-gray-200 /g' \
    -e 's/bg-\[#222222\]"/bg-gray-200"/g' \
    -e 's/hover:bg-\[#1a1a1a\]/hover:bg-gray-50/g' \
    -e 's/hover:bg-\[#222222\]/hover:bg-gray-100/g' \
    -e 's/hover:bg-\[#333333\]/hover:bg-gray-200/g' \
    -e 's/stroke="#2a2a2a"/stroke="#E5E7EB"/g' \
    -e 's/stroke="#888888"/stroke="#6B7280"/g' \
    -e 's/backgroundColor: '\''#1a1a1a'\''/backgroundColor: '\''#fff'\''/g' \
    -e 's/border: '\''1px solid #2a2a2a'\''/border: '\''1px solid #E5E7EB'\''/g' \
    -e 's/text-\[#888888\]/text-gray-300/g' \
    -e 's/ring-\[#2a2a2a\]/ring-gray-300/g' \
    "$file"

  echo "✅ Reverted: $file"
done

echo ""
echo "🎉 Dark theme reverted successfully!"
echo "📝 All files restored to light theme"
