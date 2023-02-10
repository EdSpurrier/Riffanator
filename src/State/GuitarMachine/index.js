
//  REDUCER => GUITAR MACHINE
//
//  Guitar Machines
//




//  INITIAL STATE
const initialState = {
    guitarMachine: [
        {
            name: 'None',
            selectedNote: -1,
            track: null,
            fretboard: null,
            tablatureTrack: null,
            trackControlBar: null,
        },
        {
            name: '',
            selectedNote: -1,
            track: null,
            fretboard: null,
            tablatureTrack: null,
            trackControlBar: null
        }
    ]
};


const guitarMachineReducer = (state = initialState, action) => {
    const guitarMachine = state.guitarMachine[action.machineId];
    
    switch (action.type) {
        case "SELECT_NOTE":
            console.log(state.guitarMachine[action.machineId].selectedNote, action.payload);

            state.guitarMachine[action.machineId].selectedNote = action.payload;
        case "ATTACH":
            if (action.payload.name) state.guitarMachine[action.machineId].name = action.payload.name;
            if (action.payload.tablatureTrack) state.guitarMachine[action.machineId].tablatureTrack = action.payload.tablatureTrack;
            if (action.payload.fretboard) state.guitarMachine[action.machineId].fretboard = action.payload.fretboard;

/* 
            if (action.payload.track) state.guitarMachine[action.machineId].track = action.payload.track;
            if (action.payload.fretboard) state.guitarMachine[action.machineId].fretboard = action.payload.fretboard;
            if (action.payload.tablatureTrack) state.guitarMachine[action.machineId].tablatureTrack = action.payload.tablatureTrack;
            if (action.payload.trackControlBar) state.guitarMachine[action.machineId].trackControlBar = action.payload.trackControlBar; */
            return state;
        default:
            return state;
    }
}

export default guitarMachineReducer;