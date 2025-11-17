import { useEffect, useState } from 'react';
import { Fieldset, Modal, NumberInput, Slider, Switch, Text, TextInput } from '@mantine/core';
import { useTrackerStore } from '@/stores/useTrackerStore';

export interface Player {
  id: number;
  name: string;
  init: number;
  hp: number;
  ac: number;
  conditions: string;
  isPlayer: boolean;
  defeated: boolean;
  isActive?: boolean;
}

interface ModalProps {
  opened: boolean;
  onSave: (player: Player) => void;
  onClose: () => void;
  player?: Player | null;
}

export const Modalwindow: React.FC<ModalProps> = ({ onSave, player }) => {
  const { isModalOpen, setIsModalOpen } = useTrackerStore();
  const [name, setName] = useState(player?.name || '');
  const [initiative, setInitiative] = useState(player?.init || 10);
  const [health, setHealth] = useState(player?.hp || 0);
  const [ac, setAc] = useState(player?.ac || 0);
  const [status, setStatus] = useState(player?.conditions || '');
  const [isPlayer, setIsPlayer] = useState(player?.isPlayer ?? true);

  useEffect(() => {
    if (isModalOpen) {
      if (player) {
        setName(player.name);
        setInitiative(player.init);
        setHealth(player.hp);
        setAc(player.ac);
        setStatus(player.conditions);
        setIsPlayer(player.isPlayer);
      } else {
        setName('');
        setInitiative(10);
        setHealth(50);
        setAc(10);
        setStatus('');
        setIsPlayer(true);
      }
    }
  }, [isModalOpen, player]);

  const handleSave = () => {
    if (name.trim().length === 0) {
      // alert('Введите имя');
      return;
    }

    const playerData: Player = {
      id: player?.id || Date.now(),
      name: name.trim(),
      init: initiative,
      hp: health,
      ac,
      conditions: status.trim(),
      isPlayer,
      defeated: player?.defeated || false,
    };

    onSave(playerData);
  };

  const handleClose = () => {
    setName('');
    setInitiative(10);
    setHealth(50);
    setAc(10);
    setStatus('');
    setIsPlayer(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal opened={isModalOpen} onClose={handleClose}>
        <>
          <Fieldset legend="Personal information">
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
          <button type="button" onClick={handleSave}>
            сохранить
          </button>
        </>
      </Modal>
    </>
  );
};
