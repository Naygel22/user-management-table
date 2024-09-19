import { User } from "../../apiTypes/users.types";

export type Header = {
  id: number;
  KEY: keyof User;
  LABEL: string;
};
