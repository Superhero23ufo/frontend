import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../api/axios";

export default function Login({ user, setUser, token, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submit = (ev) => {
    ev.preventDefault();
    login({ email, password });
  };


  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        body: {
           email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        // window.localStorage.setItem("token", result.token);
        setSuccessMessage("Login success");
      } else {
        setError("Failed to login. Please use correct password or register");
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken({});
  };

  return (
    <>
      {!token ? (
        <div>
          <h1>Login</h1>
          {error && <p>{error}</p>}
          {successMessage && <p>{successMessage}</p>}
          <form className="form" onSubmit={submit}>
            <label htmlFor={"email"} className="email">
              Email address:{" "}
              <input
                type={"email"}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </label>
            <label htmlFor={"password"} className="password">
              Password:{" "}
              <input
                type={"password"}
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </label>
            <button disabled={!email || !password}>Login</button>
          </form>
          <p>Forget password?</p>
          <button onClick={() => navigate("/forgotpassword")}>
            Password reset
          </button>
          <p>Don't have an account yet?</p>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      ) : (
        <div>
          <h1>Logged in as {user}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
}