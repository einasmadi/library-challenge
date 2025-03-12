import { useState, useEffect } from 'react';
import { getAuthors } from '@/services/author/api';

export default function useAuthors(initialAuthorName, setValue) {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthorInput, setShowAuthorInput] = useState(false);

  // Fetch authors on mount
  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await getAuthors();
      setAuthors(data);
      setIsLoading(false);

      // Set the default value for the author dropdown if initialAuthorName is provided
      if (initialAuthorName) {
        const existingAuthor = data.find((a) => a.name === initialAuthorName);
        if (existingAuthor) {
          setValue('author', { value: existingAuthor.id, label: existingAuthor.name });
        } else {
          setValue('author', { value: 'new', label: initialAuthorName });
          setShowAuthorInput(true);
        }
      }
    };

    fetchAuthors();
  }, [initialAuthorName, setValue]);

  const authorOptions = authors.map((author) => ({
    value: author.id,
    label: author.name,
  }));
  // Add an option for creating a new author
  authorOptions.push({ value: 'new', label: 'Create New Author' });

  return {
    authors,
    isLoading,
    showAuthorInput,
    authorOptions,
    setShowAuthorInput,
  };
}