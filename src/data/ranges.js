// Source: RangeConverter "6 max 100bb 500z GTO Ranges" PDF
// (rangeconverter.com/downloads/6-max-100bb-Poker-Charts-No-Limit-Texas-Holdem-Cash)
// 6-max cash, 100BB, 500z rake. Mixed strategies rounded to nearest 50%.
// Each position populated from chart images. Threshold: ≥50% frequency → included.
// DO NOT fill missing arrays from model knowledge — leave as [] with TODO comment.

export const RANGES_100BB_6MAX = {

  // ── UTG ──────────────────────────────────────────────────
  // Source: 1-NLHE_6max_500z_100bb-UTG_RFI.PNG
  // Open 17.13% (2.5BB raise). UTG is first to act — open or fold only.
  UTG: {
    open: [
      // Pairs
      'AA','KK','QQ','JJ','TT','99','88','77','66',
      // Suited aces
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
      // Suited kings
      'KQs','KJs','KTs','K9s',
      // Suited queens
      'QJs','QTs','Q9s',
      // Suited jacks
      'JTs','J9s',
      // Suited tens
      'T9s',
      // Offsuit broadway
      'AKo','AQo','AJo','ATo',
      'KJo','KTo',
      'QJo','QTo',
      'JTo',
    ],

    // UTG vs HJ 3-bet — Expert level
    // Source: "UTG vs MP 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 21.81%, Call 15.11%, Fold 63.08%.
    // A5s/A4s are bluff 4-bets (block AK/AQ, good removal vs 3-bet range).
    '4bet_vs_HJ_3bet': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs',
      'AJs',
      'A5s','A4s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'AKo','AQo',
      'AJo',
      'KQo',
    ],
    'call_vs_HJ_3bet': [
      // Pairs — TT–44 call (JJ mixed between 4-bet/call — in 4-bet at threshold)
      'TT','99','88','77','66','55','44',
      // Suited — implied odds hands
      'ATs',
      'JTs',
      '76s','65s','54s',
      // Offsuit
      'QJo','JTo',
    ],

    // UTG vs CO 3-bet — Expert level
    // Source: "UTG vs CO 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 23.8%, Call 13.78%, Fold 62.41%.
    // Nearly identical to vs HJ — A3s added as third bluff vs wider CO range.
    '4bet_vs_CO_3bet': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs',
      'AJs',
      'A5s','A4s',
      'A3s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'AKo','AQo',
      'AJo',
      'KQo',
    ],
    'call_vs_CO_3bet': [
      'TT','99','88','77','66','55','44',
      'ATs',
      'JTs',
      '76s','65s','54s',
      'QJo','JTo',
    ],

    // UTG vs BB 3-bet — Expert level
    // Source: "UTG vs BB 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 9.57%, Call 38.69%, Fold 51.74%.
    // Widest UTG call range — BB 3-bets most polarized range of all positions.
    // QQ demoted to call (was mixed 4-bet vs SB). Only AA pure 4-bet.
    // New calls vs BB: 22, A8s.
    '4bet_vs_BB_3bet': [
      'AA',
      'KK',
      'AKs',
      'AQs',
      'A5s',
      'AKo',
      'AQo',
      'KQo',
    ],
    'call_vs_BB_3bet': [
      // Pairs — QQ–22 all call (QQ demoted from 4-bet vs SB)
      'QQ','JJ','TT','99','88','77','66','55','44','33','22',
      // Suited aces — A8s added vs BB
      'AJs','ATs','A9s','A8s',
      // Suited kings
      'KQs','KJs','KTs',
      // Suited queens/jacks/tens
      'QJs','QTs',
      'JTs','T9s',
      // Suited connectors
      '98s','87s','76s','65s','54s',
      // Offsuit
      'AJo','ATo',
      'KJo','KTo',
      'QJo','JTo',
    ],
    // Source: "UTG vs SB 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 11.49%, Call 36.56%, Fold 51.95%.
    // Tightest UTG 4-bet range — SB 3-bets wide/light so UTG calls more,
    // 4-bets less. JJ demoted to call. Only AA/KK pure 4-bets.
    '4bet_vs_SB_3bet': [
      'AA','KK',
      'QQ',
      'AKs',
      'AQs',
      'A5s',
      'AKo',
      'AQo',
      'KQo',
    ],
    'call_vs_SB_3bet': [
      // Pairs — JJ–33 all call (QQ mixed — in 4-bet at threshold)
      'JJ','TT','99','88','77','66','55','44','33',
      // Suited aces
      'AJs','ATs','A9s',
      // Suited kings
      'KQs','KJs','KTs',
      // Suited queens/jacks
      'QJs','QTs',
      'JTs','T9s',
      // Suited connectors
      '98s','87s','76s','65s','54s',
      // Offsuit
      'AJo','ATo',
      'KJo','KTo',
      'QJo','JTo',
    ],
    // Source: "UTG vs BTN 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 21.89%, Call 23.17%, Fold 54.93%.
    // Call range expands significantly — BTN 3-bets wide so UTG flats more.
    // A3s drops out of 4-bet bluffs vs BTN (more hands prefer to call instead).
    // New calls vs BTN: 33/22, A9s, T9s, 98s, 87s, ATo, KJo.
    '4bet_vs_BTN_3bet': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs',
      'AJs',
      'A5s','A4s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'AKo','AQo',
      'AJo',
      'KQo',
    ],
    'call_vs_BTN_3bet': [
      // Pairs — TT–22 all call vs BTN's wide range (33/22 new vs HJ/CO)
      'TT','99','88','77','66','55','44','33','22',
      // Suited aces — A9s added vs BTN
      'ATs','A9s',
      // Suited connectors — T9s/98s/87s added vs BTN
      'JTs','T9s',
      '98s','87s',
      '76s','65s','54s',
      // Offsuit — ATo/KJo added vs BTN
      'ATo',
      'KJo',
      'QJo','JTo',
    ],
  },

  // ── HJ (MP) ──────────────────────────────────────────────
  // Source: MP RFI chart image (RangeConverter 6-max 500z 100BB).
  // Note: chart label is "MP RFI" — in 6-max this is the HJ seat.
  // Open 21.35%, Fold 78.65%. Threshold: ≥50% orange → open.
  HJ: {
    open: [
      // Pairs — AA–44 fully orange; 33/22 mixed (included at threshold)
      'AA','KK','QQ','JJ','TT','99','88','77','66','55','44',
      '33','22',
      // Suited aces — all fully orange
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
      // Suited kings — K9s+ fully orange; K8s/K7s mixed (included); K6s and below teal
      'KQs','KJs','KTs','K9s',
      'K8s','K7s',
      // Suited queens — QTs+ fully orange; Q9s fully orange; Q8s mixed (included); Q7s teal
      'QJs','QTs','Q9s',
      'Q8s',
      // Suited jacks — JTs/J9s fully orange; J8s mixed (included); J7s teal
      'JTs','J9s',
      'J8s',
      // Suited tens — T9s/T8s fully orange; T7s mixed (excluded — below threshold)
      'T9s','T8s',
      // Suited connectors — 98s/87s/76s fully orange
      '98s','87s','76s',
      // Suited gappers — 97s/86s/75s/65s mixed (included at threshold)
      '97s','86s','75s','65s',
      // Offsuit broadway — AKo–ATo fully orange
      'AKo','AQo','AJo','ATo',
      // Offsuit kings — KQo/KJo fully orange; KTo mixed (included); K9o teal
      'KQo','KJo',
      'KTo',
      // Offsuit queens — QJo fully orange; QTo mixed (included); Q9o teal
      'QJo',
      'QTo',
      // JTo mixed — excluded (reads below 50% threshold)
    ],
    // HJ vs CO 3-bet — Expert level
    // Source: "MP vs CO 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 22.2%, Call 14.47%, Fold 63.32%.
    // Nearly identical to UTG vs CO — slightly wider call (33, T9s, 98s added).
    '4bet_vs_CO_3bet': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs',
      'AJs',
      'A5s','A4s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'AKo','AQo',
      'AJo',
      'KQo',
    ],
    'call_vs_CO_3bet': [
      'TT','99','88','77','66','55','44','33',
      'ATs',
      'JTs','T9s',
      '98s',
      '87s','76s','65s','54s',
      'QJo','JTo',
    ],
    // Source: "MP vs UTG RFI" chart (RangeConverter 6-max 500z 100BB)
    // 3-bet 8.14%, Fold 91.86%. Threshold: ≥50% orange → 3-bet.
    // Note: A5s is a bluff 3-bet (blocks AK/AQ, retains equity vs. fold);
    // A9s–A6s and A4s–A2s are folds despite being suited aces.
    '3bet_vs_UTG': [
      // Pairs — AA–66 fully orange; 55 mixed (included at threshold)
      'AA','KK','QQ','JJ','TT','99','88','77','66',
      '55',
      // Suited aces — value range + A5s bluff; gap hands fold
      'AKs','AQs','AJs','ATs',
      'A5s',
      // Suited kings — KJs+ fully orange; KTs mixed (included)
      'KQs','KJs',
      'KTs',
      // Suited queens — QJs fully orange; QTs mixed (included)
      'QJs',
      'QTs',
      // Suited jacks — JTs mixed (included)
      'JTs',
      // Offsuit — AJo+ fully orange; ATo/KJo mixed (included)
      'AKo','AQo','AJo',
      'ATo',
      'KQo',
      'KJo',
    ],
    '3bet_vs_HJ': [],   // Expert level — TODO: add from chart (HJ not vs itself)

    // HJ vs SB 3-bet — Expert level
    // Source: "MP vs SB 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 11.11%, Call 36.31%, Fold 52.58%.
    // Identical 4-bet structure to UTG vs SB. Call adds A8s vs UTG.
    '4bet_vs_SB_3bet': [
      'AA',
      'KK',
      'AKs',
      'AQs',
      'A5s',
      'AKo',
      'AQo',
      'KQo',
    ],
    'call_vs_SB_3bet': [
      'QQ','JJ','TT','99','88','77','66','55','44','33','22',
      'AJs','ATs','A9s','A8s',
      'KQs','KJs','KTs',
      'QJs','QTs',
      'JTs','T9s','98s',
      '87s','76s','65s','54s',
      'AJo','ATo',
      'KJo','KTo',
      'QJo','JTo',
    ],
    // Source: "MP vs BTN 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 21.59%, Call 20.79%, Fold 57.63%.
    // 4-bet range identical to vs CO. Call expands: 22, A9s, ATo, KJo added.
    '4bet_vs_BTN_3bet': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs',
      'AJs',
      'A5s','A4s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'AKo','AQo',
      'AJo',
      'KQo',
    ],
    'call_vs_BTN_3bet': [
      'TT','99','88','77','66','55','44','33','22',
      'ATs','A9s',
      'JTs','T9s',
      '98s','87s',
      '76s','65s','54s',
      'ATo',
      'KJo',
      'QJo','JTo',
    ],

    // HJ vs BB 3-bet — Expert level
    // Source: "MP vs BB 3bet" chart (PDF page 10, RangeConverter 6-max 500z 100BB)
    // 4-bet 9.58%, Call 39.07%, Fold 51.36%.
    // Identical 4-bet structure to UTG/CO/SB vs BB. Call adds K9o/QTo.
    '4bet_vs_BB_3bet': [
      'AA',
      'KK',
      'AKs',
      'AQs',
      'A5s',
      'AKo',
      'AQo',
      'KQo',
    ],
    'call_vs_BB_3bet': [
      'QQ','JJ','TT','99','88','77','66','55','44','33','22',
      'AJs','ATs','A9s','A8s',
      'KQs','KJs','KTs',
      'QJs','QTs',
      'JTs','T9s','98s',
      '87s','76s','65s','54s',
      'AJo','ATo','A9o',
      'KJo','KTo',
      'K9o',
      'QJo','JTo',
      'QTo',
    ],
  },
  // Source: CO RFI chart image (RangeConverter 6-max 500z 100BB).
  // Open 27.82%, Fold 72.18%. Threshold: ≥50% orange → open.
  CO: {
    open: [
      // Pairs — AA–55 fully orange; 44/33/22 mixed (included at threshold)
      'AA','KK','QQ','JJ','TT','99','88','77','66','55',
      '44','33','22',
      // Suited aces — all fully orange
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
      // Suited kings — K9s+ fully orange; K8s/K7s/K6s mixed (included); K5s teal
      'KQs','KJs','KTs','K9s',
      'K8s','K7s','K6s',
      // Suited queens — Q8s+ fully orange; Q7s mixed (included); Q6s teal
      'QJs','QTs','Q9s','Q8s',
      'Q7s',
      // Suited jacks — J8s+ fully orange; J7s mixed (included); J6s teal
      'JTs','J9s','J8s',
      'J7s',
      // Suited tens — T7s+ fully orange; T6s mixed (excluded — below threshold)
      'T9s','T8s','T7s',
      // Suited connectors/gappers — fully orange
      '98s','97s','87s','86s','76s','75s','65s',
      // Mixed gappers (included at threshold)
      '96s','64s','54s',
      // Offsuit aces — A9o+ fully orange; A8o mixed (excluded)
      'AKo','AQo','AJo','ATo','A9o',
      // Offsuit kings — KTo+ fully orange; K9o mixed (included)
      'KQo','KJo','KTo',
      'K9o',
      // Offsuit queens — QTo+ fully orange; Q9o mixed (included)
      'QJo','QTo',
      'Q9o',
      // Offsuit jacks — JTo fully orange; J9o mixed (excluded)
      'JTo',
    ],
    '3bet_vs_UTG': [
      // Source: "CO vs UTG RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 8.55%, Fold 91.45%. Threshold: ≥50% orange → 3-bet.
      // A5s is a bluff 3-bet; A9s–A6s and A4s–A2s fold.
      'AA','KK','QQ','JJ','TT','99','88','77','66',
      '55',
      'AKs','AQs','AJs','ATs',
      'A5s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'QTs',
      'JTs',
      'AKo','AQo','AJo',
      'ATo',
      'KQo',
      'KJo',
    ],
    '3bet_vs_HJ': [
      // Source: "CO vs MP RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 9.9%, Fold 90.1%. Slightly wider than vs UTG — QJo added.
      'AA','KK','QQ','JJ','TT','99','88','77','66',
      '55',
      'AKs','AQs','AJs','ATs',
      'A5s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'QTs',
      'JTs',
      'AKo','AQo','AJo',
      'ATo',
      'KQo',
      'KJo',
      'QJo',
    ],

    // CO vs BTN 3-bet — Expert level
    // Source: "CO vs BTN 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 20.64%, Call 20.37%, Fold 58.98%.
    // 4-bet identical to HJ vs BTN. Call adds A8s/A8o vs CO's wider range.
    '4bet_vs_BTN_3bet': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs',
      'AJs',
      'A5s','A4s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'AKo','AQo',
      'AJo',
      'KQo',
    ],
    'call_vs_BTN_3bet': [
      'TT','99','88','77','66','55','44','33','22',
      'ATs','A9s','A8s',
      'JTs','T9s','98s',
      '87s','76s','65s','54s',
      'ATo',
      'A8o',
      'KJo',
      'QJo','JTo',
    ],

    // CO vs BB 3-bet — Expert level
    // Source: "CO vs BB 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 10.3%, Call 37.59%, Fold 52.08%.
    // Identical 4-bet to vs SB. Call adds A7o/K9o vs BB's slightly different range.
    '4bet_vs_BB_3bet': [
      'AA',
      'KK',
      'AKs',
      'AQs',
      'A5s',
      'AKo',
      'AQo',
      'KQo',
    ],
    'call_vs_BB_3bet': [
      'QQ','JJ','TT','99','88','77','66','55','44','33','22',
      'AJs','ATs','A9s','A8s','A7s',
      'KQs','KJs','KTs',
      'QJs','QTs',
      'JTs','T9s','98s','87s',
      '76s','65s','54s',
      'AJo','ATo','A9o','A8o',
      'A7o',
      'KJo','KTo',
      'K9o',
      'QJo','JTo',
    ],
    // Source: "CO vs SB 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 11.12%, Call 35.76%, Fold 53.12%.
    // Identical 4-bet to UTG/HJ vs SB. Call adds A7s, A9o, A8o vs CO range.
    '4bet_vs_SB_3bet': [
      'AA',
      'KK',
      'AKs',
      'AQs',
      'A5s',
      'AKo',
      'AQo',
      'KQo',
    ],
    'call_vs_SB_3bet': [
      'QQ','JJ','TT','99','88','77','66','55','44','33','22',
      'AJs','ATs','A9s','A8s','A7s',
      'KQs','KJs','KTs',
      'QJs','QTs',
      'JTs','T9s','98s',
      '87s','76s','65s','54s',
      'AJo','ATo','A9o',
      'A8o',
      'KJo','KTo',
      'QJo','JTo',
    ],
  },

  // ── BTN ──────────────────────────────────────────────────
  // Source: BTN RFI chart image (RangeConverter 6-max 500z 100BB).
  // Open 41.54%, Fold 58.46%. Threshold: ≥50% orange → open.
  BTN: {
    open: [
      // Pairs — all fully orange
      'AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22',
      // Suited aces — all fully orange
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
      // Suited kings — all fully orange
      'KQs','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s','K3s','K2s',
      // Suited queens — Q3s+ fully orange; Q2s mixed (included)
      'QJs','QTs','Q9s','Q8s','Q7s','Q6s','Q5s','Q4s','Q3s',
      'Q2s',
      // Suited jacks — J6s+ fully orange; J5s mixed (included); J4s teal
      'JTs','J9s','J8s','J7s','J6s',
      'J5s',
      // Suited tens — T6s+ fully orange; T5s mixed (included); T4s teal
      'T9s','T8s','T7s','T6s',
      'T5s',
      // Suited nines — 96s+ fully orange; 95s mixed (included); 94s teal
      '98s','97s','96s',
      '95s',
      // Suited eights — 85s+ fully orange; 84s mixed (included); 83s teal
      '87s','86s','85s',
      '84s',
      // Suited sevens — 74s+ fully orange; 73s mixed (excluded); 72s teal
      '76s','75s','74s',
      // Suited sixes — 63s+ fully orange; 62s mixed (excluded)
      '65s','64s','63s',
      // Suited fives — 53s+ fully orange; 52s mixed (excluded)
      '54s','53s',
      // Suited fours/threes — 42s/43s/32s mixed (included at threshold)
      '43s','42s',
      '32s',
      // Offsuit aces — all fully orange
      'AKo','AQo','AJo','ATo','A9o','A8o','A7o','A6o','A5o','A4o','A3o','A2o',
      // Offsuit kings — K7o+ fully orange; K6o mixed (included); K5o teal
      'KQo','KJo','KTo','K9o','K8o','K7o',
      'K6o',
      // Offsuit queens — Q9o+ fully orange; Q8o mixed (included); Q7o teal
      'QJo','QTo','Q9o',
      'Q8o',
      // Offsuit jacks — J9o+ fully orange; J8o mixed (included); J7o teal
      'JTo','J9o',
      'J8o',
      // Offsuit tens — T8o+ fully orange; T7o mixed (included); T6o teal
      'T9o','T8o',
      'T7o',
      // Offsuit nines — 97o+ fully orange; 96o mixed (excluded)
      '98o','97o',
      // Offsuit eights — 87o fully orange; 86o mixed (excluded)
      '87o',
    ],
    '3bet_vs_UTG': [
      // Source: "BTN vs UTG RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 7.32%, Call 6.9%, Fold 85.78%.
      // Threshold: ≥50% orange → 3-bet. Green only → call.
      // ATo/KQo/KJo appear split orange+green — included in 3-bet at threshold.
      // A5s is bluff 3-bet; 66 mixed orange (included); 55 teal (call instead).
      'AA','KK','QQ','JJ','TT','99','88','77',
      '66',
      'AKs','AQs','AJs','ATs',
      'A5s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'QTs',
      'JTs',
      'AKo','AQo','AJo',
      'ATo',
      'KQo',
      'KJo',
    ],
    call_vs_UTG: [
      // Source: "BTN vs UTG RFI" chart — green (call) hands only.
      // Pairs
      '55','44','33','22',
      // Suited aces
      'A9s','A8s',
      // Suited kings
      'K9s',
      // Suited queens
      'Q9s','Q8s',
      // Suited jacks
      'J9s','J8s',
      // Suited tens/connectors
      'T9s','T8s',
      '98s','97s',
      '87s','86s',
      '76s','75s',
      '65s',
      '54s',
      // Offsuit
      'QJo','JTo','T9o',
    ],
    '3bet_vs_HJ': [
      // Source: "BTN vs MP RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 8.84%, Call 6.52%, Fold 84.84%. Slightly wider than vs UTG.
      // New vs HJ: QJo added as mixed 3-bet. A7s moves from call to green only.
      'AA','KK','QQ','JJ','TT','99','88','77',
      '66',
      'AKs','AQs','AJs','ATs',
      'A5s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'QTs',
      'JTs',
      'AKo','AQo','AJo',
      'ATo',
      'KQo',
      'KJo',
      'QJo',
    ],
    call_vs_HJ: [
      // Source: "BTN vs MP RFI" chart — green (call) hands only.
      // A7s added vs HJ (was fold vs UTG).
      '55','44','33','22',
      'A9s','A8s','A7s',
      'K9s',
      'Q9s','Q8s',
      'J9s','J8s',
      'T9s','T8s',
      '98s','97s',
      '87s','86s',
      '76s','75s',
      '65s',
      '54s',
      'JTo','T9o',
    ],
    '3bet_vs_CO': [
      // Source: "BTN vs CO RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 11.72%, Call 5.44%, Fold 82.84%. Widest BTN 3-bet range.
      // New vs CO: 55 added; A9s/A8s/A4s added; QTs/JTs fully orange;
      // Q9s/J9s/T9s added as mixed; JTo added.
      'AA','KK','QQ','JJ','TT','99','88','77',
      '66','55',
      'AKs','AQs','AJs','ATs',
      'A9s','A8s',
      'A5s','A4s',
      'KQs','KJs',
      'KTs',
      'QJs','QTs',
      'Q9s',
      'JTs',
      'J9s',
      'T9s',
      'AKo','AQo','AJo',
      'ATo',
      'KQo',
      'KJo','QJo',
      'JTo',
    ],
    call_vs_CO: [
      // Source: "BTN vs CO RFI" chart — green (call) hands only.
      // Narrower than vs UTG/HJ — several hands promoted to 3-bet.
      '44','33','22',
      'A6s',
      'K9s','K8s',
      'Q8s',
      'J8s',
      'T8s',
      '98s','97s',
      '87s','86s',
      '76s','75s',
      '65s',
      '54s',
      'T9o',
    ],

    // BTN vs BB 3-bet — Expert level
    // Source: "BTN vs BB 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 10.32%, Call 37.56%, Fold 52.12%.
    // Bluff shifts from A8s (vs SB) to A6s (vs BB) — different blocker logic.
    // KJo added vs BB. Call adds A7s, K8o, J8o, T8o.
    '4bet_vs_BB_3bet': [
      'AA',
      'KK',
      'AKs',
      'AQs',
      'A6s',
      'AKo',
      'AQo',
      'KQo',
      'KJo',
    ],
    'call_vs_BB_3bet': [
      'QQ','JJ','TT','99','88','77','66','55','44','33','22',
      'AJs','ATs','A9s','A8s','A7s',
      'KQs','KJs','KTs',
      'QJs','QTs',
      'JTs','T9s','98s',
      '87s','76s','75s','65s','54s',
      'AJo','ATo','A9o','A8o','A7o',
      'KTo','K9o',
      'K8o',
      'QJo','QTo',
      'JTo',
      'J8o',
      'T9o',
      'T8o',
    ],
    // Source: "BTN vs SB 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 10.17%, Call 37.47%, Fold 52.35%.
    // Notable: A8s replaces A5s as bluff 4-bet vs SB. KJo/ATo added as mixed.
    // BTN's wider range shifts blocker logic — A8s blocks SB 3-bet range better.
    '4bet_vs_SB_3bet': [
      'AA',
      'KK',
      'AKs',
      'AQs',
      'A8s',
      'AKo',
      'AQo',
      'ATo',
      'KJo',
    ],
    'call_vs_SB_3bet': [
      'QQ','JJ','TT','99','88','77','66','55','44','33','22',
      'AJs','ATs','A9s',
      'KQs','KJs','KTs',
      'QJs','QTs',
      'JTs','T9s','98s',
      '87s','76s','75s','65s','54s',
      'AJo','A9o','A8o','A7o',
      'KQo','KTo','K9o',
      'QJo','QTo',
      'JTo',
      'J8o',
      'T9o',
    ],
  },

  // ── SB ───────────────────────────────────────────────────
  // Source: SB RFI chart image (RangeConverter 6-max 500z 100BB).
  // Three actions: Raise 27.2% (3.0bb), Call 29.49%, Fold 43.32%.
  // SB is the only position with a call option when folded to.
  // 'open' = raise. 'call' = limp/call (complete the SB).
  SB: {
    open: [
      // Pairs — AA–44 raise; 33/22 call (see call array)
      'AA','KK','QQ','JJ','TT','99','88','77','66','55','44',
      // Suited aces — all raise
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
      // Suited kings — K8s+ raise; K7s–K5s call; K4s teal
      'KQs','KJs','KTs','K9s','K8s',
      // Suited queens — Q8s+ raise; Q7s–Q5s call; Q4s teal
      'QJs','QTs','Q9s','Q8s',
      // Suited jacks — J8s+ raise; J7s–J5s call; J4s teal
      'JTs','J9s','J8s',
      // Suited tens — T7s+ raise; T6s–T5s call; T4s teal
      'T9s','T8s','T7s',
      // Suited nines — 97s+ raise; 96s–95s call; 94s teal
      '98s','97s',
      // Suited eights — 86s+ raise; 85s–84s call; 83s teal
      '87s','86s',
      // Suited sevens — 75s+ raise; 74s–73s call; 72s teal
      '76s','75s',
      // Suited sixes — 64s+ raise; 63s–62s call
      '65s','64s',
      // Suited fives — 53s+ raise; 52s call
      '54s','53s',
      // Suited fours — 43s raise; 42s call
      '43s',
      // Offsuit aces — ATo+ raise; A9o–A2o call
      'AKo','AQo','AJo','ATo',
      // Offsuit kings — KJo+ raise; KTo–K7o call; K6o teal
      'KQo','KJo',
      // Offsuit queens — QJo raise; QTo–Q9o call; Q8o teal
      'QJo',
      // Offsuit jacks — JTo raise; J9o call; J8o teal
      'JTo',
      // Offsuit tens — T9o raise; T8o call; T7o teal
      'T9o',
    ],
    // SB call (complete/limp) when folded to
    call: [
      // Pairs
      '33','22',
      // Suited kings
      'K7s','K6s','K5s',
      // Suited queens
      'Q7s','Q6s','Q5s',
      // Suited jacks
      'J7s','J6s','J5s',
      // Suited tens
      'T6s','T5s',
      // Suited nines
      '96s','95s',
      // Suited eights
      '85s','84s',
      // Suited sevens
      '74s','73s',
      // Suited sixes
      '63s','62s',
      // Suited fives
      '52s',
      // Suited fours/threes
      '42s','32s',
      // Offsuit aces
      'A9o','A8o','A7o','A6o','A5o','A4o','A3o','A2o',
      // Offsuit kings
      'KTo','K9o','K8o','K7o',
      // Offsuit queens
      'QTo','Q9o',
      // Offsuit jacks
      'J9o',
      // Offsuit tens
      'T8o',
      // Offsuit nines
      '98o',
    ],
    '3bet_vs_UTG': [
      // Source: "SB vs UTG RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 7.27%, Fold 92.73%. No call option from SB vs a raise.
      // Tighter than BTN vs UTG — SB plays OOP so range is more value-heavy.
      // No KJo, ATo, or JTs as mixed. Bluff component limited to A5s only.
      'AA','KK','QQ','JJ','TT','99','88','77',
      'AKs','AQs','AJs','ATs',
      'A5s',
      'KQs','KJs','KTs',
      'QJs','QTs',
      'JTs',
      'AKo','AQo',
      'AJo',
      'KQo',
    ],
    '3bet_vs_HJ': [
      // Source: "SB vs MP RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 8.66%, Fold 91.34%. Wider than vs UTG.
      // New vs HJ: A9s/A8s added as mixed; ATo/QJo added as mixed.
      'AA','KK','QQ','JJ','TT','99','88','77',
      'AKs','AQs','AJs','ATs',
      'A9s','A8s',
      'A5s',
      'KQs','KJs','KTs',
      'QJs','QTs',
      'JTs',
      'AKo','AQo',
      'AJo','ATo',
      'KQo',
      'QJo',
    ],
    '3bet_vs_CO': [
      // Source: "SB vs CO RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 10.86%, Fold 89.14%. Wider than vs HJ.
      // New vs CO: A9s promoted to full; A4s added as bluff; K9s/Q9s/J9s
      // added as mixed; ATo/KJo promoted to fully orange; QJo mixed.
      'AA','KK','QQ','JJ','TT','99','88','77',
      'AKs','AQs','AJs','ATs','A9s',
      'A8s',
      'A5s','A4s',
      'KQs','KJs','KTs',
      'K9s',
      'QJs','QTs',
      'Q9s',
      'JTs',
      'J9s',
      'AKo','AQo','AJo','ATo',
      'KQo','KJo',
      'QJo',
    ],
    '3bet_vs_BTN': [
      // Source: "SB vs BTN RFI" chart (RangeConverter 6-max 500z 100BB)
      // 3-bet 14.99%, Fold 85.01%. Widest SB 3-bet range.
      // New vs BTN: 55/66 added; A7s promoted, A6s/A3s mixed; Q9s promoted,
      // Q8s/J8s/T9s added; QJo promoted; KTo/JTo added as mixed.
      'AA','KK','QQ','JJ','TT','99','88','77',
      '66','55',
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s',
      'A6s',
      'A5s','A4s',
      'A3s',
      'KQs','KJs','KTs',
      'K9s',
      'QJs','QTs','Q9s',
      'Q8s',
      'JTs',
      'J9s','J8s',
      'T9s',
      'AKo','AQo','AJo','ATo',
      'KQo','KJo',
      'QJo',
      'KTo',
      'JTo',
    ],
    call_vs_UTG:   [],   // Advanced level — TODO: add from chart
    call_vs_HJ:    [],   // Advanced level — TODO: add from chart
    call_vs_CO:    [],   // Advanced level — TODO: add from chart
    call_vs_BTN:   [],   // Advanced level — TODO: add from chart

    // SB vs BB 3-bet — Expert level
    // Source: "SB vs BB 3bet" chart (RangeConverter 6-max 500z 100BB)
    // 4-bet 16.68%, Call 24.69%, Fold 58.63%.
    // SB 4-bets wider than IP positions — prefers aggression OOP over calling.
    // AJs promoted to full 4-bet. Three bluffs: A5s/A4s/A3s + A2s mixed.
    // AJo/KJo/QJo promoted to full 4-bets. Narrower call range than IP positions.
    '4bet_vs_BB_3bet': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs','AJs',
      'A5s','A4s','A3s',
      'A2s',
      'KQs','KJs',
      'KTs',
      'QJs',
      'AKo','AQo','AJo',
      'ATo',
      'KQo','KJo',
      'QJo',
    ],
    'call_vs_BB_3bet': [
      // Pairs — TT–44 call; 33 teal
      'TT','99','88','77','66','55','44',
      // Suited
      'ATs',
      'K9s',
      'QTs',
      'JTs','J9s',
      'T9s','98s',
      '87s','76s',
      '65s','54s',
      // Offsuit
      'KTo',
      'QTo',
      'JTo',
      'J8o',
      'T8o',
    ],
  },

  // ── BB ───────────────────────────────────────────────────
  // BB only defends — no open action.
  // All five defending situations fully populated from chart images.
  // Source: RangeConverter 6-max 500z 100BB series.
  BB: {
    // ── BB vs UTG ──────────────────────────────────────────
    // Source: "BB vs UTG RFI" chart (RangeConverter 6-max 500z 100BB)
    // 3-bet 5.81%, Call 22.9%, Fold 71.29%.
    '3bet_vs_UTG': [
      // Pairs — AA/KK/QQ fully orange; JJ mixed (included)
      'AA','KK','QQ',
      'JJ',
      // Suited aces — AKs–AJs fully orange; ATs mixed; A5s/A4s bluffs
      'AKs','AQs','AJs',
      'ATs',
      'A5s',
      'A4s',
      // Suited kings — KQs/KJs fully orange; KTs mixed
      'KQs','KJs',
      'KTs',
      // Suited queens — QJs mixed
      'QJs',
      // Offsuit — AKo fully orange; AQo/KQo mixed
      'AKo',
      'AQo',
      'KQo',
    ],
    call_vs_UTG: [
      // Pairs — TT–22 all call
      'TT','99','88','77','66','55','44','33','22',
      // Suited aces
      'A9s','A8s','A7s','A6s',
      'A3s','A2s',
      // Suited kings
      'K9s','K8s','K7s','K6s','K5s',
      // Suited queens
      'QTs','Q9s','Q8s','Q7s','Q6s',
      // Suited jacks
      'JTs','J9s','J8s','J7s',
      // Suited tens
      'T9s','T8s','T7s',
      // Suited nines
      '98s','97s','96s',
      // Suited eights
      '87s','86s','85s',
      // Suited sevens
      '76s','75s',
      // Suited sixes
      '65s','64s',
      // Suited fives
      '54s','53s',
      // Offsuit aces
      'AJo','ATo','A9o','A8o','A7o',
      // Offsuit kings
      'KJo','KTo',
      // Offsuit queens
      'QJo','QTo',
      // Offsuit jacks
      'JTo',
      // Offsuit tens
      'T9o',
    ],

    // ── BB vs HJ ───────────────────────────────────────────
    // Source: "BB vs MP RFI" chart (RangeConverter 6-max 500z 100BB)
    // 3-bet 7.58%, Call 23.91%, Fold 68.5%. Wider than vs UTG.
    // New vs HJ: ATs promoted; A9s/QTs/Q9s/JTs/AJo/KJo added.
    '3bet_vs_HJ': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs','AJs','ATs',
      'A9s',
      'A5s',
      'A4s',
      'KQs','KJs',
      'KTs',
      'QJs','QTs',
      'Q9s',
      'JTs',
      'AKo','AQo',
      'AJo',
      'KQo','KJo',
    ],
    call_vs_HJ: [
      // Pairs
      'TT','99','88','77','66','55','44','33','22',
      // Suited aces
      'A8s','A7s','A6s',
      'A3s','A2s',
      // Suited kings
      'K9s','K8s','K7s','K6s','K5s',
      // Suited queens
      'Q8s','Q7s','Q6s',
      // Suited jacks
      'J9s','J8s','J7s',
      // Suited tens
      'T9s','T8s','T7s',
      // Suited nines
      '98s','97s','96s',
      // Suited eights
      '87s','86s','85s',
      // Suited sevens
      '76s','75s','74s',
      // Suited sixes
      '65s','64s','63s',
      // Suited fives
      '54s','53s','52s',
      // Offsuit aces
      'ATo','A9o','A8o',
      // Offsuit kings
      'KTo','K9o',
      // Offsuit queens
      'QJo','QTo',
      // Offsuit jacks
      'JTo',
      // Offsuit tens
      'T9o',
    ],

    // ── BB vs CO ───────────────────────────────────────────
    // Source: "BB vs CO RFI" chart (RangeConverter 6-max 500z 100BB)
    // 3-bet 9.74%, Call 25.66%, Fold 64.6%. Wider than vs HJ.
    // New vs CO: A8s promoted; A3s added; QTs promoted; Q8s/T9s added;
    // ATo/QJo added to 3-bet; 98o added to call.
    '3bet_vs_CO': [
      'AA','KK','QQ',
      'JJ',
      'AKs','AQs','AJs','ATs','A9s','A8s',
      'A5s',
      'A4s','A3s',
      'KQs','KJs',
      'KTs',
      'QJs','QTs',
      'Q9s','Q8s',
      'JTs','J9s',
      'T9s',
      'AKo','AQo',
      'AJo','ATo',
      'KQo','KJo',
      'QJo',
    ],
    call_vs_CO: [
      // Pairs
      'TT','99','88','77','66','55','44','33','22',
      // Suited aces
      'A7s','A6s',
      'A2s',
      // Suited kings
      'K9s','K8s','K7s','K6s','K5s',
      // Suited queens
      'Q7s','Q6s',
      // Suited jacks
      'J8s','J7s',
      // Suited tens
      'T8s','T7s',
      // Suited nines
      '98s','97s','96s',
      // Suited eights
      '87s','86s','85s',
      // Suited sevens
      '76s','75s',
      // Suited sixes
      '65s','64s','63s',
      // Suited fives
      '54s','53s','52s',
      // Offsuit aces
      'A9o','A8o',
      // Offsuit kings
      'KTo','K9o',
      // Offsuit queens — QJo omitted (in 3bet_vs_CO per source comment)
      'QTo',
      // Offsuit jacks
      'JTo',
      // Offsuit tens
      'T9o',
      // Offsuit nines
      '98o',
    ],

    // ── BB vs BTN ──────────────────────────────────────────
    // Source: "BB vs BTN RFI" chart (RangeConverter 6-max 500z 100BB)
    // 3-bet 14.09%, Call 33.61%, Fold 52.3%. Widest BB 3-bet range.
    // New vs BTN: TT added; A7s promoted, A6s/A2s mixed; K9s, Q7s, J7s,
    // T8s, 76s added; AJo/QJo promoted; A9o/QTo added.
    '3bet_vs_BTN': [
      'AA','KK','QQ',
      'JJ','TT',
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s',
      'A6s',
      'A5s','A4s','A3s',
      'A2s',
      'KQs','KJs',
      'KTs','K9s',
      'QJs','QTs',
      'Q9s','Q8s','Q7s',
      'JTs','J9s',
      'J8s','J7s',
      'T9s','T8s',
      '76s',
      'AKo','AQo','AJo',
      'ATo','A9o',
      'KQo','KJo',
      'KTo',
      'QJo',
      'QTo',
      'JTo',
    ],
    call_vs_BTN: [
      // Pairs
      '99','88','77','66','55','44','33','22',
      // Suited aces — A6s omitted (in 3bet_vs_BTN at ≥50% threshold)
      // Suited kings
      'K8s','K7s','K6s','K5s',
      // Suited queens
      'Q6s','Q5s',
      // Suited jacks
      'J6s','J5s',
      // Suited tens
      'T7s','T6s',
      // Suited nines
      '97s','96s',
      // Suited eights
      '87s','86s','85s',
      // Suited sevens
      '75s','74s',
      // Suited sixes
      '64s','63s',
      // Suited fives
      '53s','52s',
      // Suited fours
      '43s',
      // Offsuit aces
      'A8o','A7o',
      // Offsuit kings
      'K9o',
      // Offsuit queens
      'Q9o',
      // Offsuit jacks
      'J9o',
      // Offsuit tens
      'T9o','T8o',
      // Offsuit nines
      '98o',
    ],

    // ── BB vs SB ───────────────────────────────────────────
    // Source: "BB vs SB RFI" chart (RangeConverter 6-max 500z 100BB)
    // 3-bet 14.43%, Call 47.62%, Fold 37.95%.
    // BB calls nearly half its hands vs SB — widest call range in dataset.
    // SB opens only 27% and is OOP vs BB, so BB can profitably call very wide.
    '3bet_vs_SB': [
      'AA','KK','QQ',
      'JJ','TT',
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s',
      'A5s','A4s','A3s',
      'A2s',
      'KQs','KJs',
      'KTs','K9s',
      'QJs','QTs',
      'Q9s','Q8s',
      'JTs','J9s',
      'J8s',
      'T9s',
      'AKo','AQo','AJo',
      'ATo','A9o',
      'KQo','KJo',
      'KTo',
      'QJo','QTo',
      'JTo',
    ],
    call_vs_SB: [
      // Pairs
      '99','88','77','66','55','44','33','22',
      // Suited kings — K2s+ all call
      'K8s','K7s','K6s','K5s','K4s','K3s','K2s',
      // Suited queens — Q7s+ call (Q8s+ in 3-bet)
      'Q7s','Q6s','Q5s','Q4s','Q3s','Q2s',
      // Suited jacks — J7s+ call
      'J7s','J6s','J5s','J4s','J3s','J2s',
      // Suited tens — T8s+ call
      'T8s','T7s','T6s','T5s','T4s','T3s','T2s',
      // Suited nines
      '98s','97s','96s','95s','94s','93s','92s',
      // Suited eights
      '87s','86s','85s','84s','83s','82s',
      // Suited sevens
      '76s','75s','74s','73s','72s',
      // Suited sixes
      '65s','64s','63s','62s',
      // Suited fives
      '54s','53s','52s',
      // Suited fours/threes
      '43s','42s',
      '32s',
      // Offsuit aces
      'A8o','A7o','A6o','A5o','A4o','A3o','A2o',
      // Offsuit kings
      'K9o','K8o','K7o','K6o','K5o','K4o','K3o','K2o',
      // Offsuit queens
      'Q9o','Q8o','Q7o',
      // Offsuit jacks
      'J9o','J8o','J7o',
      // Offsuit tens
      'T9o','T8o','T7o',
      // Offsuit nines
      '98o','97o','96o',
      // Offsuit eights/sevens
      '87o','76o',
    ],

    // ── BB vs SB Limp ──────────────────────────────────────
    // Source: "BB vs SB Limp" chart (RangeConverter 6-max 500z 100BB)
    // BB faces SB complete (limp). Two actions: Raise 38.97%, Check 61.03%.
    // No fold — BB already has 1BB in and checks for free if not raising.
    // 'raise_vs_SB_limp' = BB raises. Absent = BB checks (default).
    raise_vs_SB_limp: [
      // Pairs — AA–55 raise; 44 and below check
      'AA','KK','QQ','JJ','TT','99','88','77','66',
      '55',
      // Suited aces — entire range raises
      'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
      // Suited kings — K8s+ fully; K7s/K6s mixed (included); K5s check
      'KQs','KJs','KTs','K9s','K8s',
      'K7s','K6s',
      // Suited queens — Q8s+ fully; Q7s/Q6s mixed (included); Q5s check
      'QJs','QTs','Q9s','Q8s',
      'Q7s','Q6s',
      // Suited jacks — J8s+ fully; J7s/J6s mixed (included); J5s check
      'JTs','J9s','J8s',
      'J7s','J6s',
      // Suited tens — T7s+ fully; T6s mixed (included); T5s check
      'T9s','T8s','T7s',
      'T6s',
      // Suited nines — 96s+ fully; 95s mixed (included)
      '98s','97s','96s',
      '95s',
      // Suited eights — 86s+ fully; 85s mixed (included)
      '87s','86s',
      '85s',
      // Suited sevens — 75s+ fully; 74s mixed (included)
      '76s','75s',
      '74s',
      // Suited sixes — 65s fully; 64s mixed (included)
      '65s',
      '64s',
      // Suited fives — 54s mixed (included)
      '54s',
      // Offsuit aces — ATo+ fully; A9o/A8o mixed (included); A7o check
      'AKo','AQo','AJo','ATo',
      'A9o','A8o',
      // Offsuit kings — KTo+ fully; K9o mixed (included); K8o check
      'KQo','KJo','KTo',
      'K9o',
      // Offsuit queens — QTo+ fully; Q9o mixed (included)
      'QJo','QTo',
      'Q9o',
      // Offsuit jacks — J9o+ fully; J8o mixed (included)
      'JTo','J9o',
      'J8o',
      // Offsuit tens — T8o+ fully; T7o mixed (included)
      'T9o','T8o',
      'T7o',
      // Offsuit nines — 98o fully; 97o mixed (included)
      '98o',
      '97o',
      // Offsuit eights — 87o mixed (included)
      '87o',
    ],
  },
};
