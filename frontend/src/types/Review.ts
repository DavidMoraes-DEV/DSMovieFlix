import { User } from "./User";


export type Review = {
  id: number;
  text: string;
  movieId: number;
  user: User;
};
