import styles from './UserTable.module.css';
import { useAppSelector } from '../../state/store';
import { useGetAllUsersQuery } from '../../state/users';
import { User } from '../../apiTypes/users.types';
import { TableHeader } from '../TableHeader/TableHeader';

export const UserTable = () => {
  const sort = useAppSelector(state => state.userTableSort);
  const searchValues = useAppSelector(state => state.userTableFilters);

  const { data: users = [], error, isLoading } = useGetAllUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!users) {
    return <p>No data</p>;
  }

  function getSortedUsers(arrayToSort: User[]) {
    return [...arrayToSort].sort((a, b) => {
      if (sort.direction === 'asc') {
        return a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1;
      }
      return a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1;
    });
  }

  const filteredUsers = users.filter(user =>
    Object.keys(searchValues).every(key => {
      const searchedValue = searchValues[key as keyof User] || '';
      return user[key as keyof User]
        .toString()
        .toLowerCase()
        .includes(searchedValue.toLowerCase());
    })
  );

  const sortedUsers = getSortedUsers(filteredUsers);

  return (
    <table className={styles.usersTable}>
      <TableHeader />
      <tbody>
        {sortedUsers.map((user, index) => (
          <tr key={index}>
            <td data-label="Name" className={styles.nameColumn}>{user.name}</td>
            <td data-label="Username" className={styles.usernameColumn}>{user.username}</td>
            <td data-label="Email" className={styles.emailColumn}>{user.email}</td>
            <td data-label="Phone" className={styles.phoneColumn}>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
