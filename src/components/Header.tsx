import { useState } from 'react';
import { Button } from '@mantine/core';

interface HeaderProps {
  // onNext: () => void;
  // onPrev: () => void;
  onAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdd }) => {
  const [round, setRound] = useState(0);

  const hendlerRound = (operation: 'increase' | 'decrease') => {
    if (operation === 'increase') {
      setRound((prev) => prev + 1);
    } else {
      round > 0 && setRound((prev) => prev - 1);
    }
  };

  return (
    <>
      <Button
        onClick={() => hendlerRound('decrease')}
        variant="filled"
        color="gray"
        size="xl"
        radius="xl"
      >
        Prev
      </Button>

      <Button
        onClick={() => hendlerRound('increase')}
        variant="filled"
        color="gray"
        size="xl"
        radius="xl"
      >
        Next
      </Button>

      <Button variant="filled" color="gray" size="xl" radius="xl" onClick={onAdd}>
        Add
      </Button>

      <p>{round}</p>
    </>
  );
};

export default Header;
