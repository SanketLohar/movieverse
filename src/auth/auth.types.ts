export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Session = {
  user: User;
  loggedInAt: number;
};
