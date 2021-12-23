import React, { createContext, useState } from "react"

export const AuthContext = createContext();

const AuthProvider = props => {
    const [authState, setAuthState] = useState(null);

    return (
        <AuthContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthProvider
