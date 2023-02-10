
//  REDUCER => INTERACTION
//
//  Used for interation control of sections, machines, systems & devices
//  Using input devices such as keyboard & mouse
//




//  INITIAL STATE
const initialState = { 
    selected: {
        name: '',
        actions: {
            keyboard : [],
            midi : []
        }
        
    },
    lastSelected: null,
    
};


const interactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_PANEL":
            return Object.assign({}, state, {
                selected: {
                    name: action.payload.name,
                    actions: {
                        keyboard : action.payload.keyboardActions? action.payload.keyboardActions : [],
                        midi : action.payload.midiActions? action.payload.midiActions : []
                    }
                    
                },
                lastSelected: state.selected
            })

        case "DESELECT_PANEL":
            return Object.assign({}, state, {
                selected: {
                    name: '',
                    actions: {
                        keyboard : [],
                        midi : []
                    }
                },
                lastSelected: state.selected
            })
        default:
            return state;
    }
}

export default interactionReducer;