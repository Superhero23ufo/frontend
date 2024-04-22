import { Link } from "react-router-dom";
import axios from "../../api/axios";

export const SignUp = () => {

  const handleRegister = async (event) => {
    // we will grab the username and password from the form and send it to the server
    const form = event.target;

    const username = form.username.value;
    const password = form.password.value;

    event.preventDefault();
    await axios.post('/users',{
      username,
      password
    }).then((response) => {
      console.log(response.data);
    }
    ).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="container-sm">
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div className="input-group mb-3">
          <input
            name="username"
            type="text"
            className="form-control"
            placeholder="username"
            aria-label="username"
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text" id="basic-addon2">
            username
          </span>
        </div>
        <div className="input-group mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="password"
            aria-label="password"
            aria-describedby="basic-addon2"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>

      </form>
      <Link to="/login"  className='btn btn-outline-secondary btn-sm' role="button">Already have an account?</Link>
    </div>
  );
};
