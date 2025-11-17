import { useEffect, useState } from 'react';
import { IconBallpenFilled, IconMinus, IconPlus, IconSkull } from '@tabler/icons-react';
import { Button, Card, Flex, Grid, Radio, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { Player } from './Modal';

interface SpasBrosokProps {
  onBrosokComplete: (operation: 'green' | 'red') => void;
}

const SpasBrosok: React.FC<SpasBrosokProps> = ({ onBrosokComplete }) => {
  const [value, setValue] = useState<string>('');
  const [nextValue, setNextValue] = useState<string>('');
  const [otherValue, setOtherValue] = useState<string>('');

  useEffect(() => {
    if (value && nextValue && otherValue) {
      if (value === 'green' && nextValue === 'green' && otherValue === 'green') {
        onBrosokComplete('green');
        setValue('');
        setNextValue('');
        setOtherValue('');
      } else if (value === 'red' && nextValue === 'red' && otherValue === 'red') {
        onBrosokComplete('red');
        setValue('');
        setNextValue('');
        setOtherValue('');
      }
    }
  }, [value, nextValue, otherValue, onBrosokComplete]);

  return (
    <>
      <Text pt="lg">Сдохни или умри</Text>
      <Flex>
        <Radio.Group value={value} onChange={setValue} p="xs" m="xs">
          <Stack gap="xs">
            <Radio
              value="green"
              data-clickable="true"
              color="green"
              styles={{
                radio: {
                  borderColor: 'green',
                },
              }}
            />
            <Radio
              data-clickable="true"
              value="red"
              color="red"
              styles={{
                radio: {
                  borderColor: 'red',
                },
              }}
            />
          </Stack>
        </Radio.Group>
        <Radio.Group value={nextValue} onChange={setNextValue} p="xs" m="xs">
          <Stack gap="xs">
            <Radio
              data-clickable="true"
              value="green"
              color="green"
              styles={{
                radio: {
                  borderColor: 'green',
                },
              }}
            />
            <Radio
              data-clickable="true"
              value="red"
              color="red"
              styles={{
                radio: {
                  borderColor: 'red',
                },
              }}
            />
          </Stack>
        </Radio.Group>
        <Radio.Group value={otherValue} onChange={setOtherValue} p="xs" m="xs">
          <Stack gap="xs">
            <Radio
              data-clickable="true"
              value="green"
              color="green"
              styles={{
                radio: {
                  borderColor: 'green',
                },
              }}
            />
            <Radio
              data-clickable="true"
              value="red"
              color="red"
              styles={{
                radio: {
                  borderColor: 'red',
                },
              }}
            />
          </Stack>
        </Radio.Group>
      </Flex>
    </>
  );
};

interface CombatCardProps {
  name: string;
  init: number;
  hp: number;
  ac?: number;
  conditions: string;
  isPlayer: boolean;
  defeated: boolean;
  isEdit: (player: Player, event?: React.MouseEvent) => void;
  plusHP: () => void;
  minusHP: () => void;
  toggleDefeated: () => void;
  brosok: (operation: 'green' | 'red', playerId: number) => void;
  arrayItem: Player;
  isActive: boolean;
}

export const CombatCard: React.FC<CombatCardProps> = ({
  hp,
  conditions,
  ac,
  init,
  name,
  isEdit,
  plusHP,
  minusHP,
  toggleDefeated,
  brosok,
  arrayItem,
  isActive,
}) => {
  // const [isClickedActive, setIsClickedActive] = useState(isActive); //активная карточка
  // const handleCardClick = (event) => {
  //   if (
  //     event.target.tagName === 'BUTTON' ||
  //     event.target.closest('button') ||
  //     event.target.closest('[data-clickable="true"]')
  //   ) {
  //     return;
  //   }
  //   setIsClicked(!isClicked);
  // };

  const handleEditConditions = () => {
    if (hp === 0) {
      return 'без сознания';
    }
    return conditions;
  };
  const currentConditions = handleEditConditions();

  const handleBrosokComplete = (operation: 'green' | 'red') => {
    brosok(operation, arrayItem.id);
  };

  return (
    <>
      <Card
        style={{ width: 600 }}
        withBorder
        // onClick={handleCardClick}
        shadow="sm"
        padding="xl"
        bg={isActive ? 'rgba(0, 0, 0, 0.88)' : 'rgba(255, 255, 255, 0)'} // клик на кнопку не отражается на активности карточки
      >
        <Grid mb="lg" align="center">
          <Grid.Col span={11}>
            <Title order={2}>{name}</Title>
          </Grid.Col>
          <Grid.Col span={1}>
            <Button
              onClick={(e) => isEdit(arrayItem, e)}
              variant="filled"
              color="rgba(255, 255, 255, 0)"
            >
              <ThemeIcon color="rgba(255, 255, 255, 0)" size={34} radius="xl">
                <IconBallpenFilled size={25} />
              </ThemeIcon>
            </Button>
          </Grid.Col>
        </Grid>

        <Grid mb="md" align="center">
          <Grid.Col span={3}>
            <div>Initiative: {init}</div>
          </Grid.Col>
          <Grid.Col span={7}>
            <Flex mih={50} gap="xs" justify="center" align="center" direction="row" wrap="wrap">
              <Button onClick={plusHP} variant="filled" color="rgba(255, 255, 255, 0)">
                <ThemeIcon size={30} radius="xl">
                  <IconPlus size={16} />
                </ThemeIcon>
              </Button>

              <div>HP: {hp}</div>
              <Button onClick={minusHP} variant="filled" color="rgba(255, 255, 255, 0)">
                <ThemeIcon size={30} radius="xl">
                  <IconMinus size={16} />
                </ThemeIcon>
              </Button>
            </Flex>
          </Grid.Col>

          <Grid.Col span={2}>
            <Flex justify="end">AC: {ac}</Flex>
          </Grid.Col>
        </Grid>

        <Grid mb="md" align="center">
          <Grid.Col pb="lg" span={11}>
            <div>Conditions:{currentConditions}</div>
            {currentConditions === 'без сознания' && (
              <SpasBrosok onBrosokComplete={handleBrosokComplete} />
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            <Button onClick={toggleDefeated} variant="filled" color="rgba(255, 255, 255, 0)">
              <ThemeIcon size={30} color={arrayItem.defeated ? 'red' : 'teal'} radius="xl">
                <IconSkull size={16} />
              </ThemeIcon>
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};
