
export const rootReducer: (state: any, action: any) => void = (state = {startSave: false}, action) => {
    switch(action.type){
        case 'SAVE': {
            console.log('action save', action.payload)
            return {
                ...state,
                saveComplete: false,
                eventId: action.payload.eventId
            }
        }
        case 'SAVE_COMPLETE': {
            console.log('action save complete', action.payload)
            return {
                ...state,
                savedData: action.payload.data,
                saveComplete: true
            }
        }
        default:
            return state
    }
}