'use client'

import React, {createContext,useContext,useState,useEffect  } from "react";


const AuthContext=createContext({
    isAuthenticated:false,
    login:(token:string,data:[])=>{},
    logout:()=>{},
    userCred:[],
    token:''
})

export function AuthProvider({ children }:{children:React.ReactNode}) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userCred, setuserCred] = useState([]);
    const [token, setToken] = useState('')

    useEffect(() => {
      const token=localStorage.getItem("Token")!;
        if (token){
            const user=JSON.parse(localStorage.getItem('user')!);
            setAuthenticated(true);
            setToken(token);
            setuserCred(user)
        };
     
    }, [])

    const login=(token:string,data:[])=>{
localStorage.setItem('Token',token);
localStorage.setItem("user",JSON.stringify(data));
setAuthenticated(true);
setuserCred(data);
setToken(token);
    }

    const logout=()=>{
        localStorage.removeItem('Token');
        localStorage.removeItem('user');
        setAuthenticated(false);
        setToken(null);
        setuserCred([]);

    }
    

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,userCred,token}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext);  
}