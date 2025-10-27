#!/bin/bash

# Add 'use client' to all shared component files that don't have it

components=(
  "Badge.tsx"
  "Card.tsx"
  "DataTable.tsx"
  "Footer.tsx"
  "Logo.tsx"
  "PageHeader.tsx"
)

cd "components/shared"

for file in "${components[@]}"; do
  if [ -f "$file" ]; then
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
  fi
done

echo "Done!"
