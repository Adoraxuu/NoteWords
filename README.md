# Project Name

Full-stack web application using Django and React.

## Tech Stack

- Backend: Django, Django REST Framework, PostgreSQL
- Frontend: React with Vite
- Dependency Management: Poetry (backend), npm (frontend)

## Quick Start

### Backend

```
cd backend
cp .env.development.example .env.development
poetry shell
poetry install
make migrate
make runserver
```

### Frontend

```
cd frontend
cp .env.example .env
npm install
npm run dev
```

Access the app at the URL specified by your frontend environment variables (VITE_API_URL)

## Development

- Set `DJANGO_ENV=development` (default) or `DJANGO_ENV=production`
- Backend API: `your_development_backend_url/api`
- Create superuser: `poetry run python manage.py createsuperuser`