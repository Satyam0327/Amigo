import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiHelper from '../helper/apiHelper';
import { setLocalStoreData, clearAllLocalStoreData } from '../helper/localStorage';
import { TOKEN } from '../constants/string';
import * as SplashScreen from 'expo-splash-screen';
const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            addName: async (name) => {
                apiHelper.put('/user', { name });
                set({ user: { ...get().user, name } });
            },
            logout: async () => {
                set({ user: null });
                clearAllLocalStoreData();
            },
            verifyOTP: async (phoneNumber, countryCode, otp) => {
                const { user } = get();
                const endpoint = user ? 'editPhoneNumber' : 'verifyOTP';
                const { data } = await apiHelper.post(`/auth/${endpoint}`, {
                    phoneNumber,
                    countryCode,
                    otp,
                });
                if (user) {
                    set({ 
                        user: {
                            ...get().user,
                            phoneNumber,
                            countryCode,
                        } 
                    });
                    return;
                }
                if (data.status) return;
                const { userData, token } = data;
                set({ user: userData });
                setLocalStoreData(TOKEN, token);
            },
            editUser: async (editedUser) => {
                set({ user: { ...get().user, ...editedUser } });
                apiHelper.put('/user', editedUser);
            },
        }),
        {
            name: 'auth',
            getStorage: () => AsyncStorage,
            onCreate: async (set) => {
                try {
                    const { data } = await apiHelper.get('/user');
                    set({ user: data });
                } catch (e) {
                    console.error('Error fetching user data:', e);
                }
                await SplashScreen.hideAsync();
            },
        },
    ),
);

export const useAuth = useAuthStore;