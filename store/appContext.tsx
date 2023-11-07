'use client';

import { createContext, useContext, useState } from "react";
import { AppContextProp } from "../application_types/appContextProp";
import { DataStore } from "@/application_types/dataStore";



const AppContext = createContext({} as any)

export const AppContextProvider = ({ children }:AppContextProp) => {
    const [dataStore, setDataStore] = useState<DataStore>({
        employee: { email: "", _id: "", firstName: "", lastName: ""}
    });

    return (
        <AppContext.Provider value={{ dataStore, setDataStore }}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);