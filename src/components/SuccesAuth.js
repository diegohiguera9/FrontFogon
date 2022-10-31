import { useEffect} from "react";
import { useParams } from "react-router-dom";

const SuccesAuth = () => {
  const params = useParams();
  if(params.id){
    localStorage.setItem('token',params.id)
  }
  useEffect(() => {
    setTimeout(() => {
      window.close();
    });
  }, []);

  return <div>Thaks for loginin, wait for redirecting</div>;
};

export default SuccesAuth;
