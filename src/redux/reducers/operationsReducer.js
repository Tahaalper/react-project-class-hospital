import actionTypes from "../actions/actionTypes";

const initialState = {
    start: false,
    success: false,
    operations: [],
    fail: false,
    error: ""
}

const operationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_OPERATIONS_START:
            return {
                ...state,
                start: true,
            }
        case actionTypes.FETCH_OPERATIONS_SUCCESS:
            return {
                ...state,
                start: false,
                fail: false,
                error: "",
                success: true,
                patient: action.payload
            }
        case actionTypes.FETCH_OPERATIONS_FAIL:
            return {
                ...state,
                start: false,
                success: false,
                fail: true,
                error: action.payload
            }
        case actionTypes.ADD_OPERATION:
            return {
                ...state,
                operations: [action.payload, ...state.operations]
            }
        case actionTypes.DELETE_OPERATION:
            const undeletedOperations = state.operations.filter((item) => item.id !== action.payload)
            return {
                ...state,
                operations: undeletedOperations
            }
        case actionTypes.EDIT_OPERATION:
            const uneditedOperations = state.operations.filter((item) => item.id !== action.payload.id)
            uneditedOperations.push(action.payload)
            return {
                ...state,
                operations: uneditedOperations
            }
        default:
            return state;
    }
}
export default operationsReducer