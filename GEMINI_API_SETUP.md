# How to Configure Gemini API

Follow these steps to enable AI features in EduMarket:

## Step 1: Get Your Gemini API Key

1. Go to **Google AI Studio**: https://aistudio.google.com/app/apikey
2. Click **"Get API Key"** or **"Create API Key"**
3. Select a Google Cloud project (or create a new one)
4. Copy the API key that's generated

## Step 2: Add API Key to Your Project

1. Open the file: `C:\Users\BAPS\.gemini\antigravity\scratch\edumarket\.env`
2. Replace `your_api_key_here` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=AIzaSyC...your_actual_key_here
   ```
3. Save the file

## Step 3: Restart the Dev Server

1. Stop the current dev server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. The AI tools should now work!

## Testing

1. Go to http://localhost:5173/#/tools
2. Paste some text in the input box
3. Click "Generate summary"
4. You should see AI-generated output instead of an error!

## Important Notes

- ⚠️ **Keep your API key private** - Never commit `.env` to GitHub
- The `.env` file is already in `.gitignore`
- For production (Vercel), add the API key in Vercel dashboard:
  - Go to your project settings
  - Environment Variables
  - Add `VITE_GEMINI_API_KEY` with your key

## Troubleshooting

**If it still doesn't work:**
1. Make sure the `.env` file is in the root directory (same level as `package.json`)
2. Restart the dev server completely
3. Clear browser cache and reload
4. Check browser console for any errors
