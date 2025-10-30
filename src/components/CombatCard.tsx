import { useState } from 'react';
import { IconBallpenFilled, IconMinus, IconPlus, IconSkull } from '@tabler/icons-react';
import { Button, Card, Flex, Grid, ThemeIcon, Title } from '@mantine/core';
import { Player } from './Modal';

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
  arrayItem: Player;
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
  arrayItem,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleCardClick = (event) => {
    if (event.target.tagName === 'Button' || event.target.closest('button')) {
      return;
    }
    setIsClicked(!isClicked);
  };
  return (
    <>
      <Card
        style={{ width: 600 }}
        withBorder
        onClick={handleCardClick}
        shadow="sm"
        padding="xl"
        bg={isClicked ? 'rgba(0, 0, 0, 0.88)' : 'rgba(255, 255, 255, 0)'}
      >
        <Grid mb="lg" align="center">
          <Grid.Col span={11}>
            <Title order={2}>{name}</Title>
          </Grid.Col>
          <Grid.Col span={1}>
            <Button onClick={isEdit} variant="filled" color="rgba(255, 255, 255, 0)">
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
          <Grid.Col span={11}>
            <div>Conditions: {conditions}</div>
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
