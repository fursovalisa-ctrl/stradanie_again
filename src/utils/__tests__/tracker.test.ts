import { Player } from '@/components/Modal';
import { changeConditions, changeTurn, editHp, toggleDefeated } from '../tracker';
import { players } from './../../components/data';

describe('Tracker tests', () => {
  describe('editHp tests', () => {
    test('editHp return empty array on empty input', () => {
      const sortedPlayers: Player[] = [];
      const playerId: number = 0;
      const change: number = 1;

      const result = editHp(sortedPlayers, playerId, change);
      expect(result).toEqual([]);
    });

    test('editHp updates player with id=1 and increase hp +1', () => {
      const sortedPlayers: Player[] = [
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 42,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
        },
        {
          id: 2,
          name: 'Элария Светлая',
          init: 18,
          hp: 28,
          ac: 14,
          conditions: 'Благословение',
          isPlayer: true,
          defeated: false,
        },
        {
          id: 3,
          name: 'Громдар Скальный',
          init: 12,
          hp: 5,
          ac: 18,
          conditions: 'Отравление, Ослепление',
          isPlayer: true,
          defeated: true,
        },
      ];
      const playerId: number = 1;
      const change: number = 1;

      const result = editHp(sortedPlayers, playerId, change);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 43,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
        },
        {
          id: 2,
          name: 'Элария Светлая',
          init: 18,
          hp: 28,
          ac: 14,
          conditions: 'Благословение',
          isPlayer: true,
          defeated: false,
        },
        {
          id: 3,
          name: 'Громдар Скальный',
          init: 12,
          hp: 5,
          ac: 18,
          conditions: 'Отравление, Ослепление',
          isPlayer: true,
          defeated: true,
        },
      ]);
    });

    test('editHp updates player with id=1 and increase hp -7', () => {
      const sortedPlayers: Player[] = [
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 42,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
        },
        {
          id: 2,
          name: 'Элария Светлая',
          init: 18,
          hp: 28,
          ac: 14,
          conditions: 'Благословение',
          isPlayer: true,
          defeated: false,
        },
        {
          id: 3,
          name: 'Громдар Скальный',
          init: 12,
          hp: 5,
          ac: 18,
          conditions: 'Отравление, Ослепление',
          isPlayer: true,
          defeated: true,
        },
      ];
      const playerId: number = 1;
      const change: number = -7;

      const result = editHp(sortedPlayers, playerId, change);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 35,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
        },
        {
          id: 2,
          name: 'Элария Светлая',
          init: 18,
          hp: 28,
          ac: 14,
          conditions: 'Благословение',
          isPlayer: true,
          defeated: false,
        },
        {
          id: 3,
          name: 'Громдар Скальный',
          init: 12,
          hp: 5,
          ac: 18,
          conditions: 'Отравление, Ослепление',
          isPlayer: true,
          defeated: true,
        },
      ]);
    });
  });
  describe('changeConditions tests', () => {
    test('changeConditions return jopa', () => {
      const sortedPlayers: Player[] = [];
      const playerId: number = 0;
      const conditions: string = '';

      const result = changeConditions(sortedPlayers, playerId, conditions);
      expect(result).toEqual([]);
    });
    test('changeConditions return ne jopa', () => {
      const sortedPlayers: Player[] = [
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 42,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
        },
      ];
      const playerId: number = 1;
      const conditions: string = 'jopajopnaya';

      const result = changeConditions(sortedPlayers, playerId, conditions);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 42,
          ac: 16,
          conditions: 'jopajopnaya',
          isPlayer: false,
          defeated: false,
        },
      ]);
    });
  });
  describe('toggleDefeated tests', () => {
    test('toggleDefeated return jopa', () => {
      const players: Player[] = [];
      const playerId: number = 0;

      const result = toggleDefeated(players, playerId);
      expect(result).toEqual([]);
    });
    test('toggleDefeated return ne jopa', () => {
      const players: Player[] = [
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 42,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
        },
      ];
      const playerId: number = 1;

      const result = toggleDefeated(players, playerId);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 42,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: true,
        },
      ]);
    });
    test('toggleDefeated return nene jopa', () => {
      const players: Player[] = [
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 42,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
        },
      ];
      const playerId: number = 1;

      const neresult = toggleDefeated(players, playerId);

      const result = toggleDefeated(neresult, playerId);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 42,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
        },
      ]);
    });
  });
  describe('changeTurn', () => {
    test('changes from id=1 to id=2', () => {
      const players: Player[] = [
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 35,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
          isActive: true, // <-
        },
        {
          id: 2,
          name: 'Элария Светлая',
          init: 18,
          hp: 28,
          ac: 14,
          conditions: 'Благословение',
          isPlayer: true,
          defeated: false,
          isActive: false, // <-
        },
        {
          id: 3,
          name: 'Громдар Скальный',
          init: 12,
          hp: 5,
          ac: 18,
          conditions: 'Отравление, Ослепление',
          isPlayer: true,
          defeated: true,
          isActive: false, // <-
        },
      ];
      const updatedPlayers = changeTurn(players);
      expect(updatedPlayers).toEqual([
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 35,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
          isActive: false, // <-
        },
        {
          id: 2,
          name: 'Элария Светлая',
          init: 18,
          hp: 28,
          ac: 14,
          conditions: 'Благословение',
          isPlayer: true,
          defeated: false,
          isActive: true, // <-
        },
        {
          id: 3,
          name: 'Громдар Скальный',
          init: 12,
          hp: 5,
          ac: 18,
          conditions: 'Отравление, Ослепление',
          isPlayer: true,
          defeated: true,
          isActive: false, // <-
        },
      ]);
    });
    test('changes from id=3 to id=1', () => {
      const players: Player[] = [
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 35,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
          isActive: false, // <-
        },
        {
          id: 2,
          name: 'Элария Светлая',
          init: 18,
          hp: 28,
          ac: 14,
          conditions: 'Благословение',
          isPlayer: true,
          defeated: false,
          isActive: false, // <-
        },
        {
          id: 3,
          name: 'Громдар Скальный',
          init: 12,
          hp: 5,
          ac: 18,
          conditions: 'Отравление, Ослепление',
          isPlayer: true,
          defeated: true,
          isActive: true, // <-
        },
      ];
      const updatedPlayers = changeTurn(players);
      expect(updatedPlayers).toEqual([
        {
          id: 1,
          name: 'Аргох Жестокий',
          init: 15,
          hp: 35,
          ac: 16,
          conditions: '',
          isPlayer: false,
          defeated: false,
          isActive: true, // <-
        },
        {
          id: 2,
          name: 'Элария Светлая',
          init: 18,
          hp: 28,
          ac: 14,
          conditions: 'Благословение',
          isPlayer: true,
          defeated: false,
          isActive: false, // <-
        },
        {
          id: 3,
          name: 'Громдар Скальный',
          init: 12,
          hp: 5,
          ac: 18,
          conditions: 'Отравление, Ослепление',
          isPlayer: true,
          defeated: true,
          isActive: false, // <-
        },
      ]);
    });
  });
});
