import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UserType = {
  userInfo: {
    usn: string;
    role: string;
    voteList: Array<string>;
    voted: boolean;
    strand: string;
    name: string,
  };
  addUserInfo: (info: {
    usn: string;
    role: string;
    voteList: Array<string>;
    voted: boolean;
    strand: string;
    name: string
  }) => void;
  addVotes: (votes: Array<string>) => void;
  logout: () => void;
};

export const useUserStore = create<UserType>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          usn: "",
          role: "user",
          voteList: [],
          voted: false,
          strand: "",
          name: "",
        },
        addUserInfo: (info) => set(() => ({ userInfo: { ...info } })),
        addVotes: (votes) =>
          set((state) => ({
            userInfo: {
              ...state.userInfo,
              voteList: [...state.userInfo.voteList, ...votes],
            },
          })),
        logout: () =>
          set(() => ({
            userInfo: {
              usn: "",
              role: "user",
              voteList: [],
              voted: false,
              strand: "",
              name: "",
            },
          })),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
