
export const rootReducer: (state: any, action: any) => void = (state = {startSave: false}, action) => {
    switch(action.type){
        case 'SAVE': {
            return {
                ...state,
                eventId: action.payload.eventId,
                eventName: action.payload.eventName
            }
        }
        case 'SAVE_COMPLETE': {
            return {
                ...state,
                savedData: action.payload.data,
            }
        }
        default:
            return state
    }
}