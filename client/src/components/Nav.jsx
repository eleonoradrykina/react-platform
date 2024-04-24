import { Link } from "react-router-dom";
// import styles from "./Nav.module.css";
import AuthStatus from "./AuthStatus";

const Nav = () => {
  return (
    <div className={` `}>
      <div className={ ''}>
        <Link to="/" className={' '}>
          <h1>React platform</h1>
        </Link>

        <AuthStatus />
      </div>
    </div>
  );
};

export default Nav;
