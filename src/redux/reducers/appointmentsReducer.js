import actionTypes from "../actions/actionTypes";

const initialState = {
    start: false,
    success: false,
    appointments: [],
    fail: false,
    error: ""
}
const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_APPOINTMENTS_START:
            return {
                ...state,
                start: true,
            }
        case actionTypes.FETCH_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                start: false,
                fail: false,
                error: "",
                success: true,
                appointments: action.payload
            }
        case actionTypes.FETCH_APPOINTMENTS_FAIL:
            return {
                ...state,
                start: false,
                success: false,
                fail: true,
                error: action.payload
            }
        case actionTypes.ADD_APPOINTMENT:
            return {
                ...state,
                appointments: [action.payload, ...state.appointments]
            }
        case actionTypes.DELETE_APPOINTMENT:
            const filteredAppointments = state.appointments.filter(item => item.id !== action.payload)
            return {
                ...state,
                patients: filteredAppointments
            }
        default:
            return state;
    }
}
export default appointmentsReducer