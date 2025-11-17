import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Player } from '@/components/Modal';

interface TrackerState {
  // Состояние
  isModalOpen: boolean;
  sortedPlayers: Player[];
  player: Player | null;

  // Действия
  setIsModalOpen: (value: boolean) => void;
  setSortedPlayers: (players: Player[]) => void;
  setPlayer: (player: Player | null) => void;
}

export const useTrackerStore = create(
  persist(
    (set): TrackerState => ({
      // Состояние
      isModalOpen: false,
      sortedPlayers: [],
      player: null,

      // Действия
      setIsModalOpen: (value) => set({ isModalOpen: value }),
      setSortedPlayers: (players) => set({ sortedPlayers: players }),
      setPlayer: (player) => set({ player }),
    }),
    {
      name: 'tracker', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
