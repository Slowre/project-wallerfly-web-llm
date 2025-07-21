import { create } from 'zustand'
import type { StoreType } from '@/types/Store'


export const useAppStore = create<StoreType>(
    (set) => ({
        theme: 'light',
        setTheme: (theme) =>
            set((state) => {
                localStorage.setItem('theme',theme)
                if (theme == 'dark') {

                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                }
                return { ...state, theme }
            })
    })
)