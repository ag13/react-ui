
export const rootReducer: (state: any, action: any) => void = (state = {startSave: false}, action) => {
    switch(action.type){
        case 'SAVE': {
            return {
                ...state,
                eventId: action.payload.eventId,
                eventName: action.payload.eventName,
                data: action.payload.data
            }
        }
        case 'EVENT_COMPLETE': {
            return {
                ...state,
                savedData: action.payload.data,
            }
        }
        case 'NEXT_PAGE': {
            return {
                ...state,
                eventId: action.payload.eventId,
                eventName: action.payload.eventName,
                data: undefined
            }
        }
        case 'PREVIOUS_PAGE': {
            return {
                ...state,
                eventId: action.payload.eventId,
                eventName: action.payload.eventName,
                data: undefined
            }
        }
        default:
            return state
    }
}