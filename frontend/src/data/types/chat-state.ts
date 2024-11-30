import { IMessage } from "../interfaces/message.interface";
import { SendMessage } from "../interfaces/send-message.interface";
import { IUser } from "../interfaces/user.interface";

export type ChatState = {
  messages: IMessage[];
  users: IUser[];
  selectedUser: IUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (payload: string) => Promise<void>;
  setSelectedUser: (payload: IUser | null) => void;
  sendMessage: (payload: SendMessage) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
};
