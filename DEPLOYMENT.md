# Vercel Deployment Guide (FREE TIER)

## Prerequisites

1. **MongoDB Atlas Free Tier (M0)**
   - Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
   - **IMPORTANT**: Select the FREE M0 tier (512MB storage)
   - To find the free tier:
     - Click "Create" → "Build a Database"
     - Select "M0 Free" (not M10 or M30)
     - If you don't see M0, look for "Free" or "Shared" option
     - Region: Select the closest region to you
   - Get your connection string after cluster is created
   - Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas Network Access

2. **Vercel Free Account**
   - Create a free Vercel account at https://vercel.com (Hobby plan is free)
   - Install Vercel CLI: `npm i -g vercel`

3. **GitHub Account** (recommended for easier deployment)
   - Push your code to GitHub repository

## Deployment Steps (FREE TIER)

### Step 1: Set up MongoDB Atlas Free Tier

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Free M0 Cluster**
   - Click "Create" → "Build a Database"
   - **IMPORTANT**: Look for "M0 Free" or "Shared" option (not M10/M30)
   - If you only see paid options, try:
     - Click "I'll do this later" on the pricing page
     - Or look for "Free" tab/link
     - The free tier is 512MB storage
   - Select a region closest to you
   - Cluster name: solar-admin-panel
   - Click "Create Deployment"

3. **Configure Security**
   - Create a database user (username/password)
   - Go to Network Access → Add IP Address
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

4. **Get Connection String**
   - Go to Database → Connect
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - It should look like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

### Step 2: Deploy to Vercel (FREE)

**Option A: Easiest - Via Vercel Dashboard**

1. **Push to GitHub**
   ```bash
   cd Solar_webapplication
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/solar-admin-panel.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Framework Preset: Create (or Next.js if detected)
   - Root Directory: `./`
   - Click "Deploy"

3. **Add Environment Variables**
   - After deployment, go to Project Settings → Environment Variables
   - Add: `MONGO_URL` = your MongoDB connection string
   - Add: `NODE_ENV` = production
   - Click "Save"
   - Redeploy from the Deployments tab

**Option B: Via Vercel CLI**

1. **Install and Login**
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   cd Solar_webapplication
   vercel
   ```
   - Follow prompts, accept defaults

3. **Add Environment Variables**
   ```bash
   vercel env add MONGO_URL production
   # Paste your MongoDB connection string
   vercel env add NODE_ENV production
   # Type: production
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Important Notes (FREE TIER)

### MongoDB Free Tier (M0)
- **Storage**: 512MB (enough for development/small apps)
- **Cost**: $0/month
- **Limitations**: 
  - Shared RAM (not dedicated)
  - May have connection limits
  - Good for development and testing
- Your connection string should look like:
  ```
  mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
  ```
- Enable IP whitelisting: Allow Access from Anywhere (0.0.0.0/0)

### Vercel Free Tier (Hobby Plan)
- **Cost**: $0/month
- **Features**:
  - Unlimited deployments
  - 100GB bandwidth per month
  - 6GB build output per month
  - Automatic HTTPS
  - Custom domains supported
- Perfect for this application

### Server Configuration
- The server is configured to work with Vercel serverless functions
- Data seeding is disabled in production (to avoid clearing data)
- The app will connect to MongoDB without clearing data in production

### Client Configuration
- The client API is configured to use the current domain in production
- No need to set REACT_APP_BASE_URL in production
- It will automatically use the Vercel domain

### Troubleshooting

**MongoDB Connection Error:**
- Check your MONGO_URL environment variable
- Verify IP whitelisting in MongoDB Atlas
- Ensure your MongoDB cluster is running

**Build Errors:**
- Check that all dependencies are installed
- Verify Node.js version (should be 18.x or higher)
- Check Vercel build logs for specific errors

**API Not Working:**
- Verify environment variables are set in Vercel
- Check server logs in Vercel Dashboard
- Ensure MongoDB is accessible

## Post-Deployment

1. **Test the Application**
   - Visit your Vercel URL
   - Check all pages load correctly
   - Verify data is displayed

2. **Monitor Performance**
   - Use Vercel Analytics
   - Check MongoDB Atlas metrics

3. **Set Up Custom Domain** (optional)
   - Go to Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS settings

## Local Development

To run locally after deployment:
```bash
# Server
cd server
npm install
npm run dev

# Client
cd client
npm install
npm start
```

Make sure to set up your local `.env` files with appropriate values.
