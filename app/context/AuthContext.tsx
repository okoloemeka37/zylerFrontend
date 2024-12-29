'use client'

import React, {createContext,useContext,useState,useEffect  } from "react";
import { useRouter  } from 'next/navigation'



const AuthContext=createContext<{
    isAuthenticated: boolean;
    login: (token: string, data: { name: string; email: string; status: string; id: string; carts: []; orders: []; phone: string; address: string,image:string }) => void;
    logout: () => void;
userCred: {name: string, email: string, status: string, id: string, carts: [], orders: [], phone: string, address: string,image:string}; 
    token: string;
    BASE_URL: string;
    User: (data: { name: string, email: string, status: string, id: string, carts: [], orders: [], phone: string, address: string,image:string }) => void;
}>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    userCred: {name: '', email: '', status: '', id: '', carts: [], orders: [], phone: '', address: '',image:''},
    token: '',
    BASE_URL: "",
    User: () => {}
})

export function AuthProvider({ children }:{children:React.ReactNode}) {
    const router=useRouter();
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userCred, setuserCred] = useState<{name: string, email: string, status: string, id: string, carts: [], orders: [], phone: string, address: string,image:string}>({name:'',email:'',status:'',id:'',carts:[],orders:[],phone:'', address:'',image:''});
    const [token, setToken] = useState<string>('')
    const [BASE_URL] = useState('http://localhost:3000/')

    useEffect(() => {
      const token=localStorage.getItem("Token")!;
        if (token){
            const user=JSON.parse(localStorage.getItem('user')!);
            setAuthenticated(true);
            setToken(token);
            setuserCred(user)
        };
     
    }, [])

    const login=(token:string, data: { name: string, email: string, status: string, id: string, carts:[], orders:[], phone: string, address: string,image:string })=>{
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
        setToken('');
        setuserCred({name:'',email:'',status:'',id:'',carts:[],orders:[],phone:'', address:'',image:'string'});

    }
    const  User=(data:{name: string, email: string, status: string, id: string, carts: [], orders: [], phone: string, address: string,image:string})=> {
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