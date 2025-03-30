import axios from "axios";
const BASEURL='http://127.0.0.1:8000/api/';
//const BASEURL='https://zylerbackend.onrender.com/api/';

export async function AddReview(url:string,token:string,data:object) {
    try {
  
        const resp=await axios.post(`${BASEURL}${url}`,data,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
        });
      return {status:200,'result':resp.data};
      
      } catch (error: unknown) {
      
      
        console.log(error)
    
          if (axios.isAxiosError(error) && error.response) {
            return {status:422, 'error':error.response.data.errors};
          } else {
            return {status:422, 'error':'An unknown error occurred'};
          }
       
    
      }
      
}



export async function EditReviewAndRating(url:string,token:string,data:object) {
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

export  async function DeleteReviewController(token:string,url:string,data:{id: number|string}) {
 
  const Resp=await axios.post(`${BASEURL+url}`,data,{
   headers: {
       Authorization: `Bearer ${token}`,
     },
 })
 
 return Resp;
 
 
 
}