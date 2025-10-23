import { useEffect, useState } from 'react';
import CombatList from '@/components/CombatantList';
import { Modalwindow, Player } from '@/components/Modal';
import Header from '../components/Header';

const TrackerPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const STORAGE_KEY = 'combat-tracker-players';
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);

  const handleOpenModal = (operation: 'newPlayer' | 'upDatePlayer', playerData?: Player) => {
    if (operation === 'newPlayer') {
      setPlayer(null);
    } else {
      setPlayer(playerData ?? null);
    }
    setIsOpen(true);
  };

  useEffect(() => {
    const loadPlayers = () => {
      try {
        const savedPlayers = localStorage.getItem(STORAGE_KEY);
        if (savedPlayers) {
          const parsed = JSON.parse(savedPlayers);
          if (Array.isArray(parsed)) {
            const sorted = [...parsed].sort((a, b) => b.init - a.init);
            setSortedPlayers(sorted);
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setSortedPlayers([]);
      }
    };

    loadPlayers();
  }, []);

  const handleSaveEdit = (editedPlayer: Player) => {
    const updatedPlayers = sortedPlayers.map((p) => (p.id === editedPlayer.id ? editedPlayer : p));
    setSortedPlayers(updatedPlayers);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlayers));
    setIsOpen(false);
  };

  useEffect(() => {
    const savePlayers = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedPlayers));
        console.log('Сохранено игроков:', sortedPlayers.length);
      } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
      }
    };

    savePlayers();
  }, [sortedPlayers]);

  const handleSavePlayer = (playerData: Player) => {
    setSortedPlayers((prev) => [...prev, playerData]);
    setIsOpen(false);

    console.log('Новый игрок добавлен:', playerData);
  };

  return (
    <>
      <Header onAdd={() => handleOpenModal('newPlayer')} />
      <CombatList
        array={sortedPlayers}
        editModal={(playerData: Player) => handleOpenModal('upDatePlayer', playerData)}
      />
      <Modalwindow
        opened={isOpen}
        onSave={player ? handleSaveEdit : handleSavePlayer}
        onClose={() => setIsOpen(false)}
        player={player}
      />
    </>
  );
};

export default TrackerPage;
