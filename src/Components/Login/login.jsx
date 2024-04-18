import React from "react"
import { Link } from "react-router-dom"
function Login(){
    return(
        <div className="Signin">
        <div className="Signup">
            <h2>Sign In</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="name"><strong>Email</strong></label>
                    <input type="text" placeholder="Enter Email" name="name"
                    className ="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="text" placeholder="Enter Password" name="password"
                        className="form-control" />
                    </div>
                    <button type="submit" className="Reg-btn"> Log in</button>
                    <Link to='/register' className="btn-newuser">Register</Link>
            </form>
        </div>

    </div>
    )
}


export default Login