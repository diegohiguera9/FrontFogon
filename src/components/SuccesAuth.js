import { useEffect} from "react";

const SuccesAuth = () => {

  useEffect(() => {
    setTimeout(() => {
      window.close();
    });
  }, []);

  return <div>Thaks for loginin, wait for redirecting</div>;
};

export default SuccesAuth;
