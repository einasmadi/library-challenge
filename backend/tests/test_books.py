from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.main import app
from app.database import SessionLocal, engine
from app.models import Base

# Ideally, this should connect to a different database than the one used by the main application.
DATABASE_URL = "postgresql://admin:admin@localhost:5432/library"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)
Base = declarative_base()


# Setup and teardown for database
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


def setup_module(module):
  # Create tables in the database
  Base.metadata.create_all(bind = engine)


def teardown_module(module):
  # Drop tables in the database after tests
  Base.metadata.drop_all(bind = engine)


client = TestClient(app)


def test_create_book():
  response = client.post("/api/v1/books", json = {
    "title": "The Book",
    "year": 2020,
    "status": "PUBLISHED",
    "author_name": "John Doe"
  })
  assert response.status_code == 200
  assert response.json()["title"] == "The Book"
  assert response.json()["author_name"] == "John Doe"

  # Cleanup up db and test delete
  response = client.delete(f'/api/v1/books/{response.json()["id"]}')
  assert response.status_code == 204


def test_get_books():
  response = client.get("/api/v1/books")
  assert response.status_code == 200
  assert isinstance(response.json(), list)  # Should return a list of books


def test_update_book():
  # Create a book first
  response = client.post("/api/v1/books", json = {
    "title": "Old Book Title",
    "year": 2020,
    "status": "DRAFT",
    "author_name": "John Doe"
  })
  book_id = response.json()["id"]

  # Now, update the book
  response = client.put(f"/api/v1/books/{book_id}", json = {
    "title": "Updated Book Title",
    "year": 2021,
    "status": "PUBLISHED",
    "author_name": "Jane Doe"
  })

  assert response.status_code == 200
  assert response.json()["title"] == "Updated Book Title"
  assert response.json()["author_name"] == "Jane Doe"

  # Now, delete the book
  response = client.delete(f"/api/v1/books/{book_id}")
  assert response.status_code == 204
