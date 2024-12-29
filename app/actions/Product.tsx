import axios from 'axios';


export default async function GetProduct(url:string,token:string) {
  
try {
    const resp=await axios.get(`https://zyler.cleverapps.io/api/${url}`,{
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
      const resp=await axios.delete(`https://zyler.cleverapps.io/api/${url}`,{
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
    const resp=await axios.get(`https://zyler.cleverapps.io/api/${url}`,{
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

export async function AddProductFunc(url:string,token:string,data:Record<string, unknown>) {
    try {
  
        const resp=await axios.post(`https://zyler.cleverapps.io/api/${url}`,data,{
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
      }
      
      }
      
}


export async function EditProductFunc(url:string,token:string,data:object) {
  try {

      const resp=await axios.put(`https://zyler.cleverapps.io/api/${url}`,data,{
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

  const resp=await axios.delete(`https://zyler.cleverapps.io/api/${url}`,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

return {'status':200,'result':resp.data};

} catch (error:unknown) {


  return error
 

}
}


export async function cat(url:string,token:string) {
  try {
    const resp=await axios.get(`https://zyler.cleverapps.io/api/${url}`,{
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
    const resp=await axios.get(`https://zyler.cleverapps.io/api/${url}`);
 
    return {status:200,'result':resp.data};

    
} catch (error) {
    console.log(error)
}
}


export async function Indexcat(url:string) {
  try {
    const resp=await axios.get(`https://zyler.cleverapps.io/api/${url}`);
 
    return {status:200,'result':resp.data};

    
} catch (error) {
    console.log(error)
}
 

}

export async function singleIndex(url:string) {
  try {
    const resp=await axios.get(`https://zyler.cleverapps.io/api/${url}`);
    return {status:200,'result':resp.data};
    
} catch (error) {
    console.log(error)
}
 






}





