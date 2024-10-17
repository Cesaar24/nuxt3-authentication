type Role = 'User' | 'Admin'

interface User {
  name: string;
  lastName: string;
  username: string;
  password?: string;
  email: string;
  id: string;
  role:Role
}
interface UserRegisterForm {
  name: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;

}
interface UserInput {
  email: string;
  password: string;
}


