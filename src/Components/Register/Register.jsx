/* TODO - add your code to create a functional React component that renders a registration form */


/* TODO - add your code to create a functional React component that renders a registration form */
import {useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register({user, setUser, token, setToken}) {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const API_URL = "https://fakestoreapi.com";

  async function Submit(email) {
    email.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: JSON.stringify( {
            email:'John@gmail.com',
            username:'johnd',
            password:'m38rmF$',
            name:{
                firstname:'John',
                lastname:'Doe'
            },
            address:{
                city:'kilcoole',
                street:'7835 new road',
                number:3,
                zipcode:'12926-3874',
                geolocation:{
                    lat:'-37.3159',
                    long:'81.1496'
                }
            },
            phone:'1-570-236-7033'
        }
    )
}).then(res=>res)
      const result = await response.json();
      if (result.message === "Registration successful") {
        setUser(`${registerData.email}`);
        setToken(result.token);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {token ? (
        <h1>Logged in as {user}</h1>
      ) : (
        <div className="login">
          <h1>Register</h1>
          <form>
            
              <label htmlFor={"first-name"} className="firstName">
              First Name:{" "}
              <input
                onChange={(email) => {
                  setRegisterData({
                    firstName: email.target.value,
                    lastName: registerData.lastName,
                    email: registerData.email,
                    password: registerData.password,
                  });
                }}
                type={"text"}
                name={"first-name"}
                value={registerData.firstName}
              />
            </label>
            {/* last name */}
            <label htmlFor={"last-name"} className="lastName">
              Last Name:{" "}
              <input
                onChange={(email) => {
                  setRegisterData({
                    firstName: registerData.firstName,
                    lastName: email.target.value,
                    email: registerData.email,
                    password: registerData.password,
                  });
                }}
                type={"text"}
                name={"last-name"}
                value={registerData.lastName}
              />
            </label>
            {/* email */}
            <label htmlFor={"email"} className="email">
              Email address:{" "}
              <input
                onChange={(email) => {
                  setRegisterData({
                    firstName: registerData.firstName,
                    lastName: registerData.lastName,
                    email: email.target.value,
                    password: registerData.password,
                  });
                }}
                type={"email"}
                name={"email"}
                value={registerData.email}
              />
            </label>
            {/* password */}
            <label htmlFor={"password"} className="password">
              Password:{" "}
              <input
                onChange={(email) => {
                  setRegisterData({
                    firstName: registerData.firstName,
                    lastName: registerData.lastName,
                    email: registerData.email,
                    password: email.target.value,
                  });
                }}
                type={"password"}
                name={"password"}
                value={registerData.password}
              />
            </label>
           
            <button onClick={Submit}>Register</button>
          </form>
          
          <p>If you already has an account, just log in</p>
          <button onClick={() => navigate("/login")}>Log in</button>
        </div>
      )}
    </>
  );
}
