//==============
//  NOTE
//  1/32
//--------------
//
//  note: 0-127 (actual note) [0 => C-2 | 128 => C8]
//  state: noteon (1), noteoff (0), null (-1)
//  velocity: 1-127
//  
//==============


const Note = {
    noteNumber : 0,
    state : -1,
    velocity : 0
}

export default Note;