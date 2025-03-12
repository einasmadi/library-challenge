from typing import List, Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Author

router = APIRouter()

class AuthorOut(BaseModel):
  id: Optional[int]
  name: str
  model_config = ConfigDict(
    from_attributes = True
  )


@router.get("/authors/{author_id}", response_model = AuthorOut)
def get_author(author_id: int, db: Session = Depends(get_db)):
  author = db.query(Author).filter(Author.id == author_id).first()
  return author

@router.get("/authors", response_model = List[AuthorOut])
def get_authors(db: Session = Depends(get_db)):
  authors = db.query(Author).all()
  return authors
