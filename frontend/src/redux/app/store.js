import { configureStore } from "@reduxjs/toolkit";
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';
import resourceReducer from '../features/admin/resourceSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        resource:resourceReducer
       
    },
})

export default store;