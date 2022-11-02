import "../styles/components/ListingContainer.scss";
import { Link } from "react-router-dom";

const ListingContainer = ({ name, email, role, route }) => {
  return (
    <Link to={route} className="listingcontainer">
      <div>{`${name}`}</div>
      <div>{`${email}`}</div>
      <div style={{display:role?'block':'none'}}>{`${role}`}</div>
      <Link to={route}>Edit</Link>
    </Link>
  );
};

export default ListingContainer;
