'use client';
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({children}: {children: React.ReactNode}){
    const ReduxProvider = Provider as any;
    return(
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </ReduxProvider>
    );
}