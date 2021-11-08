import React, { createContext } from "react";
import { data } from "./data";

// initial State
const initialState = { books: data };

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={{ books: initialState.books }}>
            {children}
        </GlobalContext.Provider>
    );
};