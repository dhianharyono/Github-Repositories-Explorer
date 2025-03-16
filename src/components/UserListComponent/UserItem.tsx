import { useState } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { User } from "./types";
import RepoList from "./RepoList";

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="border p-2 rounded-xl mb-2 dark:border-gray-700">
      <div
        className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-xl"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-4">
          <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" loading="lazy" />
          <span className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-300">{user.login}</span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">
          {expanded ? <MdOutlineExpandLess size={24} /> : <MdOutlineExpandMore size={24} />}
        </span>
      </div>

      {expanded && <RepoList username={user.login} />}
    </li>
  );
};

export default UserItem;
