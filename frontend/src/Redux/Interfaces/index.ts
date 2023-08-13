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
  image: string;
  indirizzo: address[];
  email: string;
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ADDRESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export interface address {
  id: number;
  state: string;
  city: string;
  street: string;
  region: string;
  houseNumber: number;
  cap: string;
}
export interface newAddress {
  state: string;
  city: string;
  street: string;
  region: string;
  houseNumber: number;
  cap: string;
}

export interface MyAddress {
  AllAddressesByUser: address[];
  address: address;
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PRODUCTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export interface MyProduct {
  AllProducts: products[];
  product: products;
}

export interface products {
  id: 0;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  review: review[];
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REVIEW >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export interface review {
  id: number;
  user: user;
  comment: string;
  valutation: number;
  published: Date;
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CART >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export interface MyCart {
  allProducts: products[];
  quantity: number[];
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CART >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export interface FormData {
  file: File | null;
}
