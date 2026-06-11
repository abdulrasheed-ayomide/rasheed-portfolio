# Rasheed Ayomide — Portfolio (React + Vite)

## ⚡ Quick Start (Run Locally)

```bash
# 1. Open a NEW folder — DON'T delete your old project
#    Create: C:\Users\hp\OneDrive\Desktop\portfolio-react

# 2. Copy all these files into that folder

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev

# 5. Open: http://localhost:5173
```

## 📸 Adding Your Photo

1. Put your photo file (e.g. `photo.jpg`) inside the `/public` folder
2. Open `src/components/Hero.jsx`
3. Find this comment block and replace the placeholder div:
   ```jsx
   {/* Replace with: <img src="/rasheed-portfolio/photo.jpg" alt="Rasheed Ayomide" /> */}
   <div className="photo-placeholder">...</div>
   ```
   With:
   ```jsx
   <img src="/rasheed-portfolio/photo.jpg" alt="Rasheed Ayomide" />
   ```
4. Do the same in `src/components/About.jsx`

## 📧 Contact Form (Real Emails)

The form already connects to Formspree. To receive emails:
1. Go to https://formspree.io and create a free account
2. Create a new form — you'll get an endpoint like `https://formspree.io/f/YOUR_ID`
3. Open `src/components/Contact.jsx`, find this line:
   ```js
   const res = await fetch('https://formspree.io/f/mkoajall', {
   ```
4. Replace `mkoajall` with your own Formspree form ID

## 🌐 Deploy to GitHub Pages

```bash
# 1. Create a GitHub repo called: rasheed-portfolio

# 2. In vite.config.js, the base is already set to '/rasheed-portfolio/'

# 3. In package.json, update "homepage" with your GitHub username:
#    "homepage": "https://YOUR-USERNAME.github.io/rasheed-portfolio"

# 4. Initialize git and push:
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rasheed-portfolio.git
git push -u origin main

# 5. Deploy:
npm run deploy
```

Your site will be live at: `https://YOUR-USERNAME.github.io/rasheed-portfolio`

## 🔧 Update Your Info

| File | What to update |
|------|----------------|
| `src/components/Hero.jsx` | Social media links, CV file path |
| `src/components/Contact.jsx` | Email, phone, location |
| `src/components/Projects.jsx` | Project live + GitHub links |
| `src/components/Footer.jsx` | Social links |
| `src/components/GitHub.jsx` | Your GitHub username link |
| `vite.config.js` | `base` path (repo name) |
| `package.json` | `homepage` URL |
