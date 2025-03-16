import { useState } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import loadingGif from "../assets/loading.gif";

interface User {
  id: number;
  login: string;
  avatar_url: string;
}

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  homepage: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [repos, setRepos] = useState<{ [key: string]: Repo[] }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string | null }>({});

  const toggleExpand = async (username: string) => {
    if (expandedUser === username) {
      setExpandedUser(null);
      return;
    }

    setExpandedUser(username);
    setError((prev) => ({ ...prev, [username]: null }));

    if (!repos[username]) {
      setLoading((prev) => ({ ...prev, [username]: true }));

      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!res.ok) throw new Error(`Failed to fetch repositories (Status: ${res.status})`);

        const data: Repo[] = await res.json();
        setRepos((prev) => ({ ...prev, [username]: data }));
      } catch (err) {
        setError((prev) => ({ ...prev, [username]: "Failed to load repositories. Please try again." }));
      } finally {
        setLoading((prev) => ({ ...prev, [username]: false }));
      }
    }
  };

  const handleLimitString = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">GitHub Users Found</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded-xl mb-2 dark:border-gray-700">
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-xl"
              onClick={() => toggleExpand(user.login)}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={user.avatar_url} 
                  alt={user.login} 
                  className="w-10 h-10 rounded-full" 
                  loading="lazy" 
                />
                <span className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-300">
                  {user.login}
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                {expandedUser === user.login ? <MdOutlineExpandLess size={24} /> : <MdOutlineExpandMore size={24} />}
              </span>
            </div>

            {/* Repositories List */}
            {expandedUser === user.login && (
              <div className={`mt-2 p-2 ${loading[user.login] ? "" : "bg-gray-50 dark:bg-gray-800"} rounded-xl`}>
                {loading[user.login] ? (
                  <div className="flex justify-center items-center my-2" aria-live="polite">
                    <img src={loadingGif} alt="Loading..." className="w-32 md:w-48" loading="lazy" />
                  </div>
                ) : error[user.login] ? (
                  <p className="text-red-500 text-center dark:text-red-400">{error[user.login]}</p>
                ) : (
                  <ul>
                    {repos[user.login]?.length > 0 ? (
                      repos[user.login].map((repo) => (
                        <li key={repo.id} className="p-2 border-b dark:border-gray-700">
                          <div className="flex justify-between items-center">
                            {/* Title and Star Count */}
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              <h3 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300">
                                {handleLimitString(repo.name, 30)}
                              </h3>
                            </a>
                            <div className="flex items-center gap-1 text-sm">
                              <FaStar className="text-yellow-500 dark:text-yellow-400" />
                              <span className="text-gray-600 dark:text-gray-300">{repo.stargazers_count}</span>
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            {handleLimitString(repo.description || "No description provided", 80)}
                          </p>
                          {repo.homepage && (
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                              <p className="mt-2 text-xs md:text-sm">
                                Live Preview: 
                                <span className="text-blue-600 dark:text-blue-400 hover:text-blue-300 hover:dark:text-blue-200">
                                  {handleLimitString(repo.homepage, 40)}
                                </span>
                              </p>
                            </a>
                          )}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No repositories available.</p>
                    )}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
