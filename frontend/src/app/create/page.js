"use client";

import BookForm from '@/components/BookForm';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from "react";
import { createBook } from "@/services/book/api";

export default function Create() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = useCallback(async (book) => {
    console.log('Creating book:', book);
    setIsPending(true)
    setError(null);

    createBook(book)
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.error('Failed to create book', e);
        setError('Failed to create book. Please try again.');
      })
      .finally(() => {
        setIsPending(false);
      })
  }, [router]);

  return (
    <div>
      <h1>Create Book</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BookForm onSubmit={handleCreate} isPending={isPending} />
    </div>
  );
}
