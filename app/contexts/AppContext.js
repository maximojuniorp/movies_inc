import { createContext, useState, useContext } from 'react';

const INITIAL_APP_CONTEXT_STATE = {
    loadingIndicator:{
        visible:false,
        message:null,
        backgroundColor:null
    },
    showLoading: () => {},
    hideLoading: () => {} 
}

export const AppContext = createContext(INITIAL_APP_CONTEXT_STATE);

export default function AppContextProvider({children}){

    const [ appState, setAppState ] = useState(INITIAL_APP_CONTEXT_STATE)

    function showLoadingHandle(message = null, backgroundColor = null){
       setAppState( prev => {
           return { ...prev, loadingIndicator:{...prev.loadingIndicator, visible: true, message, backgroundColor}}
       })
    };

    function hideLoadingHandle(){
        setAppState( prev => {
            return { ...prev, loadingIndicator:{...prev.loadingIndicator, visible: false }}
        })
    };
    
    const initialState = {
        loadingIndicator: appState.loadingIndicator,
        showLoading: showLoadingHandle,
        hideLoading: hideLoadingHandle
    }

    return (
        <AppContext.Provider value={initialState}>
          {children}
        </AppContext.Provider>
    )
}