# Render Deployment Guide

## 🚀 Complete Deployment Steps

### Prerequisites
1. GitHub account
2. Render account (free tier available)
3. MongoDB Atlas account

## Step 1: Prepare Your Repository

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

## Step 2: Deploy Backend (Web Service)

1. **Go to Render Dashboard**: https://render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect Repository**: Select your GitHub repo
4. **Configure Service**:
   - **Name**: `student-registration-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Add Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentdb
   PORT=4000
   NODE_ENV=production
   ```

6. **Click "Create Web Service"**
7. **Note the URL**: `https://your-app-name.onrender.com`

## Step 3: Deploy Frontend (Static Site)

1. **Click "New +"** → **"Static Site"**
2. **Connect Repository**: Same GitHub repo
3. **Configure Site**:
   - **Name**: `student-registration-app`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-app-name.onrender.com
   ```

5. **Click "Create Static Site"**

## Step 4: Update CORS (Backend)

Your backend server.js should have:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-app.onrender.com'
  ]
}));
```

## Step 5: Test Deployment

1. **Backend Health Check**: Visit `https://your-backend.onrender.com/students`
2. **Frontend**: Visit your frontend URL
3. **Form Submission**: Test the registration form

## 🔧 Troubleshooting

### Backend Issues:
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure all dependencies are in package.json

### Frontend Issues:
- Check build logs
- Verify VITE_API_URL is correct
- Test API endpoints manually

### CORS Issues:
- Add frontend URL to CORS origins
- Check browser console for errors

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Services sleep after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds

2. **Environment Variables**:
   - Never commit .env files
   - Use Render's environment variable settings

3. **MongoDB Atlas**:
   - Whitelist IP: 0.0.0.0/0 for Render
   - Use strong password for database user

## 🎉 Success!

Your application should now be live at:
- **Frontend**: `https://your-frontend-app.onrender.com`
- **Backend**: `https://your-backend-app.onrender.com`