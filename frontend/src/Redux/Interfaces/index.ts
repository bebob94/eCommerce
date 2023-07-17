// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REGISTRAZIONE E LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export interface User {
  id: number;
  name: string;
  email: string;
  family_name: string;
  given_name: string;
}
export interface MyState {
  user: Registration;
}
export interface Roles {
  id: number;
  roleName: string;
}
export interface Registration {
  id: number;
  username: string;
  accessToken: string;
  roles: Roles[];
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export interface MyUser {
  AllUsers: user[];
  user: user;
}
export interface user {
  id: number;
  name: string;
  image: string;
  username: string;
  email: string;
  password: string;
  address: address[];
  roles: Roles[];
}
export interface userChange {
  id?: number;
  name: string;
  surname: string;
  indirizzo: string;
}

export interface address {
  id: number;
  state: string;
  city: string;
  street: string;
  region: string;
  houseNumber: number;
  cap: string;
}
