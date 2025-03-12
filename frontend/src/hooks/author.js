import { useEffect, useState } from "react";
import { getAuthors } from "@/services/author/api";

// Custom hook to load authors
export const useAuthors = ({ reload }) => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);

  if (reload) {
    setCounter(counter + 1);
    setLoading(true);
    setError(null);
    setAuthors([]);
  }

  useEffect(() => {
    const fetchAuthors = async () => {
        const data = await getAuthors();
        setAuthors(data);
    };

    fetchAuthors();
  }, []);

  return { authors, loading, error };
};
