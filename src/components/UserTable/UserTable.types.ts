import { User } from "../../api/getAllUsers.types";

export type Header = {
  id: number;
  KEY: keyof User;
  LABEL: string;
};

export type SortState = {
  keyToSort: keyof User;
  direction: 'asc' | 'desc';
};