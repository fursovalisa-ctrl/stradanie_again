import { useEffect, useState } from 'react';
import { Button, Divider, Group, Title } from '@mantine/core';

interface HeaderProps {
  onAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdd }) => {
  const [round, setRound] = useState(0);

  useEffect(() => {
    const savedRound = localStorage.getItem('currentRound');
    if (savedRound) {
      setRound(Number(savedRound));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentRound', round.toString());
  }, [round]);

  const hendlerRound = (operation: 'increase' | 'decrease') => {
    if (operation === 'increase') {
      setRound((prev) => prev + 1);
    } else {
      round > 0 && setRound((prev) => prev - 1);
    }
  };

  return (
    <>
      <Group justify="space-evenly" mt="md" mb="xs">
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
      </Group>
      <Divider
        my="xs"
        labelPosition="center"
        label={
          <Title ta="center" order={3}>
            Раунд {round}
          </Title>
        }
      />
    </>
  );
};

export default Header;
