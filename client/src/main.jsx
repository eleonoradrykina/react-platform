import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes";
import Login from "./routes/auth/login";
import CreateArtwork from "./routes/createArtwork";
import Root from "./routes/root";
import "./styles/style.css";
import Register from "./routes/auth/register";
import ErrorPage from "./routes/error-page";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader,
    children: [
      { index: true, element: <Index />, loader: Index.loader },
      {
        path: "/cheese/create",
        element: <CreateArtwork />,
        action: CreateArtwork.action,
        loader: CreateArtwork.loader,
      },
      {
        path: "/auth/login",
        element: <Login />,
        action: Login.action,
        loader: Login.loader,
      },
      {
        path: "/auth/register",
        element: <Register />,
        action: Register.action,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
