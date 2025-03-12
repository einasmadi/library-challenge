'use client';

import BookForm from '@/components/BookForm';
import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect, useState } from 'react';
import { getBookById, updateBook } from "@/services/book/api";

const Edit = ({ params }) => {
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { id } = use(params);
  console.log('Edit book ID:', id);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        const book = await getBookById(id);
        setBook(book);
      };
      fetchBook();
    }
  }, [id]);

  const handleEdit = useCallback(async (book) => {
    console.log('Editing book:', book);
    setIsPending(true)
    updateBook(id, book)
      .then(() => {
        router.push('/');
      })
      .catch(() => {
        console.error('Failed to edit book: ', book);
      })
      .finally(() => {
        setIsPending(false);
      })
  }, [router, id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Book</h1>
      <BookForm onSubmit={handleEdit} initialData={book} isPending={isPending} />
    </div>
  );
}

export default Edit;