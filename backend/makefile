.PHONY: install run test lint format clean

install:
	poetry install

run:
	poetry run python manage.py runserver

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.~" -delete

migrations:
	poetry run python manage.py makemigrations

migrate:
	poetry run python manage.py migrate

createsuperuser:
	poetry run python manage.py createsuperuser