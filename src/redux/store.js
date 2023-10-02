/* 
 1- Import the reducers that created for states
 which are going to put in the store
 2- Combine the imported reducers for uploading to store
 3- Upload the combined states to the store
*/
import {combineReducers, createStore} from "redux";
import patientsReducer from "./reducers/patientsReducer";
import appointmentsReducer from "./reducers/appointmentsReducer";
import operationsReducer from "./reducers/operationsReducer";

const rootReducer = combineReducers({
    patientsState: patientsReducer,
    appointmentsState: appointmentsReducer,
    operationsState: operationsReducer,
})

const store = createStore(rootReducer)

export default store;