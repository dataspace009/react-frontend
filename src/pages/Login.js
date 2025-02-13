import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setLogin }) => {

  const Logined = (token) => {
    // console.log(token);
    localStorage.setItem('userToken', token);

  };

  const setToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { signEmail } = useParams();

  const userDate = {
    email: email,
    password: password,
  };

  // useEffect(() => {
  //   setEmail(signEmail);
  // }, [signEmail]);  

  const login = () => {
    console.log(userDate);
    axios
      .post("http://192.168.144.144:5000/api/users/login", userDate)
      .then((res) => {
        if (res.data.success === true) {
          Logined(res.data.token);
          navigate('/dashboard');
        } else {
          setError(res.data.message);
          console.log(res.data.success);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="page">

        <div className="sign-page">
          <h5 className="title text-white">Please sign in with your Account</h5>

          <p className="" style={{ color: "red" }}>
            {error}
          </p>

          <div className="text-white">
            <div className="input-group">
              <h4>Email</h4>
              <input
                className="text-white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="i.e. kut@it.com"
              />
            </div>
            <div className="input-group">
              <h4>Password</h4>
              <input
                className="text-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
              />
            </div>
          </div>

          <button className="btn btn-secondary " onClick={login}>LOGIN</button>
          <p className="link">Don't Have An Account? <Link to='/register'>Sign Up</Link></p>

        </div>
      </div>
    </>
  );
};

export default Login;
