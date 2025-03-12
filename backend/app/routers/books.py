from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.book import Book, BookStatus
from app.models.author import Author
from app.database import get_db
from pydantic import BaseModel, ConfigDict
from typing import List, Optional

router = APIRouter()


# Pydantic models for input validation

class BookBase(BaseModel):
  id: Optional[int]
  title: str
  year: int
  status: BookStatus
  author_name: str


class BookCreate(BookBase):
  id: Optional[int] = None


class BookUpdate(BookBase):
  id: Optional[int] = None
  title: str
  year: int
  status: BookStatus
  author_name: str
  model_config = ConfigDict(
    json_schema_extra = {
      "example": {
        "title": "The Great Book",
        "year": 2019,
        "status": "PUBLISHED",
        "author_name": "John Doe"
      }
    }
  )


class BookOut(BookBase):
  id: int
  title: str
  year: int
  status: BookStatus
  author_name: str
  model_config = ConfigDict(
    from_attributes = True
  )


def get_author_or_create(author_name: str, db: Session):
  author = db.query(Author).filter(Author.name == author_name).first()

  # If the author doesn't exist, create a new one
  if not author:
    author = Author(name = author_name)
    db.add(author)
    db.commit()
    db.refresh(author)

  return author


# Route to get all books
@router.get("/books", response_model = List[BookOut])
def get_books(author_name: str = None, db: Session = Depends(get_db)):
  query = db.query(Book)

  if author_name:
    query = query.filter(Book.author.has(Author.name.ilike(f'%{author_name}%')))  # Case-insensitive search

  books = query.all()
  return books

# Route to get book by id
@router.get("/books/{id}", response_model = BookOut)
def get_book(id: int, db: Session = Depends(get_db)):
  book = db.query(Book).filter(Book.id == id).first()
  return book


# Route to add a new book along with a new author (if author does not exist)
@router.post("/books", response_model = BookOut)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
  # Check if author already exists or create a new one
  author = get_author_or_create(book.author_name, db)

  new_book = Book(
    title = book.title,
    year = book.year,
    status = book.status,
    author_id = author.id
  )
  db.add(new_book)
  db.commit()
  db.refresh(new_book)

  return new_book

# Route to update book details and author information
@router.put("/books/{id}", response_model = BookOut)
def update_book(id: int, book: BookUpdate, db: Session = Depends(get_db)):
  db_book = db.query(Book).filter(Book.id == id).first()
  if not db_book:
    raise HTTPException(status_code = 404, detail = "Book not found")

  # Update the book details
  db_book.title = book.title
  db_book.year = book.year
  db_book.status = book.status

  # Check if the author exists, update or create the author if necessary
  author = get_author_or_create(book.author_name, db)
  db_book.author_id = author.id

  db.commit()
  db.refresh(db_book)

  return db_book

@router.delete("/books/{id}", status_code=204)
def delete_book(id: int, db: Session = Depends(get_db)):
  book = db.query(Book).filter(Book.id == id).first()

  if book is None:
    raise HTTPException(status_code=404, detail="Book not found")

  db.delete(book)
  db.commit()
  return {"message": "Book deleted successfully"}