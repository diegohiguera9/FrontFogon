import "../styles/components/HeaderHome.scss";
import { Link } from "react-router-dom";
import NavHome from "./NavHome";


const HeaderHome = () => {
  return (
    <div className="header_home">
      <Link to="/">
        <div className="header_home__img">
          <img
            src={process.env.PUBLIC_URL + "./logoCirc.png"}
            alt="logoF"
          ></img>
          <img
            src={process.env.PUBLIC_URL + "./logoLetras.png"}
            alt="logoF"
          ></img>
        </div>
      </Link>
      <NavHome/>
    </div>
  );
};

export default HeaderHome;
