import { useAppDispatch, useAppSelector } from '../../state/store';
import { changeFilterState } from '../../state/filtersSlice';
import { setSort } from '../../state/sortSlice';
import { User } from '../../apiTypes/users.types';
import { headers } from './helpers';
import styles from './TableHeader.module.css';

export const TableHeader = () => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(state => state.userTableSort);
  const searchValues = useAppSelector(state => state.userTableFilters);

  const handleHeaderClick = (headerKey: keyof User) => {
    dispatch(setSort({ headerKey }));
  };

  const handleSearchChange = (headerKey: keyof User, value: string) => {
    dispatch(changeFilterState({ headerKey, value }));
  };

  const getSortIcon = (headerKey: keyof User) => {
    if (headerKey === sort.keyToSort) {
      return sort.direction === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  return (
    <thead>
      <tr>
        {headers.map(header => (
          <th key={header.KEY} onClick={() => handleHeaderClick(header.KEY as keyof User)}>
            <div className={styles.headerContent}>
              <div className={styles.headerLabel}>
                {header.LABEL}
                <span>{getSortIcon(header.KEY as keyof User)}</span>
              </div>
              <div className={styles.inputContainer} onClick={(e) => e.stopPropagation()}>
                <img src="/assets/images/SearchIcon.svg" />
                <input
                  placeholder={`Search ${header.LABEL}...`}
                  className={styles.input}
                  value={searchValues[header.KEY] || ''}
                  onChange={(e) => handleSearchChange(header.KEY as keyof User, e.target.value)}
                />
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
