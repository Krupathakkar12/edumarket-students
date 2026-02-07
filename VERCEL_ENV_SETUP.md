# Configure Gemini API for Production (Vercel)

## Problem
AI tools work on localhost but show "API Error" on https://edumarket-students.vercel.app

## Why This Happens
- Your `.env` file with the API key is only on your local computer
- `.env` is in `.gitignore` so it never goes to GitHub/Vercel
- Production (Vercel) doesn't have access to the API key

## Solution: Add Environment Variable to Vercel

### Step 1: Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### Step 2: Select Your Project
Click on **edumarket-students** (or your project name)

### Step 3: Open Settings
Click on **Settings** tab at the top

### Step 4: Go to Environment Variables
On the left sidebar, click **Environment Variables**

### Step 5: Add New Variable
Click **Add New** button

Fill in:
- **Key:** `VITE_GEMINI_API_KEY`
- **Value:** `AIzaSyCoH61nS_PPws_YGInPW90hczeButopu8U`
- **Environment:** Select all (Production, Preview, Development)

Click **Save**

### Step 6: Redeploy
After saving the environment variable:

**Option A: Use Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the 3 dots (...) on the latest deployment
3. Click **Redeploy**
4. Wait 1-2 minutes

**Option B: Push to GitHub** (Triggers auto-deploy)
```bash
git commit --allow-empty -m "Trigger redeploy for env vars"
git push
```

### Step 7: Test
After redeployment completes:
1. Go to https://edumarket-students.vercel.app/#/tools
2. Paste some text
3. Click "Generate summary"
4. It should work now! ✅

## Important Notes

⚠️ **Security:**
- Never commit API keys to GitHub
- Always use environment variables for secrets
- The `.env` file stays local only

✅ **For Production:** Always add secrets in Vercel dashboard  
✅ **For Local:** Use `.env` file

## Troubleshooting

**If still not working after redeploy:**
1. Check the environment variable name is exactly: `VITE_GEMINI_API_KEY`
2. Make sure you selected all environments (Production, Preview, Development)
3. Wait for the redeploy to complete (check Deployments tab)
4. Clear browser cache and try again
5. Check the API key is valid at https://aistudio.google.com/app/apikey
