import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
// types
import { ChatState } from "../data/types/chat-state";
// axios
import { axiosInstance } from "../lib/axios";
// states
import { useAuthStore } from "./useAuthStore";
import { IMessage } from "../data/interfaces/message.interface";

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (id: string) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${id}`);
      set({ messages: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser!._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      if (error instanceof Error) toast.error(error.message);
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage: IMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
