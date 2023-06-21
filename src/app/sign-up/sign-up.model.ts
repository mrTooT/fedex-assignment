export enum PasswordError {
  Empty = "EMPTY",
  Characters = "CHARACTERS",
  NameUsage = "NAME"
}

export type SignUpDetails =  {
  firstName: string;
  lastName: string;
  email: string;
}