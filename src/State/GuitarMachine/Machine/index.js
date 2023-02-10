import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPanel, deselectPanel } from '../../../State/Interaction/actions';
import { attachGuitarMachine, updateSelectedNote } from '../actions';

export const useGuitarMachine = (machineId, guitarMachineData = null) => {

    const dispatch = useDispatch();
    const guitarMachine = useSelector(state => state.guitarMachine.guitarMachine[machineId]);
    
    if (guitarMachineData) {
        dispatch(attachGuitarMachine(machineId, guitarMachineData));
    }
    
    const selectNote = (noteId) => {
        dispatch(updateSelectedNote(machineId, noteId));
        guitarMachine.fretboard.updateFretboard();
    }

/*     guitarMachine.selectNote = selectNote;

    return guitar */

    return {
        machine : guitarMachine,
        selectNote
    };
}