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
import ArtworkDetail from "./routes/artworkDetail";
import EditArtwork from "./routes/editArtwork";
import Profile from "./routes/auth/profile";
import User from "./routes/user";



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
        path: "/artwork/create",
        element: <CreateArtwork />,
        action: CreateArtwork.action,
        loader: CreateArtwork.loader,
      },
      {
        path: "/artwork/edit/:id",
        element: <EditArtwork />,
        action: EditArtwork.action,
        loader: EditArtwork.loader,
      },
      {
        path: "/artwork/:id",
        element: <ArtworkDetail />,
        loader: ArtworkDetail.loader,
        action: ArtworkDetail.action,
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
     {
        path: "/auth/profile",
        element: <Profile />,
        loader: Profile.loader,
      },
      {
        path: "/user/:id",
        element: <User />,
        loader: User.loader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
