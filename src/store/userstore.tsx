import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'

type AuthState = {
    userType:string
    setUserType: (type: string) => void;
};

const useAuthStore = create<AuthState>()(
    persist(
        devtools(
            (set, get) => ({
                userType: 'user',
                setUserType: (type: any) => set({ userType: type }),
            })
        ),
        {
            name: 'auth-storage',
        }
    )
)

export default useAuthStore;