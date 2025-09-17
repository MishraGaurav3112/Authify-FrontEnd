import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";   // ✅ CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ JS bundle
import "bootstrap-icons/font/bootstrap-icons.css";  // ✅ Icons
import { BrowserRouter } from 'react-router-dom';
import {AppContextProvider} from "./context/AppContext.jsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AppContextProvider >
                <App />
            </AppContextProvider>

        </BrowserRouter>
    </StrictMode>,
);
