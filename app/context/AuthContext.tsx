'use client'

import React, {createContext,useContext,useState,useEffect  } from "react";
import { useRouter  } from 'next/navigation'



const AuthContext=createContext({
    isAuthenticated:false,
    login:(token:string,data:[])=>{},
    logout:()=>{},
    userCred:[],
    token:'',
    'BASE_URL':"",
    User:(data:object)=>{}
})

export function AuthProvider({ children }:{children:React.ReactNode}) {
    const router=useRouter();
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userCred, setuserCred] = useState([]);
    const [token, setToken] = useState('')
    const [BASE_URL, setBASE_URL] = useState('http://localhost:3000/')

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

if (data['status']!== "Admin") {
    router.push(`${BASE_URL}user/Profile`)
}else{
    router.push(`${BASE_URL}Admin/Profile`)
}
    }

    const logout=()=>{
        localStorage.removeItem('Token');
        localStorage.removeItem('user');
        setAuthenticated(false);
        setToken(null);
        setuserCred([]);

    }
    const  User=(data:object)=> {
        localStorage.setItem("user",JSON.stringify(data));
        setuserCred(data);
    }
    

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,userCred,token,BASE_URL,User}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext);  
}