
//  REDUCER => INTERACTION
//
//  Used for interation control of sections, machines, systems & devices
//  Using input devices such as keyboard & mouse
//

import { config } from "../../common/utils/config";



console.log();
//  INITIAL STATE
const initialState = {
    files: {},
    actions: {
        grooveSkeleton : {
            generate : null,
            noteTriggerRecord : null,
            clearGrooveSkeleton : null
        }
    },
    settings: {
        grooveSkeleton: {
            note_chance : {
                1: config.generator.settings.grooveSkeleton.note_chance.length_1,
                2: config.generator.settings.grooveSkeleton.note_chance.length_2,
                4: config.generator.settings.grooveSkeleton.note_chance.length_4,
                8: config.generator.settings.grooveSkeleton.note_chance.length_8,
                16: config.generator.settings.grooveSkeleton.note_chance.length_16,
                32: config.generator.settings.grooveSkeleton.note_chance.length_32,
            }
        }
    }
};


const generatorReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GENERATOR_UPDATE_ACTIONS":
            state = Object.assign({}, state, action.payload.value)
            return state;

        case "ADD_FILES":
            state = Object.assign({}, state, {
                files: action.payload.map((file) =>
                    file
                ),
            })
            return state;

         case "GENERATOR_UPDATE_GROOVE_SETTINGS":
            state = Object.assign({}, state, action.payload.value)
            return state;

        default:
            return state;
    }
}

export default generatorReducer;