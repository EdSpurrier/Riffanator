export const addFilesToGenerator = (files) => {
    return {
        type: 'ADD_FILES',
        payload: files
    }
}



export const generator_UpdateActions = (actions) => {
    return {
        type: 'GENERATOR_UPDATE_ACTIONS',
        payload: actions
    }
}

export const generator_UpdateGrooveSkeleton = (settings) => {
    return {
        type: 'GENERATOR_UPDATE_GROOVE_SETTINGS',
        payload: settings
    }
}