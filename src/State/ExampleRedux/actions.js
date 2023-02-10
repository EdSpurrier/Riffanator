export const increment = (number) => {
    return {
        type: 'INCREMENT',
        payload: number
    }
}

export const decrement = () => {
    return {
        type: 'DECREMENT',
    }
}


export const signIn = () => {
    return {
        type: 'SIGN_IN'
    }
}

