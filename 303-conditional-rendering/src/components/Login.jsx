import React from "react";
import Input from "./Input";

function Login(props) {
    return (
        <form className="form">
            <Input inputType="text" inputPlaceholder="Username" />
            <Input inputType="password" inputPlaceholder="Password" />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;