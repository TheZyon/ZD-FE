export interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
  roles:string[];
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthData {
  accessToken: string;

  username: string

}
