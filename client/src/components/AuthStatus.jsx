import { Link, useRouteLoaderData } from "react-router-dom";
import styles from "./Nav.module.css";
import { logout } from "../services/auth"
import { BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";

const AuthStatus = () => {

  let { user } = useRouteLoaderData("root");

  const handleLogOut = async () => {
    logout();
    window.location.reload();
  };

  return user ? (
    <div className={styles.buttonsWrapper}>
    <Link className={styles.button} to="/artwork/create">
      Create & save Artwork
    </Link>
    <Link className={styles.iconButton} to="/auth/profile">

    <IconContext.Provider value={{size: '2rem' }}>
      <BsPersonCircle  />
      </IconContext.Provider>
    </Link>
    <button className={styles.button} onClick = {()=> handleLogOut()}>
     Log out
    </button>
    </div>
  ) : (
    <Link className={styles.button} to="/auth/login">
      Sign in
    </Link>
  );
};

export default AuthStatus;
