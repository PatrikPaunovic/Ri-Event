import React, { useState, useEffect } from 'react';
import { json, Link } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await axios.get('/sanctum/csrf-cookie', {
  //         withCredentials: true,
  //       });
  //       setCsrfToken(response.data.csrfToken);
  //       console.log('CSRF token received:', response.data.csrfToken);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCsrfToken();
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      setCsrfToken(response.data.csrfToken);
      console.log('CSRF token received:', response.config.headers["X-XSRF-TOKEN"]);
       await axios.post('/login', {
       username,
       password,
     }, {
         headers: {
           'X-XSRF-TOKEN': response.config.headers["X-XSRF-TOKEN"],
           'Accept':"application/json",
           'Access-Control-Allow-Origin' : '*'

         },
         withCredentials: true,
       });
      console.log('Login successful!');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='Login-div'>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {loading ? <BeatLoader /> : <button type="submit">Login</button>}
      </form>
    </div>
  );
}

export default Login;
