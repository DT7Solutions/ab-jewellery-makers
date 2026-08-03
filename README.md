# Althaf Jewellery Makers — Heritage Luxury Web Application

A full-stack luxury web application for **Althaf Jewellery Makers** (Heritage Luxury Indian Jewellery, Guntur, AP). Designed with a royal burgundy & gold theme, interactive 3D product cards, live Guntur AP gold rate badges, bespoke bridal collection showcases, and a **Django REST Framework + PostgreSQL** backend.

---

## 🏛️ Project Architecture

```text
ab-jewellery-makers/
├── 📁 frontend/              # Vite + React 18 Single Page Application
│   ├── 📁 public/            # Static high-resolution product & model assets
│   ├── 📁 src/
│   │   ├── 📁 components/    # Modular UI components (Header, Hero, FaqSection, etc.)
│   │   ├── 📁 data/          # Product catalogue & category definitions
│   │   ├── 📁 pages/         # Page routes (HomePage, AboutPage, CollectionsPage, ContactPage)
│   │   └── 📁 utils/         # WhatsApp Integration & Gold Rate API helpers
│   ├── package.json
│   └── vite.config.js
│
└── 📁 backend/               # Django REST Framework + PostgreSQL Backend
    ├── 📁 ab-env/            # Python virtual environment
    ├── 📁 core/              # Django core settings & URL routing
    ├── 📁 store/             # Store app (Models, Views, Serializers, Admin)
    ├── .env                  # PostgreSQL database credentials & secrets
    ├── requirements.txt      # Python dependencies
    └── manage.py
```

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 18 (Vite build system)
- **Routing**: React Router DOM v6
- **Styling**: Modular Vanilla CSS with custom Design Tokens (`var(--gold)`, `var(--primary)`)
- **Icons**: React Icons (`fi`, `fa`, `hi`, `gi`)
- **Fonts**: Begum Sans / Cormorant Garamond / Great Vibes / Montserrat

### **Backend**
- **Framework**: Python 3.13 + Django 6.0
- **API Engine**: Django REST Framework (DRF)
- **Database**: PostgreSQL (`ab-jewellerys`)
- **Database Adapter**: `psycopg2-binary`
- **CORS**: `django-cors-headers`
- **Environment Handling**: `python-dotenv`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ and `npm`
- **Python**: v3.10+
- **PostgreSQL**: v14+ running on `localhost:5432`

---

### 1️⃣ Setting up the Backend (Django + PostgreSQL)

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Activate the Virtual Environment (`ab-env`)**:
   - **Windows (PowerShell)**:
     ```powershell
     .\ab-env\Scripts\Activate.ps1
     ```
   - **Linux / macOS**:
     ```bash
     source ab-env/bin/activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Database Configuration (`.env`)**:
   Ensure PostgreSQL is running locally. The `.env` file includes:
   ```env
   DEBUG=True
   SECRET_KEY=django-insecure-althaf-jewellery-makers-heritage-luxury-2026-key
   ALLOWED_HOSTS=localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173
   PORT=8000

   # PostgreSQL Database Credentials
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=ab-jewellerys
   DB_USER=postgres
   DB_PASSWORD=Paul9441
   DB_HOST=127.0.0.1
   DB_PORT=5432
   ```

5. **Run Migrations & Seed Data**:
   ```bash
   python manage.py migrate
   python seed.py
   ```

6. **Start Django DRF Server**:
   ```bash
   python manage.py runserver 8000
   ```
   - API Root: `http://127.0.0.1:8000/api/`
   - Admin Portal: `http://127.0.0.1:8000/admin/`

---

### 2️⃣ Setting up the Frontend (Vite + React)

1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Web App URL: `http://localhost:3000/`

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📡 REST API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/categories/` | `GET` | Retrieve all jewellery categories |
| `/api/products/` | `GET` | Retrieve active catalogue products |
| `/api/products/featured/` | `GET` | Retrieve featured signature collection items |
| `/api/gold-rates/latest/` | `GET` | Live Guntur 22K/24K market gold rates |
| `/api/inquiries/` | `POST` | Submit customer WhatsApp inquiry form |

---

## 📜 License
© 2026 **Althaf Jewellery Makers**. All Rights Reserved.
