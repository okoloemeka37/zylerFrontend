
import axios from "axios";

//const BASEURL='http://127.0.0.1:8000/api/';
const BASEURL='https://zylerbackend.onrender.com/api/';
export default async function AuthController(data:object,url:string) {


try {
  
  const resp=await axios.post(`${BASEURL+url}`,data)!;
return {status:200,'result':resp};

} catch (error:unknown) {


  console.log(error)
if (axios.isAxiosError(error)) {
  if (error.response?.status == 422) {
    return {"status":422,'error':error.response.data.errors}
  }
  if (error.response?.status == 401) {
    return {status:401,'error':"Invalid Credentials"}
  }
} else {
  console.log(error);
  return {status:500,'error':'An unknown error occurred'};
}

}

}



export  async function LogoutController(token:string) {
 
    const Resp=await axios.post(`${BASEURL+"logout"}`,{},{
     headers: {
         Authorization: `Bearer ${token}`,
       },
   })
   
   return Resp;
   
   
   
}


export  async function UpdateController(url:string,data:object) {
 
  try {
  const resp=await axios.put(`${BASEURL+url}`,data)
 return {status:200,'result':resp};
}
 catch (error:unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status == 422) {
      return {"status":422,'error':error.response.data.errors}
    }
    if (error.response?.status == 404) {
      return {status:error.response.status,'error':error.response.data}
    }
  } else {
    console.log(error);
    return {status:500,'error':'An unknown error occurred'};
  }
 }

}
export  async function UpdateCont(url:string,data:object,token:string) {

  try {
  const resp=await axios.post(`${BASEURL+url}`,data,{
    headers: {
        Authorization: `Bearer ${token}`,
      }
  })
 return {status:200,'result':resp};
}
 catch (error:unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status == 422) {
      return {"status":422,'error':error.response.data.errors}
    }
    if (error.response?.status == 404) {
      return {status:error.response.status,'error':error.response.data}
    }
  } else {
    console.log(error);
    return {status:500,'error':'An unknown error occurred'};
  }
}
}

export  async function DeleteController(token:string,url:string,data:{id: number | string, name: string}[]) {
 
  const Resp=await axios.post(`${BASEURL+url}`,{data},{
   headers: {
       Authorization: `Bearer ${token}`,
     },
 })
 
 return Resp;
 
 
 
}



export  async function GetUserController(url:string,data:number) {
 
  const Resp=await axios.get(`${BASEURL+url}/${data}`)
 return Resp;

}



 

