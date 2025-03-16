import { useState, useCallback, useRef } from "react";
import useOnlineStatus from "./useOnlineStatus";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isOffline = useOnlineStatus();
  const fetchController = useRef<AbortController | null>(null);

  const fetchUsers = useCallback((query: string) => {
    if (!query.trim()) return;

    if (isOffline) {
      setError("You are offline. Please check your internet connection.");
      return;
    }

    setLoading(true);
    setError("");
    setUsers([]);

    if (fetchController.current) {
      fetchController.current.abort();
    }

    fetchController.current = new AbortController();
    const timeoutId = setTimeout(() => fetchController.current?.abort(), 5000);

    (async () => {
      try {
        const res = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`, {
          signal: fetchController?.current?.signal,
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();
        if (!data.items || data.items.length === 0) {
          setError("No users found. Try searching with a different keyword.");
        } else {
          setUsers(data.items);
        }
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          setError("Request timed out. Ensure you have a stable internet connection and try again.");
        } else if (isOffline) {
          setError("You are offline. Please check your internet connection.");
        } else if (error instanceof Error) {
          setError(error.message || "An unexpected error occurred.");
        } else {
          setError("Unable to fetch users. Please try again later.");
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    })();
  }, [isOffline]);

  return { users, loading, error, fetchUsers };
};

export default useFetchUsers;
