import "./Login.css"

function Login() {
    return (
        <>
            <div className="container">
                <div className="form-container" id="login-form">
                    <h1>Login</h1>
                    <form>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required={true} />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required={true} />
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <a href="#" id="signup-link">Sign up</a></p>
                </div>

                <div className="form-container" id="signup-form" style={{ display: "none" }} />
                <h1>Sign Up</h1>
                <form>
                    <label htmlFor="new-username">Username</label>
                    <input type="text" id="new-username" name="new-username" required={true} />
                    <label htmlFor="new-email">Email</label>
                    <input type="email" id="new-email" name="new-email" required={true} />
                    <label htmlFor="new-password">Password</label>
                    <input type="password" id="new-password" name="new-password" required={true} />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <a href="#" id="login-link">Login</a></p>
            </div>
        </>
    )
}

export default Login