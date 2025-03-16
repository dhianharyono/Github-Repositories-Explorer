import { FaStar } from "react-icons/fa";
import { Repo } from "./types";

const languageColors: { [key: string]: string } = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-400",
  Python: "bg-green-500",
  Java: "bg-red-500",
  "C++": "bg-purple-500",
  Ruby: "bg-pink-400",
  PHP: "bg-indigo-500",
  Swift: "bg-orange-400",
  Go: "bg-teal-400",
  Kotlin: "bg-gray-500",
  Vue: "bg-gray-300",
  Default: "bg-gray-400",
};

const handleLimitString = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

interface RepoItemProps {
  repo: Repo;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  const languageColor = languageColors[repo.language || "Default"];

  return (
    <li className="p-5 border-b dark:border-gray-700">
      <div className="flex justify-between items-center">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <h3 className="font-semibold text-xs md:text-base text-gray-800 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300">
            {handleLimitString(repo.name, 30)}
          </h3>
        </a>
        <div className="flex items-center gap-1 text-sm">
          <FaStar className="text-yellow-500 dark:text-yellow-400" />
          <span className="text-gray-600 dark:text-gray-300">{repo.stargazers_count ?? 0}</span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
        {handleLimitString(repo.description || "No description provided", 80)}
      </p>

      {repo.language && (
        <div className="flex items-center gap-2 mt-1">
          <span className={`w-3 h-3 rounded-full ${languageColor}`}></span>
          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{repo.language}</span>
        </div>
      )}

      {repo.homepage && (
        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
          <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Live Preview :
            <span className="text-blue-600 dark:text-blue-400 hover:text-blue-300 hover:dark:text-blue-200 ml-1">
              {handleLimitString(repo.homepage, 40)}
            </span>
          </p>
        </a>
      )}
    </li>
  );
};

export default RepoItem;
