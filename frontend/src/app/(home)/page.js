"use client";

import Link from 'next/link';
import { deleteBook, getBooks } from "@/services/book/api";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { useEffect, useState } from "react";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from "rxjs";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [authorName, setAuthorName] = useState('');
  const [searchSubject] = useState(new Subject());

  // Fetch books on component mount and when search term changes
  useEffect(() => {
    const subscription = searchSubject
      .pipe(
        debounceTime(200), // Wait for 200ms after the user stops typing
        distinctUntilChanged(), // Only emit if the search term is different from the previous one
        switchMap((name) => getBooks(name)) // Cancel previous request and switch to the new one
      )
      .subscribe((data) => {
        setBooks(data);
      });

    // Initial fetch
    getBooks().then((data) => setBooks(data));

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, [searchSubject]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const name = event.target.value;
    setAuthorName(name);
    searchSubject.next(name); // Emit the new author name
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      await deleteBook(bookToDelete.id);

      setIsModalOpen(false);
      setBookToDelete(null);

      window.location.reload();
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setBookToDelete(null);
  };

  return (
    <div>
      <h1>Home Page - Book List</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Filter by author name..."
          value={authorName}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <table className="book-table">
        <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Status</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.year}</td>
            <td>{book.status}</td>
            <td>{book.author_name}</td>
            <td>
              <Link href={`/edit/${book.id}`}>
                <button>Edit</button>
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(book)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <Link href="/create">
        <button>Create New Book</button>
      </Link>

      <ConfirmationModal
        message={`Are you sure you want to delete the book "${bookToDelete?.title}"?`}
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
