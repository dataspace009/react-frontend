import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decoded from "jwt-decode"
import { useNavigate } from "react-router";
const baseURL = process.env.URL;

const Dashboard = ({ name, setUserName }) => {
  const navigate = useNavigate();
  const [tokenResult, setTokenResult] = useState('')

  const token = localStorage.getItem('userToken')

  const getUerDataFromServerToken = () => {
    if (localStorage.userToken) {
      axios.post(`${baseURL || 'http://localhost:5000/api/'}users/getdata`, { token: token })
        .then(res => {
          setTokenResult(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      navigate('/login')
    }
  }

  const getUserByToken = () => {

    if (localStorage.userToken) {

      if(localStorage.userToken.exp < Date.now()/1000) {
        localStorage.removeItem('userToken');
      }
      const decoded = jwt_decoded(localStorage.userToken);
      console.log('aaa', decoded);
      setUserName(decoded.name);
    }
  }

  useEffect(() => {
    getUerDataFromServerToken();
  }, [])

  useEffect(() => (
    getUserByToken()
  ), [])

  return (
    <>
      <div className="flex flex-col items-center">

        <h1 className="">Dashboard</h1>
        <h1>Welcome</h1>

        <h4>Token decoded result at server</h4>
        <p>{tokenResult.name}</p>
        <p>{tokenResult.email}</p>
      </div>


    </>
  );
};

export default Dashboard;
