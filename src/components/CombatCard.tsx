import { useEffect, useState } from 'react';
import { IconBallpenFilled, IconMinus, IconPlus, IconSkull } from '@tabler/icons-react';
import { ThemeIcon } from '@mantine/core';
import { Player } from './Modal';

interface CombatCardProps {
  name: string;
  init: number;
  hp: number;
  ac?: number;
  conditions: string;
  isPlayer: boolean;
  defeated?: boolean;
  isEdit: (player: Player, event?: React.MouseEvent) => void;
}

export const CombatCard: React.FC<CombatCardProps> = ({
  defeated: propDefeated = false,
  hp: healthHP = 100,
  conditions,
  isPlayer,
  ac,
  init,
  name,
  isEdit,
}) => {
  const [defeated, setDefeated] = useState(propDefeated);
  const [health, setHealth] = useState(healthHP);

  useEffect(() => {
    setHealth(healthHP);
  }, [healthHP]);

  const hendlerHP = (operation: 'increase' | 'decrease') => {
    if (operation === 'increase') {
      health < 100 && setHealth((prev) => prev + 1);
    } else {
      health > 0 && setHealth((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setDefeated(propDefeated);
  }, [propDefeated]);

  const toggleDefeated = () => {
    setDefeated((prev) => !prev);
  };

  return (
    <>
      <div>{name}</div>
      <button onClick={isEdit}>
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconBallpenFilled size={16} />
        </ThemeIcon>
      </button>
      <button onClick={toggleDefeated}>
        <ThemeIcon color={defeated ? 'red' : 'teal'} size={24} radius="xl">
          <IconSkull size={16} />
        </ThemeIcon>
      </button>

      <div>
        <div>Initiative: {init}</div>

        <button onClick={() => hendlerHP('increase')}>
          <ThemeIcon size={24} radius="xl">
            <IconPlus size={16} />
          </ThemeIcon>
        </button>
        <div>HP: {health}</div>
        <button onClick={() => hendlerHP('decrease')}>
          <ThemeIcon size={24} radius="xl">
            <IconMinus size={16} />
          </ThemeIcon>
        </button>

        <div>AC: {ac}</div>
        <div>Conditions: {conditions}</div>
      </div>
    </>
  );
};
