import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'

type AuthState = {
    userType:string
    token:string
    setUserType: (type: string) => void;
    setToken: (type: string) => void;
};

const useAuthStore = create<AuthState>()(
    persist(
        devtools(
            (set, get) => ({
                userType: '',
                token:'',
                setToken: (token: any) => set({ token: token }),
                setUserType: (type: any) => set({ userType: type }),
            })
        ),
        {
            name: 'auth-storage',
        }
    )
)

export default useAuthStore;