## ⚙️ `docs/INSTALL.md`

# ⚙️ Installation & Deployment — Lambo Redux

A full step-by-step guide for setting up, exporting, and publishing your Lambo Redux project.

---

## 🧰 Requirements
- Node.js 18 or later  
- npm or yarn  
- VS Code (recommended)

---

## 🔧 Setup

Clone or extract your files:
```bash
git clone https://github.com/Tahasaif3/lambo-redux.git
cd lambo-redux
````

Install all dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Then visit **[http://localhost:3000](http://localhost:3000)** 🚀

---

## 🏗️ Build & Export

When ready for deployment:

```bash
npm run build
```

✅ Generates:

* `.next/` — optimized Next.js build
* `/out/` — static export (HTML + CSS + JS)

---

## 🧪 Local Preview

To test your static export:

```bash
npx serve out
```

Then open:
➡️ [http://localhost:5000](http://localhost:5000)

---

## 🌍 Deployment Options

### 🅰️ Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **Add new site → Deploy manually**
3. Drag your `/out` folder into the upload area
4. Done ✅

### 🅱️ Vercel

```bash
npm run build
vercel deploy --prebuilt
```

### 🆎 GitHub Pages

1. Commit and push your project
2. Go to **Settings → Pages**
3. Choose branch → `/out` folder
4. Save → Published 🎉

---

## 🧾 License

This theme is licensed under the [MIT License](./LICENSE.md).

---

## 🧑‍💻 Support

* Email: **[tahasaif454@gmail.com](mailto:taha.saif.dev@gmail.com)**
---

**Enjoy building your next supercar experience. 🏁**

```
