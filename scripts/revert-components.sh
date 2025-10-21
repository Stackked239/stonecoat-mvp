#!/bin/bash
cd "/Users/austinwarren/Stone-Coat MVP/stonecoat-mvp"

find components -name "*.tsx" -type f | while read file; do
  echo "Reverting $file"
  sed -i '' \
    -e 's/bg-\[#141414\]/bg-white/g' \
    -e 's/bg-\[#1a1a1a\]/bg-white/g' \
    -e 's/bg-\[#222222\]/bg-gray-100/g' \
    -e 's/text-white /text-gray-900 /g' \
    -e 's/text-white"/text-gray-900"/g' \
    -e 's/text-\[#cccccc\]/text-gray-600/g' \
    -e 's/text-\[#888888\]/text-gray-500/g' \
    -e 's/border-\[#2a2a2a\]/border-gray-200/g' \
    -e 's/border-\[#333333\]/border-gray-300/g' \
    -e 's/divide-\[#2a2a2a\]/divide-gray-200/g' \
    -e 's/hover:bg-\[#1a1a1a\]/hover:bg-gray-50/g' \
    -e 's/hover:bg-\[#222222\]/hover:bg-gray-100/g' \
    -e 's/hover:bg-\[#333333\]/hover:bg-gray-200/g' \
    -e 's/ring-\[#2a2a2a\]/ring-gray-300/g' \
    "$file"
done

echo "All components reverted to light theme"
