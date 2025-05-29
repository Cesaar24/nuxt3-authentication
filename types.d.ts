type Role = "User" | "Admin";
type Subscription = "Free" | "Basic" | "Standard" | "Premium";

interface User {
  name: string;
  lastName: string;
  username: string;
  password?: string;
  email: string;
  id: string;
  role: Role;
  subscription: Subscription;
}

interface userProfileForm {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
  subscription: Subscription;
}

interface UserState {
  user: {
    credentials: {
      logged: boolean;
      ip: string | null;
      infoConnection: object;
    };
    profile: User | {};
  };
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
