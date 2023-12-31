import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Api/Context/AuthProvider";
import axios from "../Api/axios";
import { useDispatch } from "react-redux";
import { USER } from "../../Redux/ActionType";
const LOGIN_URL = "/api/auth/login";

const Login = () => {
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USE_NAVIGATE, USE_SELECTORE, USE_STATE, USE_DISPATCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const { setAuth }: any = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USE_NAVIGATE, USE_SELECTORE, USE_STATE, USE_DISPATCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FUNZIONI DEL COMPONENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    userRef.current?.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    if (success) {
      navigate("/");
      setSuccess(false);
    }
  }, [success]);

  // Spedizione dati
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const id = response?.data?.id;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ id, user, pwd, roles, accessToken });
      dispatch({
        type: USER,
        payload: { id, username: user, accessToken, roles },
      });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error: any) {
      setErrMsg(error?.response?.data.message);
      errRef.current?.focus();
    }
  };
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FUNZIONI DEL COMPONENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <div className="myRegister">
      {success ? (
        <section>
          <h1 className="text-3xl my-4 font-bold">You are logged in!</h1>
          <br />
          <p>
            <Link to={"/"} className="text-blue-700">
              Go to Home
            </Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-3xl my-4 font-bold">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              ref={userRef}
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              placeholder="Password"
              required
            />{" "}
            <br />
            <button
              className={user && pwd ? "formButtonsOk" : "formButtons"}
              disabled={!user || !pwd ? true : false}
            >
              Sign In
            </button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to={"/register"} className="text-blue-700">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
