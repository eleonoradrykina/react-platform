import { Outlet } from "react-router-dom";
import Nav from "../components/svg/Nav";
import { getAuthData } from "../services/auth";

const loader = async () => {
  const data = getAuthData();
  return data;
};

const Root = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

Root.loader = loader;

export default Root;
