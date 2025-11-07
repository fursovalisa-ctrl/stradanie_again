import { useEffect, useState } from 'react';
import CombatList from '@/components/CombatantList';
import { Modalwindow, Player } from '@/components/Modal';
// import { editHp } from '@/utils/tracker';
import Header from '../components/Header';

const TrackerPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); //открытие модалки
  const STORAGE_KEY = 'combat-tracker-players';
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]); //изменение массива
  const [player, setPlayer] = useState<Player | null>(null); // новый игрок или редактирование

  const handleOpenModal = (operation: 'newPlayer' | 'upDatePlayer', playerData?: Player) => {
    if (operation === 'newPlayer') {
      setPlayer(null);
    } else {
      setPlayer(playerData ?? null);
    }
    setIsOpen(true);
  }; //есть ли данные для редактирования или создаем игрока с 0

  const handleBrosok = (operation: 'green' | 'red', playerId: number) => {
    if (operation === 'green') {
      handleEditHP(playerId, 1);
      handleDefeated(playerId, 'green');
    } else {
      handleDefeated(playerId, 'red');
    }
  };
  const handleDefeated = (playerId: number, operation?: 'green' | 'red') => {
    let updatedDefeated;
    if (operation === 'red') {
      updatedDefeated = sortedPlayers.map((player) =>
        player.id === playerId ? { ...player, defeated: true } : player
      );
    } else if (operation === 'green') {
      updatedDefeated = sortedPlayers.map((player) =>
        player.id === playerId ? { ...player, defeated: false } : player
      );
    } else {
      updatedDefeated = sortedPlayers.map((player) =>
        player.id === playerId ? { ...player, defeated: !player.defeated } : player
      );
    }
    setSortedPlayers(updatedDefeated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDefeated));
  }; //значок помер

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
  }, []); //загружаем игроков из массива и сортируем по инициативе

  const handleSaveEdit = (editedPlayer: Player) => {
    const updatedPlayers = sortedPlayers.map((p) => (p.id === editedPlayer.id ? editedPlayer : p));
    setSortedPlayers(updatedPlayers);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlayers));
    setIsOpen(false);
  }; //изменения в данных игрока

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
  }, [sortedPlayers]); //сохранение игрока

  const handleSavePlayer = (playerData: Player) => {
    setSortedPlayers((prev) => [...prev, playerData]);
    setIsOpen(false);

    console.log('Новый игрок добавлен:', playerData);
  };

  const handleEditHP = (playerId: number, change: number) => {
    const updatedPlayers = sortedPlayers.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          hp: Math.max(0, player.hp + change), // защита от отрицательного HP
        };
      }
      return player; // остальные игроки без изменений
    });

    setSortedPlayers(updatedPlayers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlayers));
  }; //здоровье

  return (
    <>
      <Header onAdd={() => handleOpenModal('newPlayer')} />
      <CombatList
        array={sortedPlayers}
        editModal={(playerData: Player) => handleOpenModal('upDatePlayer', playerData)}
        onPlusHP={handleEditHP}
        onMinusHP={handleEditHP}
        editDefeated={handleDefeated}
        brosokEffect={handleBrosok}
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
