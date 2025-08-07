import { configureStore } from "@reduxjs/toolkit";
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
       
    },
})

export default store;