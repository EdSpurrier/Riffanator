import { combineReducers } from 'redux';
import interactionReducer from '../Interaction';
import guitarMachineReducer from '../GuitarMachine';
import generatorReducer from '../Generator';

const RootReducer = combineReducers({
    interaction: interactionReducer,
    guitarMachine: guitarMachineReducer,
    generator: generatorReducer
});

export default RootReducer;