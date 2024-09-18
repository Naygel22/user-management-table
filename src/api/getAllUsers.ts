import { User } from './getAllUsers.types';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    return [];
  }

  const data: User[] = await response.json();
  return data;
}