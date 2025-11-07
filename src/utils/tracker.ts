import { Player } from '@/components/Modal';

export const editHp = (sortedPlayers: Player[], playerId: number, change: number): Player[] => {
  const updatedPlayers = sortedPlayers.map((player) =>
    player.id === playerId ? { ...player, hp: Math.max(0, player.hp + change) } : player
  );

  return updatedPlayers;
};

export const changeConditions = (
  sortedPlayers: Player[],
  playerId: Player['id'],
  conditions: Player['conditions']
): Player[] => {
  const updatedPlayers = sortedPlayers.map((player) =>
    player.id === playerId ? { ...player, conditions } : player
  );

  return updatedPlayers;
};

export const toggleDefeated = (players: Player[], playerId: number) => {
  const updatedDefeated = players.map((player) =>
    player.id === playerId ? { ...player, defeated: !player.defeated } : player
  );
  return updatedDefeated;
};

export const changeTurn = (players: Player[]): Player[] => {
  return players;
};
