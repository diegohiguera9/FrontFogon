import "../styles/components/ListingContainer.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const ListingContainer = ({
  name,
  email,
  role,
  route,
  img,
  price,
  del,
  token,
  pay,
  created,
  print
}) => {
  const deleteCategory = async () => {
    try {
      await axios.delete(del, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const printResume = async () => {
    try {
      await axios.get(print, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="listingcontainer">
      <div
        style={{ display: img ? "flex" : "none" }}
        className="listingcontainer__img"
      >
        <div className="listingcontainer__img__cont">
          <img src={img} alt="imgdes"></img>
        </div>
      </div>
      <div className="listingcontainer__div">{`${name}`}</div>
      <div className="listingcontainer__div">{`${email}`}</div>
      <div
        style={{ display: role ? "block" : "none" }}
        className="listingcontainer__div"
      >{`${role}`}</div>
      <div
        style={{ display: price ? "block" : "none" }}
        className="listingcontainer__div"
      >{`$ ${new Intl.NumberFormat("de-DE").format(price)} COP`}</div>
      <div
        style={{ display: created ? "block" : "none" }}
        className="listingcontainer__div"
      >
        {created}
      </div>
      <Link to={route} className="listingcontainer__a">
        Edit
      </Link>
      <button
        className="listingcontainer__a"
        to={route}
        style={{ display: del ? "block" : "none" }}
        onClick={deleteCategory}
      >
        Delete
      </button>
      <Link
        style={{ display: pay ? "block" : "none" }}
        to={pay}
        className="listingcontainer__a"
      >
        Pagar
      </Link>
      <button
        className="listingcontainer__a"
        style={{ display: print ? "block" : "none" }}
        onClick={printResume}
      >
        Print
      </button>
    </div>
  );
};

export default ListingContainer;
