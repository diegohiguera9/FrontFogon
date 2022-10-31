import "../styles/components/Auth0Button.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth0Button = () => {
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      console.log('fetcing')
      const res = await axios.get("https://diegohtop24.herokuapp.com//user/token", {withCredentials:true});
      localStorage.setItem("token", res.data.token);
      navigate('pedido')
    } catch (err) {
      alert(err);
    }
  };

  const loginWithRedirect = async () => {
    const googleLoginURL = "https://diegohtop24.herokuapp.com/user/login/google";
    const newWindow = window.open(
      googleLoginURL,
      "_blanc",
      "width=500, height=600"
    );

    if (newWindow) {
      const timer = setInterval(() => {
        if (newWindow.closed) {
          fetchUser()
          if (timer) clearInterval(timer);
        }
      });
    }
  };

  return (
    <button className="auth0in" onClick={() => loginWithRedirect()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-google"
        viewBox="0 0 16 16"
      >
        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
      </svg>
      Google
    </button>
  );
};

export default Auth0Button;
