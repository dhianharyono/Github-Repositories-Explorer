import { User } from "./UserListComponent/types";
import UserItem from "./UserListComponent/UserItem";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">GitHub Users Found</h2>
      <ul>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
