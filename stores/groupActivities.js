import { create } from 'zustand'; 
import apiHelper from '../helper/apiHelper';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGroupActivitiesStore = create(
    persist(
        (set) => ({
            activitiesHash: {},
            setActivitiesHash: (groupId, updater) => { 
                set((state) => ({
                    activitiesHash: {
                        ...state.activitiesHash,
                        [groupId]: updater(state.activitiesHash[groupId] || []), 
                    },
                }));
            },
            getActivities: (groupId) => {
              const { activitiesHash } = useGroupActivitiesStore.getState();
                return activitiesHash[groupId] || [];
            },
        }),
        {
            name: 'groupActivities',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

const useGroupActivities = (groupId) => {
    const { setActivitiesHash, getActivities } = useGroupActivitiesStore();
    const activities = getActivities(groupId);

    const setActivities = (updater) => { 
        setActivitiesHash(groupId, ()=>updater);
    };

    const fetchActivities = async () => {
        try {
            const { data } = await apiHelper(
                `/activity-feed?groupId=${groupId}`,
            );
            setActivities(data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    return { activities, setActivities,fetchActivities };
};

export default useGroupActivities;
