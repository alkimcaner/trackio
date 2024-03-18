import { List, User } from "@prisma/client";

export type ListWithUser = List & { User: User };

export type UserWithLists = User & { lists: ListWithUser[] };

export enum ListType {
  Game = "game",
  Movie = "movie",
  TV = "tv",
}
