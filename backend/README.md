# Django REST Framework Backend — Althaf Jewellery Makers

Backend service built using **Python 3.13**, **Django 6.0**, **Django REST Framework (DRF)**, and **PostgreSQL** database.

---

## 🛠 Setup & Environment

### Virtual Environment (`ab-env`)
The virtual environment `ab-env` is created inside this directory.

- **Activate on Windows**:
  ```powershell
  .\ab-env\Scripts\Activate.ps1
  ```

- **Dependencies**:
  - `django`
  - `djangorestframework`
  - `django-cors-headers`
  - `psycopg2-binary`
  - `python-dotenv`
  - `pillow`

---

## 🗄️ PostgreSQL Database Setup

Database Name: `ab-jewellerys`

Configured in `.env`:
```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=ab-jewellerys
DB_USER=postgres
DB_PASSWORD=Paul9441
DB_HOST=127.0.0.1
DB_PORT=5432
```

---

## ⚡ Useful Commands

- **Run Server**:
  ```bash
  python manage.py runserver 8000
  ```

- **Make Migrations**:
  ```bash
  python manage.py makemigrations
  ```

- **Apply Migrations**:
  ```bash
  python manage.py migrate
  ```

- **Seed Initial Categories & Gold Rates**:
  ```bash
  python seed.py
  ```

- **Create Superuser (Admin Portal)**:
  ```bash
  python manage.py createsuperuser
  ```
