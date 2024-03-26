import { Review, User } from "@prisma/client";

export type ReviewWithUser = Review & { User: User };
