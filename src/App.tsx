import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import ThemeSwitcher from "./components/ThemeSwitcher";
import OfflineWarning from "./components/OfflineWarning";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage";
import useFetchUsers from "./hooks/useFetchUsers";
import useOnlineStatus from "./hooks/useOnlineStatus";

const App: React.FC = () => {
  const { users, loading, error, fetchUsers } = useFetchUsers();
  const isOffline = useOnlineStatus();

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
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

      <OfflineWarning isOffline={isOffline} />
      <SearchBar onSearch={fetchUsers} />
      <LoadingIndicator loading={loading} />
      <ErrorMessage error={error} isOffline={isOffline} />
      {!loading && users.length > 0 && <UserList users={users} />}
    </div>
  );
};

export default App;
