import { useState } from "react"
import "./Login.css"


function Login() {

    const [login, setLogin] = useState(true)
 
    return (
        <>
            <div className="login-container">
                {login && <div className="form-container">
                    <h1>Login</h1>
                    <form>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required={true} />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required={true} />
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <a id="signup-link" onClick={() => {setLogin(false)}}>Sign up</a></p>
                </div>}

                {!login && <div className="form-container" id="signup-form">
                <h1>Sign Up</h1>
                <form>
                    <label htmlFor="new-username">Username</label>
                    <input type="text" id="new-username" name="new-username" required={true} />
                    <label htmlFor="new-password">Password</label>
                    <input type="password" id="new-password" name="new-password" required={true} />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <a id="login-link" onClick={() => {setLogin(true)}}>Login</a></p></div>}
            </div>
        </>
    )
}

export default Login