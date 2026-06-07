export const POSITIONS = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

export const BEGINNER_POSITIONS = ['BTN', 'CO'];

// Positions that open RFI (BB never opens)
export const RFI_POSITIONS = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];

// Valid openers that can face a 3-bet (all RFI positions)
// vs_3bet scenarios: opener faced a 3bet from a later position
export const VS_3BET_CONFIGS = [
  { position: 'UTG', threebettors: ['HJ', 'CO', 'BTN', 'SB', 'BB'] },
  { position: 'HJ', threebettors: ['CO', 'BTN', 'SB', 'BB'] },
  { position: 'CO', threebettors: ['BTN', 'SB', 'BB'] },
  { position: 'BTN', threebettors: ['SB', 'BB'] },
  { position: 'SB', threebettors: ['BB'] },
];

// Positions with call_vs_[opener] data (can call an open, not just 3bet/fold)
export const CAN_CALL_VS_OPEN = {
  BB: ['UTG', 'HJ', 'CO', 'BTN', 'SB'],
  BTN: ['UTG', 'HJ', 'CO'],
};

// Positions with 3bet_vs_[opener] data (3bet or fold, no call)
export const CAN_3BET_VS_OPEN = {
  CO: ['UTG', 'HJ'],
  HJ: ['UTG'],
  SB: ['UTG', 'HJ', 'CO', 'BTN'],
};
