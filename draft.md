## ТЗ: Трекер инициативы D&D (React)

### Компоненты

#### 1. **App**

* Контейнер приложения.
* Хранит состояние боя (`EncounterState`).
* Передаёт данные дочерним компонентам.

#### 2. **Header**

* Кнопки: `Prev`, `Next`, `Add`.
* Отображает номер раунда.
* Вызовы: `onNext()`, `onPrev()`, `onAdd()`.

#### 3. **CombatantList**

* Принимает массив `combatants`, `activeIndex`.
* Отображает список карточек `CombatantCard`.
* Сортирует по инициативе (init ↓).
* Подсвечивает активного.

#### 4. **CombatantCard**

* Отображает данные:

  * `name`, `init`, `hp`, `ac`, `conditions`, `isPlayer`, `defeated`.
* Кнопки: `+HP`, `-HP`, `✎` (редактировать), `☠️` (пометить defeated).
* Клик по карточке делает её активной.

#### 5. **AddEditModal**

* Поля: `name`, `init`, `hp`, `ac`, `isPlayer`, `conditions`.
* Действия: `onSave()`, `onCancel()`.

### Типы данных

```ts
type Combatant = {
  id: string;
  name: string;
  init: number;
  hp: number;
  ac?: number;
  conditions: string[];
  isPlayer: boolean;
  defeated?: boolean;
};

type EncounterState = {
  combatants: Combatant[];
  activeIndex: number;
  round: number;
};
```

### Логика

* При `Next` активный индекс ++, при `Prev` --.
* Если индекс > последнего → `round++` и индекс = 0.
* `Add` открывает модал с пустыми полями.
* Изменения сохраняются в `localStorage` при каждом действии.
* `CombatantList` обновляется при любом изменении данных.

// Пропсы компонентов трекера инициативы D&D
// Русские описания в JSDoc над каждым пропсом.

/* =====================
 * Общие типы домена
 * ===================== */

export type Condition = string;

export interface Combatant {
  /** Уникальный идентификатор существа */
  id: string;
  /** Имя персонажа/монстра для отображения в списке */
  name: string;
  /** Значение инициативы (чем больше, тем раньше ходит) */
  init: number;
  /** Текущее количество очков здоровья */
  hp: number;
  /** Класс брони (опционально) */
  ac?: number;
  /** Набор статусов/состояний (например, "stunned", "prone") */
  conditions: Condition[];
  /** Флаг, что это игрок (а не NPC/монстр) */
  isPlayer: boolean;
  /** Пометка, что существо выведено из боя */
  defeated?: boolean;
}

export interface EncounterState {
  /** Отсортированный список существ в бою */
  combatants: Combatant[];
  /** Индекс текущего активного существа в списке */
  activeIndex: number;
  /** Номер текущего раунда, начиная с 1 */
  round: number;
}

/* =====================
 * App
 * ===================== */

export interface AppProps {
  /** Начальное состояние боя; если не задано — создаётся пустое */
  initialState?: EncounterState;
  /** Ключ для localStorage; меняйте, если хотите хранить разные бои */
  storageKey?: string;
}

/* =====================
 * Header
 * ===================== */

export interface HeaderProps {
  /** Текущий номер раунда для отображения в шапке */
  round: number;
  /** Коллбэк на кнопку предыдущего хода */
  onPrev: () => void;
  /** Коллбэк на кнопку следующего хода */
  onNext: () => void;
  /** Коллбэк на кнопку добавления нового существа */
  onAdd: () => void;
}

/* =====================
 * CombatantList
 * ===================== */

export interface CombatantListProps {
  /** Полный список существ для отрисовки (обычно уже отсортирован по инициативе) */
  combatants: Combatant[];
  /** Индекс активного существа для визуальной подсветки */
  activeIndex: number;
  /** Коллбэк при выборе карточки (делает карточку активной) */
  onSelect: (index: number) => void;
  /** Коллбэк для изменения одного существа (например, правка HP/статусов) */
  onUpdate: (index: number, patch: Partial<Combatant>) => void;
}

/* =====================
 * CombatantCard
 * ===================== */

export interface CombatantCardProps {
  /** Данные конкретного существа для отображения */
  data: Combatant;
  /** Флаг, активна ли эта карточка сейчас (подсветка) */
  active?: boolean;
  /** Обработчик клика по карточке (сделать активной/выбрать) */
  onSelect?: () => void;
  /** Изменение параметров существа (локальное редактирование: hp, ac, conditions) */
  onChange?: (patch: Partial<Combatant>) => void;
  /** Открыть модал редактирования этого существа */
  onEdit?: () => void;
  /** Пометить как выведенного из боя (toggle defeated) */
  onToggleDefeated?: () => void;
}

/* =====================
 * AddEditModal
 * ===================== */

export interface AddEditModalProps {
  /** Видимость модального окна */
  open: boolean;
  /** Исходные данные для редактирования; если нет — модал работает в режиме добавления */
  initial?: Partial<Combatant>;
  /** Сохранение изменений/создание нового существа; возвращает итоговый объект */
  onSave: (value: Combatant) => void;
  /** Закрытие без сохранения */
  onCancel: () => void;
}

/* =====================
 * Хелперы коллбэков (необязательно, но удобно)
 * ===================== */

export type UpdateCombatantById = (id: string, patch: Partial<Combatant>) => void;
export type SelectCombatantById = (id: string) => void;
