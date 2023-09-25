import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";
import util from "lib/utility";
import "babel-polyfill";
import { map } from "lodash";
import ErrorPage from "./error-page";
import Home from "./Home";

window.mUtil = util;

let cookies = new Cookies();
axios.defaults.headers.common = {
    "X-CSRF-TOKEN": cookies.get("_csrf"),
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
};
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("Axios error:", error);
        if (error.response.status === 401) {
            window.location = "/";
        }
        return Promise.reject(error);
    },
);

let history = createBrowserHistory();
let deps = { axios, history, cookies, moment };

let userCookie;
try {
    userCookie = cookies && cookies.cookies && cookies.cookies.username ? JSON.parse(cookies.cookies.username) : null;
} catch (e) {}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
