from sqlalchemy import Column, Integer, String, ForeignKey, Enum, UniqueConstraint
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship
from .base import Base
import enum

class BookStatus(enum.Enum):
  PUBLISHED = "PUBLISHED"
  DRAFT = "DRAFT"

class Book(Base):
  __tablename__ = "books"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String)
  year = Column(Integer)
  status = Column(Enum(BookStatus))
  author_id = Column(Integer, ForeignKey("authors.id"))

  author = relationship("Author", back_populates="books")

  __table_args__ = (
    UniqueConstraint('author_id', 'title', 'year', name='_author_title_year_uc'),
  )

  @hybrid_property
  def author_name(self):
    return self.author.name if self.author else "No Author"

