import styles from './UserTable.module.css';
import { Header } from './UserTable.types';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { changeFilterState } from '../../state/filtersSlice';
import { useGetAllUsersQuery } from '../../state/users';
import { headers } from './helpers';
import { User } from '../../apiTypes/users.types';
import { setSort } from '../../state/sortSlice';

export const UserTable = () => {
  const sort = useAppSelector(state => state.userTableSort)
  const searchValues = useAppSelector(state => state.userTableFilters)

  const dispatch = useAppDispatch()

  const { data: users = [], error, isLoading } = useGetAllUsersQuery()

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!users) {
    return <p>No data</p>;
  }

  function handleHeaderClick(header: Header) {
    dispatch(setSort({
      headerKey: header.KEY,
    }))
  }

  function handleSearchChange(headerKey: keyof User, value: string) {
    dispatch(changeFilterState({ headerKey, value }))
  }

  function getSortedUsers(arrayToSort: User[]) {
    return [...arrayToSort].sort((a, b) => {
      if (sort.direction === 'asc') {
        return a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1;
      }
      return a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1;
    });
  }

  const filteredUsers = getSortedUsers(users).filter(user =>
    headers.every(header => {
      const searchedValue = searchValues[header.KEY] || ''
      return user[header.KEY]
        .toString()
        .toLowerCase()
        .includes(searchedValue.toLowerCase())
    }))

  return (
    <table className={styles.usersTable}>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header.KEY} onClick={() => handleHeaderClick(header)}>
              <div className={styles.headerContent}>
                <div className={styles.headerLabel}>
                  {header.LABEL}
                  <img
                    src='src/assets/images/Sort Icon.svg'
                    alt="Sort Icon"
                  />
                </div>
                <div className={styles.inputContainer} onClick={(e) => e.stopPropagation()}>
                  <img src="src/assets/images/SearchIcon.svg" alt="Search Icon" />
                  <input
                    placeholder={`Search ${header.LABEL}...`}
                    className={styles.input}
                    value={searchValues[header.KEY]}
                    onChange={(e) => handleSearchChange(header.KEY, e.target.value)}
                  />
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user, index) => (
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
