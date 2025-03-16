import { useState, useEffect, useCallback, useRef } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import loadingGif from "./assets/loading.gif";
import dataNotFound from "./assets/not-found.gif";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const fetchController = useRef<AbortController | null>(null);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOffline(!navigator.onLine);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

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

  return (
    <div className="max-w-2xl mx-auto p-4 justify-center items-center dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200 relative">
      <header className="flex items-center justify-between w-full mb-4 p-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-300">
            GitHub User Explorer
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Search for GitHub users and explore their profiles.
          </p>
        </div>
        <ThemeSwitcher />
      </header>

      {/* Warning jika offline */}
      {isOffline && (
        <div className="text-center bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 p-2 rounded-lg mb-4">
          ⚠️ You are offline. Please check your connection for the best experience.
        </div>
      )}

      <SearchBar onSearch={fetchUsers} />

      {/* Loading Animation */}
      {loading && (
        <div className="flex justify-center items-center my-4">
          <img src={loadingGif} alt="Loading..." className="w-30 md:w-40" loading="lazy" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex flex-col items-center my-4">
          {!isOffline && <img src={dataNotFound} alt="No users found" className="w-20 md:w-30" loading="lazy" />}
          <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>
        </div>
      )}

      {/* User List */}
      {!loading && users.length > 0 && <UserList users={users} />}
    </div>
  );
};

export default App;
