from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routers.authors import router as author_router
from app.routers.books import router as book_router

app = FastAPI()

# List of allowed origins
origins = [
  "http://localhost:3000",  # Frontend development URL (adjust if needed)
  "http://127.0.0.1:3000",  # Another common localhost address for development
  "*",  # Allow all origins (use carefully)
]

# Add CORSMiddleware to the FastAPI app
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,  # Allows specific origins or "*" for all origins
  allow_credentials=True,
  allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
  allow_headers=["*"],  # Allows all headers
)

app.include_router(author_router, prefix="/api/v1", tags=["authors"])
app.include_router(book_router, prefix="/api/v1", tags=["books"])
