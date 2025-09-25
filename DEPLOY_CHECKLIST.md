# 🚀 Render Deployment Checklist

## ✅ Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy Backend (5 minutes)
- Go to [render.com](https://render.com)
- New → Web Service
- Connect GitHub repo
- **Root Directory**: `server`
- **Build Command**: `npm install` 
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGODB_URI`: Your MongoDB connection string
  - `NODE_ENV`: `production`

### 3. Deploy Frontend (3 minutes)
- New → Static Site
- Same GitHub repo
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://your-backend-name.onrender.com`

### 4. Update CORS (1 minute)
Add your frontend URL to the CORS origins in `server/server.js`:
```javascript
origin: [
  'http://localhost:5173',
  'https://your-frontend-name.onrender.com' // Add this line
],
```

### 5. Test & Celebrate! 🎉
- Visit your frontend URL
- Test the registration form
- Check both success and error scenarios

## 📋 Environment Variables Needed

### Backend:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `NODE_ENV` - Set to `production`

### Frontend:
- `VITE_API_URL` - Your Render backend URL

## 🔗 Useful Links
- [Render Dashboard](https://dashboard.render.com)
- [MongoDB Atlas](https://cloud.mongodb.com)
- [Your Repository](https://github.com/GodishalaAshwith/EAD_Assignment2)

---
**Total Time**: ~10 minutes ⏱️