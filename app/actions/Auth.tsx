
import axios from "axios";



export default async function AuthController(data:object,url:string) {

try {
  
  const resp=await axios.post(`https://zyler.cleverapps.io/api/${url}`,data)!;
return {status:200,'result':resp};

} catch (error:any) {


  console.log(error)
  if (error.status == 422) {
   return {"status":422,'error':error.response.data.errors}
  }
  if (error.status ==401) {
  return {status:401,'error':"Invalid Credentials"}
}

}

}



export  async function LogoutController(token:string) {
 
    const Resp=await axios.post("https://zyler.cleverapps.io/api/logout",{},{
     headers: {
         Authorization: `Bearer ${token}`,
       },
   })
   
   return Resp;
   
   
   
}


export  async function UpdateController(url:string,data:object) {
 
  try {
  const resp=await axios.put(`https://zyler.cleverapps.io/api/${url}`,data)
 return {status:200,'result':resp};
}
 catch (error:any) {

  if (error.status == 422) {
   return {"status":422,'error':error.response.data.errors}
  }
  if (error.status == 404) {
  return {status:error.status,'error':error.response.data}
}

 }

}
export  async function UpdateCont(url:string,data:object,token:string) {
 
  try {
  const resp=await axios.post(`https://zyler.cleverapps.io/api/${url}`,data,{
    headers: {
        Authorization: `Bearer ${token}`,
      }
  })
 return {status:200,'result':resp};
}
 catch (error:any) {

  if (error.status == 422) {
   return {"status":422,'error':error.response.data.errors}
  }
  if (error.status == 404) {
  return {status:error.status,'error':error.response.data}
}

}
}



 

