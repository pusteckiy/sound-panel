import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import Storage from './storage/storage';


const storage = new Storage();
export const Context = createContext({
    storage
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{storage}}>
        <App />
    </Context.Provider>
);
