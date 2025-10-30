import { IconAssembly } from '@tabler/icons-react';
import { List, ThemeIcon } from '@mantine/core';
import { CombatCard } from './CombatCard';
import { Player } from './Modal';

interface CombatListProps {
  array: Player[];
  editModal: (player: Player) => void;
  onPlusHP: (playerId: number, change: number) => void;
  onMinusHP: (playerId: number, change: number) => void;
  editDefeated: (playerId: number) => void;
}

const CombatList: React.FC<CombatListProps> = ({
  array,
  editModal,
  onPlusHP,
  onMinusHP,
  editDefeated,
}) => {
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
        {array.map((playerItem) => (
          <List.Item key={playerItem.id}>
            <CombatCard
              name={playerItem.name}
              init={playerItem.init}
              hp={playerItem.hp}
              ac={playerItem.ac}
              conditions={playerItem.hp === 0 ? 'без сознания' : playerItem.conditions}
              isPlayer={playerItem.isPlayer}
              defeated={playerItem.defeated}
              isEdit={() => editModal(playerItem)}
              plusHP={() => onPlusHP(playerItem.id, 1)}
              minusHP={() => onMinusHP(playerItem.id, -1)}
              toggleDefeated={() => editDefeated(playerItem.id)}
              arrayItem={playerItem}
            />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default CombatList;
