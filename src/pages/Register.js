
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [error, setError] = useState("");

  const registerData = {
    name: name,
    email: email,
    password: password,
    password2: password2,
  };


  const register = () => {
    console.log(registerData);
    axios
      .post("http://localhost:5000/api/users/register", registerData)
      .then((res) => {

        if (res.data.success === true) {
          setName('');
          setEmail('');
          setPassword('');
          setPassword2('');
          navigate(`/login/${email}`);
        } else {
          setError(res.data.message);
          console.log(res.data);
        }


      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <div className="w-[100%]" >
        <div className="r">
          <h4 className='title'>Please input your infomation</h4>

          <p className="" style={{ color: "red" }}>
            {error}
          </p>

          <div className="">
            <div className="input-group">
              <h4>Name</h4>
              <input
                className='text-white'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="i.e. KUT"
              />
            </div>
            <div className="input-group">
              <h4>Email</h4>
              <input
                className='text-white'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="i.e. kut@it.com"
              />
            </div>
            <div className="input-group">
              <h4>Password</h4>
              <input
                className='text-white'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
              />
            </div>
            <div className="input-group">
              <h4>Confirm Password</h4>
              <input
                className='text-white'
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="*********"
              />
            </div>
          </div>

          <button className="btn btn-primary " onClick={register}>CONTINE</button>
          <p className="link">Alrady An Account? <Link to='/login'>Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default Register;