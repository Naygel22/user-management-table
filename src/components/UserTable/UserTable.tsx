import { useState } from 'react';
import styles from './UserTable.module.css';
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from '../../api/getAllUsers';
import { Header, SortState } from './UserTable.types';
import { User } from '../../api/getAllUsers.types';

export const UserTable = () => {
  const [sort, setSort] = useState<SortState>({ keyToSort: 'name', direction: 'asc' });
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>({
    name: '',
    username: '',
    email: '',
    phone: ''
  });

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!users) {
    return <p>No data</p>;
  }

  const headers: Header[] = [
    { id: 1, KEY: "name", LABEL: "Name" },
    { id: 2, KEY: "username", LABEL: "Username" },
    { id: 3, KEY: "email", LABEL: "Email" },
    { id: 4, KEY: "phone", LABEL: "Phone" }
  ];

  function handleHeaderClick(header: Header) {
    setSort({
      keyToSort: header.KEY,
      direction:
        header.KEY === sort.keyToSort ? (sort.direction === 'asc' ? 'desc' : 'asc') : 'desc'
    });
  }

  function handleSearchChange(headerKey: string, value: string) {
    setSearchValues(prevValues => ({
      ...prevValues,
      [headerKey]: value
    }));
  }

  function getSortedUsers(arrayToSort: User[]) {
    return arrayToSort.sort((a, b) => {
      if (sort.direction === 'asc') {
        return a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1;
      }
      return a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1;
    });
  }

  const filteredUsers = getSortedUsers(users).filter(user =>
    headers.every(header =>
      user[header.KEY]
        .toString()
        .toLowerCase()
        .includes(searchValues[header.KEY].toLowerCase())
    )
  );

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
            <td className={styles.nameColumn}>{user.name}</td>
            <td className={styles.usernameColumn}>{user.username}</td>
            <td className={styles.emailColumn}>{user.email}</td>
            <td className={styles.phoneColumn}>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
