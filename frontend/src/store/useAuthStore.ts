import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
// axios
import { axiosInstance } from "../lib/axios";
// types
import { AuthState } from "../data/types/auth-state";
// constants
import { SOCKET_BASE_URL } from "../constants";
import axios from "axios";

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async (): Promise<void> => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        authUser: res.data,
      });
      get().connectSocket();
    } catch (error) {
      console.log("[Error]", error);

      set({
        authUser: null,
      });
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      if (error instanceof Error) toast.error(error.message);
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(SOCKET_BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));