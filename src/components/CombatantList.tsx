import { IconCircleCheck } from '@tabler/icons-react';
import { List, ThemeIcon } from '@mantine/core';
import { CombatCard } from './CombatCard';
import { Player } from './Modal';

interface CombatListProps {
  array: Player[];
  editModal: (player: Player) => void;
}

const CombatList: React.FC<CombatListProps> = ({ array, editModal }) => {
  return (
    <div>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        <List>
          {array.map((playerItem) => (
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
              />
            </List.Item>
          ))}
        </List>
      </List>
    </div>
  );
};

export default CombatList;
