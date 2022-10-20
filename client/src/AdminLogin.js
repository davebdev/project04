import "./AdminLogin.css";

const AdminLogin = () => {
    return (
        <div className="AdminLogin">
            <h2 id="login-heading">Login</h2>
            <form id="admin-login-form" action="/admin/authenticate" method="post">
            <input id="email" name="email" type="email" placeholder="Email"/>
            <input id="password" name="password" type="password" placeholder="Password"/>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default AdminLogin;