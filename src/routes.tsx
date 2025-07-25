import {createBrowserRouter} from "react-router";
import App from "./App.tsx";
import Layout from "./layout.tsx";
import LoginForm from "./components/auth/login.tsx";

const routes = [
    {path: "", element: <App/>,},
    {path: "login", element: <LoginForm/>},
]

export const router = createBrowserRouter([
    {path: "/", children: routes, element: <Layout/>},
    {path: "*", element: <h1>404</h1>}
]);