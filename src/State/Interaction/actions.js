export const selectPanel = (panelData) => {
    return {
        type: 'SELECT_PANEL',
        payload: panelData
    }
}

export const deselectPanel = () => {
    return {
        type: 'DESELECT_PANEL'
    }
}

