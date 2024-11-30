import { Socket } from "socket.io-client";
import { ISignUp } from "../interfaces/sign-up.interface";
import { IUser } from "../interfaces/user.interface";
import { ILogin } from "../interfaces/login.interface";
import { IUpdateProfile } from "../interfaces/update-profile.interface";

export type AuthState = {
  authUser: IUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: Socket | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
  signup: (payload: ISignUp) => Promise<void>;
  login: (payload: ILogin) => Promise<void>;
  updateProfile: (payload: IUpdateProfile) => Promise<void>;
};
