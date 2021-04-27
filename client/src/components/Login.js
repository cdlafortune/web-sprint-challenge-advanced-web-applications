import React, {useState} from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChanges = e => {
    setCredentials({
      ...credentials, 
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);

    axios.post("http://localhost:5000/api/login", credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("Invalid credentials.");
        setIsLoading(false);
      });
      setCredentials({});
  };

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <h3 className="error-msg">{error}</h3>

      {isLoading ? (<h3>Loading...</h3>) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input 
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChanges}
          />
          <br/>

          <label htmlFor="Password">Password: </label>
          <input 
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChanges}
          />
          <br/>

          <button id="login-btn">Log In</button>
        </form>
      )}
    </div>
  );
};

export default Login;
