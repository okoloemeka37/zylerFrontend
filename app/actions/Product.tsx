import axios from 'axios';
const BASEURL='https://zylerbackend.onrender.com/api/';
//const BASEURL='http://127.0.0.1:8000/api/';
export default async function GetProduct(url:string,token:string) {
  
try {
    const resp=await axios.get(`${BASEURL}${url}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })!;
    return {status:200,'result':resp.data};
    
} catch (error) {
    console.log(error)
}


}


export  async function Delete(url:string,token:string) {
  
  try {
      const resp=await axios.delete(`${BASEURL}${url}`,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
      })!;
      return {status:200,'result':resp};
      
  } catch (error) {
      console.log(error)
  }
  
  
  }
  

//this was also used to get Cart too

export async function single(url:string,token:string) {
  try {
    const resp=await axios.get(`${BASEURL}${url}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
    return {status:200,'result':resp.data};
    
} catch (error) {
    console.log(error)
}
 
}


//this is used as the addtocart function too and addproduct

export async function AddProductFunc(url:string,token:string,data:object) {
    try {
  
        const resp=await axios.post(`${BASEURL+url}`,data,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
        });
      return {status:200,'result':resp.data};
      
      } catch (error: unknown) {
      
      
        console.log(error)
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          return {status:422, 'error':error.response.data.errors};
        }
        if (error.response?.status === 401) {
          return {status:401, 'error':"Invalid Credentials"};
        }
        if (error.response?.status === 400) {
          return {status:400, 'error':"Upload Image Please"};
        }
      }
      
      }
      
}


export async function EditProductFunc(url:string,token:string,data:object) {
  try {

      const resp=await axios.put(`${BASEURL}${url}`,data,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
      })!;
    return {status:200,'result':resp.data};
    
    } catch (error: unknown) {
    
    
      console.log(error)
      if (axios.isAxiosError(error) && error.response?.status === 422) {
       return {"status":422,'error':error.response.data.errors}
      }
      if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {status:401,'error':"Invalid Credentials"}
    }
    
    }
    
}




export async function DeleteProduct(url:string,token:string) {


try {

  const resp=await axios.delete(`${BASEURL}${url}`,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

return {'status':200,'result':resp.data};

} catch (error:unknown) { console.log(error)
  return {'status':500,'result':error};

 

}
}


export async function cat(url:string,token:string) {
  try {
    const resp=await axios.get(`${BASEURL}${url}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
 
    return {status:200,'result':resp.data};

    
} catch (error) {
    console.log(error)
}
}


export async function catRelated(url:string) {
  try {
    const resp=await axios.get(`${BASEURL}${url}`);
 
    return {status:200,'result':resp.data};

    
} catch (error) {
    console.log(error)
}
}


export async function Indexcat(url:string) {
  try {
    const resp=await axios.get(`${BASEURL}${url}`);
 
    return {status:200,'result':resp.data};

    
} catch (error) {
    console.log(error)
}
 

}

export async function singleIndex(url:string) {
  try {
    const resp=await axios.get(`${BASEURL}${url}`);
    return {status:200,'result':resp.data};
    
} catch (error) {
    console.log(error)
}
 






}





