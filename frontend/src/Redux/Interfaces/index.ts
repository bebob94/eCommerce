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
