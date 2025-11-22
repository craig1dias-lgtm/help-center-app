# Full-Width Help Center Integration for Shopify

This directory contains templates for integrating the MatchMint Help Center into your Shopify store as a full-width page.

## Implementation Instructions

### 1. Create a Custom Page Template in Shopify

1. Log in to your Shopify admin panel
2. Go to **Online Store** > **Themes**
3. Click on **Actions** > **Edit code** for your current theme
4. In the Templates directory, click **Add a new template**
5. Select **page** as the template type and name it **help-center-fullwidth**
   - **IMPORTANT**: The file should be named exactly `page.help-center-fullwidth.liquid` in the templates folder
6. Copy the contents of the `page.help-center-fullwidth.liquid` file from this directory and paste it into the new template
7. Click **Save**

### 2. Create a New Page Using the Template

1. Go to **Online Store** > **Pages**
2. Click **Add page**
3. Set the title to "Help Center"
4. In the **Template** dropdown at the right sidebar, select **page.help-center-fullwidth**
5. Click **Save**

### 3. Add Help Center URL as a Metafield (Optional)

To make it easier to update the Help Center URL in the future:

1. Go to **Settings** > **Custom data** > **Metafields**
2. Click **Add definition**
3. Select **Page** as the owner type
4. Name it "Help Center URL"
5. Set the namespace to "custom" and key to "help_center_url"
6. Set the type to "Single line text"
7. Click **Save**
8. Go back to your Help Center page
9. Add the metafield value: `https://help-center-app-three.vercel.app` (or your actual help center URL)

## Customization Options

You can customize the appearance of the back button and other elements by modifying the CSS in the template.

## Troubleshooting

If the iframe doesn't display correctly:
- Make sure your Help Center URL is correct
- Check if there are any Content Security Policy (CSP) restrictions in your Shopify theme
- Ensure the Help Center application is properly deployed and accessible
