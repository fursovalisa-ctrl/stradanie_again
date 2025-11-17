import { useEffect } from 'react';
import CombatList from '@/components/CombatantList';
import { Modalwindow, Player } from '@/components/Modal';
import { useTrackerStore } from '@/stores/useTrackerStore';
// import { editHp } from '@/utils/tracker';
import Header from '../components/Header';

const TrackerPage: React.FC = () => {
  const { setIsModalOpen, sortedPlayers, setSortedPlayers, player, setPlayer } = useTrackerStore();
  const STORAGE_KEY = 'combat-tracker-players';

  const handleOpenModal = (operation: 'newPlayer' | 'upDatePlayer', playerData?: Player) => {
    if (operation === 'newPlayer') {
      setPlayer(null);
    } else {
      setPlayer(playerData ?? null);
    }
    setIsModalOpen(true);
  }; //есть ли данные для редактирования или создаем игрока с 0
  const handleEditHP = (array: Player[]) => (playerId: number, change: number) => {
    const updatedPlayers = array?.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          hp: Math.max(0, player.hp + change), // защита от отрицательного HP
        };
      }
      return player; // остальные игроки без изменений
    });

    return updatedPlayers;
  }; //здоровье

  const handleBrosok = (operation: 'green' | 'red', playerId: number) => {
    if (operation === 'green') {
      const data = handleEditHP(sortedPlayers)(playerId, 1);
      const result = handleDefeated(data)(playerId, 'green');
      setSortedPlayers(result);
    } else {
      const result = handleDefeated(sortedPlayers)(playerId, 'red');
      setSortedPlayers(result);
    }
  };
  const handleDefeated = (array: Player[]) => (playerId: number, operation?: 'green' | 'red') => {
    const updatedDefeated = array.map((player) => {
      const defeated = operation === 'red';
      return player.id === playerId
        ? { ...player, defeated: operation ? defeated : !player.defeated }
        : player;
    });
    return updatedDefeated;
  }; //значок помер

  const handleHP = (id: number, change: number) => {
    const result = handleEditHP(sortedPlayers)(id, change);
    return setSortedPlayers(result);
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
  }, []); //загружаем игроков из массива и сортируем по инициативе

  const handleSaveEdit = (editedPlayer: Player) => {
    const updatedPlayers = sortedPlayers?.map((p) => (p.id === editedPlayer.id ? editedPlayer : p));
    setSortedPlayers(updatedPlayers);

    setIsModalOpen(false);
  }; //изменения в данных игрока

  useEffect(() => {
    const savePlayers = () => {
      try {
        console.log('Сохранено игроков:', sortedPlayers.length);
      } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
      }
    };

    savePlayers();
  }, [sortedPlayers]); //сохранение игрока

  const handleSavePlayer = (playerData: Player) => {
    setSortedPlayers([...sortedPlayers, playerData]);
    setIsModalOpen(false);

    console.log('Новый игрок добавлен:', playerData);
  };

  return (
    <>
      <Header onAdd={() => handleOpenModal('newPlayer')} />
      <CombatList
        array={sortedPlayers}
        editModal={(playerData: Player) => handleOpenModal('upDatePlayer', playerData)}
        onPlusHP={handleHP}
        onMinusHP={handleHP}
        editDefeated={(id) => setSortedPlayers(handleDefeated(sortedPlayers)(id))}
        brosokEffect={handleBrosok}
      />
      <Modalwindow
        onSave={player ? handleSaveEdit : handleSavePlayer}
        player={player}
        opened={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default TrackerPage;
