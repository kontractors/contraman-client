import {createBrowserRouter} from "react-router";
import App from "./App.tsx";

const routes = [
    {
        path: "",        // matches "/"
        element: <App/>,
    },
]


export const router = createBrowserRouter([
    {path: "/", children: routes},
    {path: "*", element: <h1>404</h1>}
]);