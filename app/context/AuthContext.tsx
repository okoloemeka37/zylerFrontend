'use client'

import React, {createContext,useContext,useState,useEffect  } from "react";
import { useRouter  } from 'next/navigation'




const AuthContext=createContext<{
    isAuthenticated: boolean;
    login: (token: string, data: { name: string; email: string; status: 'Admin' | 'Seller' | string; id: string;  review:[];products:[]; carts: []; orders: []; phone: string; address: string,image:string,created_at:string }) => void;
    logout: () => void;
userCred: {name: string, email: string, status: string, id: string, carts: [], orders: [], review:[],products:[], phone: string, address: string,image:string,created_at:string}; 
    token: string;
    prevURL:string;
    BASE_URL: string;
    setterURL:(url:string)=>void;
    User: (data: { name: string, email: string, status: string, id: string, carts: [], orders: [],  review:[],products:[], phone: string, address: string,image:string,created_at:string }) => void;
}>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    userCred: {name: '', email: '', status: '', id: '', carts: [], orders: [], review:[],products:[], phone: '', address: '',image:'',created_at:''},
    token: '',
    prevURL:'',
    setterURL:()=>{},
    BASE_URL: "",
    User: () => {}
})

export function AuthProvider({ children }:{children:React.ReactNode}) {
    const router=useRouter();
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userCred, setuserCred] = useState<{name: string, email: string, status: string, id: string, review:[],products:[], carts: [], orders: [], phone: string, address: string,image:string,created_at:string}>({name:'',email:'',status:'',id:'',carts:[],orders:[] , review:[],products:[],phone:'', address:'',image:'',created_at:''});
    const [token, setToken] = useState<string>('')
    const [prevURL,setPrevURL]=useState<string>('http://localhost:3000/')
    const [BASE_URL] = useState('http://localhost:3000/') //https://zylerfrontend.onrender.com

    useEffect(() => {
      const token=localStorage.getItem("Token")!;
        if (token){
            const user=JSON.parse(localStorage.getItem('user')!);
            setAuthenticated(true);
            setToken(token);
            setuserCred(user)
        };
     
    }, [])

    const login=(token:string, data: { name: string, email: string, status: 'Admin' | 'Seller' | string, id: string, review:[], products:[], carts:[], orders:[], phone: string, address: string,image:string,created_at:string })=>{
localStorage.setItem('Token',token);
localStorage.setItem("user",JSON.stringify(data));
setAuthenticated(true);
setuserCred(data);
setToken(token);


    router.push(prevURL)

    }

    const logout=()=>{
        localStorage.removeItem('Token');
        localStorage.removeItem('user');
        setAuthenticated(false);
        setToken('');
        setuserCred({name:'',email:'',status:'',id:'',carts:[],orders:[], review:[],products:[],phone:'', address:'',image:'string',created_at:''});

    }
    const  User=(data:{name: string, email: string, status: string, id: string, carts: [], orders: [], review:[],products:[], phone: string, address: string,image:string,created_at:string})=> {
        localStorage.setItem("user",JSON.stringify(data));
        setuserCred(data);
    }
    
    const setterURL=(url:string)=>{
            setPrevURL(url)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,userCred,token,BASE_URL,User,prevURL,setterURL}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext);  
}