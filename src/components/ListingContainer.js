import "../styles/components/ListingContainer.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const ListingContainer = ({ name, email, role, route, img, price, del,token }) => {
  const deleteCategory = async()=>{
    try{
      await axios.delete(del,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      window.location.reload()
    } catch(err){
      alert(err)
    }
  }
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
      <Link  to={route} className="listingcontainer__a">
        Edit
      </Link>
      <button className="listingcontainer__a" to={route} style={{ display: del ? "block" : "none" }} onClick={deleteCategory}>
        Delete
      </button>
    </div>
  );
};

export default ListingContainer;
