export const TIMER_DEFAULT = 20;
export const TIMER_MIN = 10;
export const TIMER_MAX = 60;

export const STORAGE_KEY = 'preflop_drill_v1';
export const STORAGE_VERSION = 1;

export const LEVEL_UP_STREAK = 5;
export const LEVEL_DOWN_STREAK = 3;
export const WEIGHT_WRONG = 3;
export const WEIGHT_RESET_CONSECUTIVE = 3;

export const DIFFICULTY = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  ADVANCED: 2,
  EXPERT: 3,
};

export const DIFFICULTY_LABELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const TIMER_MULTIPLIERS = [1.5, 1.0, 0.8, 0.6];

export const HINT_VPIP = {
  UTG: '~17%',
  HJ: '~21%',
  CO: '~28%',
  BTN: '~42%',
  SB: 'raises ~27%, limps ~29%, folds ~43%',
  BB: 'varies by opener',
};

export const SUIT_SYMBOLS = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

export const SUIT_COLORS = {
  spades: 'text-slate-200',
  hearts: 'text-red-500',
  diamonds: 'text-blue-400',
  clubs: 'text-green-500',
};

export const ACTION_LABELS = {
  open: 'Open',
  fold: 'Fold',
  call: 'Call',
  limp: 'Limp',
  '3bet': '3-Bet',
  '4bet': '4-Bet',
  raise: 'Raise',
  check: 'Check',
};

export const ACTION_SHORTCUTS = {
  open: 'o',
  fold: 'f',
  call: 'c',
  limp: 'l',
  '3bet': '3',
  '4bet': '4',
  raise: 'r',
  check: 'x',
};
