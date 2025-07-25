import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
// import i18n (needs to be bundled ;))
import './i18n.ts';
import {RouterProvider} from "react-router";
import {router} from "./routes.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />,
    </StrictMode>,
)
