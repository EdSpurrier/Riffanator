export const attachGuitarMachine = (machineId, guitarMachineData) => {
/*     console.log('attachGuitarMachine', machineId, guitarMachineData); */
    return {
        type: 'ATTACH',
        machineId: machineId,
        payload: guitarMachineData
    }
}


export const updateSelectedNote = (machineId, selectedNote) => {
/*     console.log('updateSelectedNote', machineId, selectedNote); */
    return {
        type: 'SELECT_NOTE',
        machineId: machineId,
        payload: selectedNote
    }
}
