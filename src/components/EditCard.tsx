import { useState } from 'react';
import {
  Button,
  Fieldset,
  NumberInput,
  Slider,
  Switch,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { Player } from './Modal';

interface EditCardProps {
  closeEdit: () => void;
  saveEdit: (editedPlayer: Omit<Player, 'id'>) => void;
  opened: boolean;
  player?: Player;
}

export const EditCard: React.FC<EditCardProps> = ({ closeEdit, saveEdit, opened, player }) => {
  const [name, setName] = useState(player?.name || '');
  const [initiative, setInitiative] = useState(player?.init || 10);
  const [health, setHealth] = useState(player?.hp || 0);
  const [ac, setAc] = useState(player?.ac || 0);
  const [status, setStatus] = useState(player?.conditions || '');
  const [isPlayer, setIsPlayer] = useState(player?.isPlayer ?? true);

  const handleSave = () => {
    if (name.trim().length === 0) {
      alert('Введите имя');
      return;
    }

    const editedPlayer: Player = {
      name: name.trim(),
      init: initiative,
      hp: health,
      ac: ac,
      conditions: status.trim(),
      isPlayer: isPlayer,
      defeated: false,
      id: player?.id || Date.now(),
    };

    saveEdit(editedPlayer);
    closeEdit();
  };

  return (
    <>
      <EditCard opened={opened} closeEdit={closeEdit}>
        {
          <>
            <Fieldset>
              <TextInput
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                label="Your name"
                placeholder="Your name"
              />
              <NumberInput
                value={ac}
                onChange={(value) => setAc(Number(value) || 0)}
                variant="filled"
                size="xs"
                radius="md"
                label="класс брони"
                description="AC"
              />
              <TextInput
                value={status}
                onChange={(event) => setStatus(event.currentTarget.value)}
                label="Состояние"
                placeholder="Состояние"
                mt="md"
              />
            </Fieldset>
            <Text size="sm" mt="xl">
              Инициатива
            </Text>
            <Slider value={initiative} onChange={setInitiative} defaultValue={40} labelAlwaysOn />
            <Text size="sm" mt="xl">
              HP
            </Text>
            <Slider value={health} onChange={setHealth} defaultValue={40} labelAlwaysOn />
            <Switch
              onChange={(event) => setIsPlayer(event.currentTarget.checked)}
              defaultChecked
              label="Игровой персонаж"
            />
            <button onClick={handleSave}>сохранить</button>
            <button onClick={closeEdit}>закрыть</button>
          </>
        }
      </EditCard>
    </>
  );
};
