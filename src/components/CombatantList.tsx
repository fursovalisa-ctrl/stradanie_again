import { IconAssembly } from '@tabler/icons-react';
import { List, ThemeIcon } from '@mantine/core';
import { useTrackerStore } from '@/stores/useTrackerStore';
import { CombatCard } from './CombatCard';
import { Player } from './Modal';

interface CombatListProps {
  array: Player[];
  editModal: (player: Player) => void;
  onPlusHP: (playerId: number, change: number) => void;
  onMinusHP: (playerId: number, change: number) => void;
  editDefeated: (playerId: number) => void;
  brosokEffect: (operation: 'green' | 'red', playerId: number) => void;
}

const CombatList: React.FC<CombatListProps> = ({
  editModal,
  onPlusHP,
  onMinusHP,
  editDefeated,
  brosokEffect,
}) => {
  const { sortedPlayers } = useTrackerStore();
  console.log(sortedPlayers);
  return (
    <div>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="dark" size={50} radius="xl">
            <IconAssembly size={30} />
          </ThemeIcon>
        }
      >
        {sortedPlayers?.map((playerItem) => (
          <List.Item key={playerItem.id}>
            <CombatCard
              name={playerItem.name}
              init={playerItem.init}
              hp={playerItem.hp}
              ac={playerItem.ac}
              conditions={playerItem.conditions}
              isPlayer={playerItem.isPlayer}
              defeated={playerItem.defeated}
              isEdit={() => editModal(playerItem)}
              plusHP={() => onPlusHP(playerItem.id, 1)}
              minusHP={() => onMinusHP(playerItem.id, -1)}
              toggleDefeated={() => editDefeated(playerItem.id)}
              brosok={brosokEffect}
              arrayItem={playerItem}
              isActive
            />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default CombatList;
