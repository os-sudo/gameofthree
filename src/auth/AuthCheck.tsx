import React from "react";
import {
    useLocation,
    Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN_PHASES_ENUMS } from "../enums";
import { IGameState } from "../interface";
const AuthCheck = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const loginStatus: LOGIN_PHASES_ENUMS = useSelector((state: IGameState) => state.loginStatus);
    const isUserNotLoggedIn = loginStatus !== LOGIN_PHASES_ENUMS.LOGGED_IN;
    if (isUserNotLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}


export default AuthCheck;