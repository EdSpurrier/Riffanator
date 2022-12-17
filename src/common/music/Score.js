//==============
//  SCORE
//  
//--------------
//
//  note: 0-127 (actual note) [0 => C-2 | 128 => C8]
//  state: noteon (1), noteoff (0), null (-1)
//  velocity: 1-127
//  
//==============

import Bar from "./Bar";

const Score = {
    bars : [],  // Use = Array(4).fill(Bar) to fill and empty Score
}

export default Score;