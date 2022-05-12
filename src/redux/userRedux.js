import { createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import Storagekey from "../constants/storagekey";

export const login = async (dispatch, data, username) => {
    dispatch(loginStart());

    // const userFake = {
    //     username: "Trung",
    //     password: "123"
    // }

    // if (data.username === userFake.username && data.password === userFake.password) {
    //     dispatch(loginSuccess(userFake));
    //     localStorage.setItem(Storagekey.USER, JSON.stringify(data))
    // }
    // else {
    //     dispatch(loginFailure());
    // }

    if (data.AccessToken && data.RefreshToken) {
        localStorage.setItem(Storagekey.ACCESS_TOKEN, data.AccessToken)
        localStorage.setItem(Storagekey.REFRESH_TOKEN, data.RefreshToken)
        const userdata = await userApi.get(username)
        dispatch(loginSuccess(userdata))
        localStorage.setItem(Storagekey.USER, JSON.stringify(userdata))
    } else {
        dispatch(loginFailure());
    }
};

export const register = async (dispatch, data) => {
    dispatch(RegisterStart());
    try {
        const res = await userApi.register(data);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem(Storagekey.USER)) || null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false;

        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        RegisterStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        RegisterSuccess: (state, action) => {
            state.isFetching = false;
        },
        RegisterFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        Logout(state) {
            localStorage.clear();
            state.currentUser = null;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, RegisterStart, RegisterSuccess, RegisterFailure, Logout } = userSlice.actions;
export default userSlice.reducer;
