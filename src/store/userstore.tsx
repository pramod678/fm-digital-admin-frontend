import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'

type AuthState = {
    userType: string;
    token: string;
    isSidebarOpen: boolean;
    setUserType: (type: string) => void;
    setToken: (type: string) => void;
    setSidebarOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;
};

const useAuthStore = create<AuthState>()(
    persist(
        devtools(
            (set, get) => ({
                userType: '',
                token: '',
                isSidebarOpen: false,
                setToken: (token: any) => set({ token: token }),
                setUserType: (type: any) => set({ userType: type }),
                setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
                toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            })
        ),
        {
            name: 'auth-storage',
        }
    )
)

export default useAuthStore;