import { useState, useEffect } from "react";
import { Repo } from "./types";
import loadingGif from "../../assets/loading.gif";
import RepoItem from "./RepoItem";

interface RepoListProps {
  username: string;
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!res.ok) throw new Error(`Failed to fetch repositories (Status: ${res.status})`);
        const data: Repo[] = await res.json();
        setRepos(data);
      } catch (err) {
        setError("Failed to load repositories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return (
    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
      {loading ? (
        <div className="flex justify-center items-center my-2" aria-live="polite">
          <img src={loadingGif} alt="Loading..." className="w-32 md:w-48" loading="lazy" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center dark:text-red-400">{error}</p>
      ) : (
        <ul>
          {repos.length > 0 ? repos.map((repo) => <RepoItem key={repo.id} repo={repo} />) : <p className="text-gray-500 dark:text-gray-400">No repositories available.</p>}
        </ul>
      )}
    </div>
  );
};

export default RepoList;
