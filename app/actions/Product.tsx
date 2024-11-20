
import axios from 'axios';


export default async function GetProduct(url:string,token:string) {
  
try {
    const resp=await axios.get(`http://localhost:8000/api/${url}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })!;
    return {status:200,'result':resp.data};
    
} catch (error) {
    console.log(error)
}


}

//this was also used to get Cart too

export async function single(url:string,token:string) {
  try {
    const resp=await axios.get(`http://localhost:8000/api/${url}`,{
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
  
        const resp=await axios.post(`http://localhost:8000/api/${url}`,data,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
      return {status:200,'result':resp.data};
      
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


export async function EditProductFunc(url:string,token:string,data:object) {
  try {

      const resp=await axios.put(`http://localhost:8000/api/${url}`,data,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
      })!;
    return {status:200,'result':resp.data};
    
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




export async function DeleteProduct(url:string,token:string) {


try {

  const resp=await axios.delete(`http://localhost:8000/api/${url}`,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});

return {status:200,'result':resp.data};

} catch (error:any) {


  return error
 

}
}


export async function cat(url:string,token:string) {
  try {
    const resp=await axios.get(`http://localhost:8000/api/${url}`,{
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
    const resp=await axios.get(`http://localhost:8000/api/${url}`);
 
    return {status:200,'result':resp.data};

    
} catch (error) {
    console.log(error)
}
}


export async function Indexcat(url:string) {
  try {
    const resp=await axios.get(`http://localhost:8000/api/${url}`);
 
    return {status:200,'result':resp.data};

    
} catch (error) {
    console.log(error)
}
 

}

export async function singleIndex(url:string) {
  try {
    const resp=await axios.get(`http://localhost:8000/api/${url}`);
    return {status:200,'result':resp.data};
    
} catch (error) {
    console.log(error)
}
 






}





