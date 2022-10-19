import "./AdminLogin.css";

const AdminLogin = () => {
    return (
        <div className="AdminLogin">
            <form action="/admin/authenticate" method="post">
            <input id="email" name="email" type="email" placeholder="Email"/>
            <input id="password" name="password" type="password" placeholder="Password"/>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default AdminLogin;