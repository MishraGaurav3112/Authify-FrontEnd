import {createContext, useEffect, useState} from "react";
import { AppConstants } from "../util/constants.js";
import axios from "axios";
import {toast} from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = AppConstants.BAKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/profile`, {
                withCredentials: true, // important if backend uses cookies
            });

            if (response.status === 200) {
                setUserData(response.data);
            } else {
                toast.error("Unable To retrieve the Profile");
            }
        } catch (e) {
            toast.error(e.response?.data?.message || e.message || "Error fetching profile");
        }
    };

    const getAuthState = async () => {
        try {
            const response = await axios.get(`${backendUrl}/is-authenticated`, {
                withCredentials: true,  // <-- include cookies
            });

            if (response.status === 200 && response.data === true) {
                setIsLoggedIn(true);
                await getUserData();
            } else {
                setIsLoggedIn(false);
            }
        } catch (e) {

            console.log(e);

        }
    };

    useEffect(() => {
      getAuthState();
    }, []);
    

    const contextValue = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
