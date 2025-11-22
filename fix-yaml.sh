#!/bin/bash

# List of files with potential YAML issues
FILES=(
  "refunds-return-policy.md"
  "wrong-size-shipped.md"
  "how-to-order-in-bulk.md"
  "affiliate-payments.md"
  "order-arrived-incomplete.md"
  "how-to-change-order-after-placed.md"
  "received-wrong-cards.md"
  "store-currency.md"
  "clearpay-payment.md"
  "order-not-shipped.md"
  "accepted-payment-methods.md"
  "order-arrived-damaged.md"
  "account-login-password-reset.md"
  "cant-add-order-to-cart.md"
  "cant-find-club-or-nationality.md"
  "android-upload-image-issue.md"
  "how-long-cards-take.md"
  "do-you-remove-background.md"
  "what-images-should-i-use.md"
)

# Directory containing the markdown files
DIR="/Users/crdias/Desktop/SUNDAY MORNING/help-center-app/content/articles"

for file in "${FILES[@]}"; do
  filepath="$DIR/$file"
  if [ -f "$filepath" ]; then
    echo "Processing $file..."
    
    # Create a temporary file
    tmp_file=$(mktemp)
    
    # Extract frontmatter (lines between first two --- markers)
    sed -n '/^---$/,/^---$/p' "$filepath" > "$tmp_file"
    
    # Replace single quotes with double quotes in frontmatter
    sed -i '' 's/title: '"'"'/title: "/' "$tmp_file"
    sed -i '' 's/'"'"'$/"/g' "$tmp_file"
    sed -i '' 's/date: '"'"'/date: "/' "$tmp_file"
    sed -i '' 's/category: '"'"'/category: "/' "$tmp_file"
    sed -i '' 's/excerpt: '"'"'/excerpt: "/' "$tmp_file"
    sed -i '' 's/keywords: '"'"'/keywords: "/' "$tmp_file"
    
    # Get the updated frontmatter
    updated_frontmatter=$(cat "$tmp_file")
    
    # Extract original frontmatter
    original_frontmatter=$(sed -n '/^---$/,/^---$/p' "$filepath")
    
    # Replace original frontmatter with updated frontmatter
    sed -i '' "s|$original_frontmatter|$updated_frontmatter|" "$filepath"
    
    # Clean up
    rm "$tmp_file"
  else
    echo "File $file not found"
  fi
done

echo "All files processed"
