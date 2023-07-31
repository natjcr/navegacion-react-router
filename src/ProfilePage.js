import React from "react";
import { AuthRoute, useAuth } from "./auth.js";


function ProfilePage() {
    const auth = useAuth();

    return(
        <>
            <h1>Perfil</h1>
            <p>Welcome, {auth.user.username}</p>
        </>        
    )
}

export { ProfilePage }