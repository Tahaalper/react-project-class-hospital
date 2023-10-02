import actionTypes from "../actions/actionTypes";
/* 
    1- Create an initial state,
    2- Code reducer
*/

const initialState = {
    start: false,
    success: false,
    patients: [],
    fail: false,
    error: ""
}
/* 
Reducer is a function. Its func is make ammendments on 
a state according to the their action's type
*/
const patientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PATIENTS_START:
            return {
                ...state,
                start: true,
            }
        case actionTypes.FETCH_PATIENTS_SUCCESS:
            return {
                ...state,
                start: false,
                fail: false,
                error: "",
                success: true,
                patients: action.payload
            }
        case actionTypes.FETCH_PATIENTS_FAIL:
            return {
                ...state,
                start: false,
                success: false,
                fail: true,
                error: action.payload
            }
        case actionTypes.ADD_PATIENT:
            return {
                ...state,
                patients: [action.payload, ...state.patients]
            }
        case actionTypes.EDIT_PATIENT:
            const uneditedPatients = state.patients.filter(
                item=>item.id !== action.payload.id);
            return {
                ...state,
                patients: [action.payload, ...uneditedPatients]
            }
        case actionTypes.DELETE_PATIENT:
            const filteredPatients= state.patients.filter(item=>item.id !== action.payload)
            return{
                ...state,
                patients: filteredPatients
            }
        default:
            return state;
    }
}
export default patientsReducer