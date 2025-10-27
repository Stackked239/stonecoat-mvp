#!/bin/bash

# Add 'use client' to all page.tsx files that don't have it

find app -name "page.tsx" -type f | while read file; do
  if ! head -1 "$file" | grep -q "'use client'"; then
    echo "Adding 'use client' to: $file"
    # Create temp file with 'use client' at top
    {
      echo "'use client';"
      echo ""
      cat "$file"
    } > "$file.tmp"
    # Replace original
    mv "$file.tmp" "$file"
  else
    echo "Skipping (already has 'use client'): $file"
  fi
done

echo "Done!"
