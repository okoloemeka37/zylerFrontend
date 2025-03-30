'use client'
import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState,useRef } from "react";
import { single } from '@/app/actions/Product';
import { DeleteController } from '@/app/actions/Auth';
import ButtonLoaders from "@/app/component/Loaders";
import Link from 'next/link'
import { useRouter } from "next/navigation";

const UsersPage = () => { 
  const router=useRouter();
 const { token, userCred, BASE_URL,setterURL } = useAuth()
    useEffect(() => {
      if (token==='') {
        setterURL(window.location.href)
        router.push(BASE_URL+"/auth/Login")
    }
    }, [token,router,userCred,BASE_URL,setterURL])



    
    const [users, setusers] = useState([{'name':'','email':'','phone':'','created_at':'','id':0}])
  const [searchTerm, setSearchTerm] = useState("");
  const [check, setCheck] = useState<{ id: string; name: string }[]>([]);
  const [message,setMessage]=useState('');
const [isDelModalOpen,setisDelModal]=useState(false);
const [isDeleted, setisDeleted] = useState(false)
 useEffect(() => {
  console.log(check)
 }, [check])
 
  
  useEffect(() => {
      
    const ret=async ()=>{
            const not=await single('getUser',token);
setusers(not?.result);
console.log(not?.result);
    }

    ret()
}, [token,userCred]);
const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal=()=>{
    setisDelModal(false)
  };

  const close = useRef<HTMLDivElement>(null)

  const DeleteUser=async()=>{
    setisDeleted(true)



const resp=await DeleteController(token,"DeleteUser",check)
if (resp.data.status==200) {
  setisDelModal(false)
  setusers(resp?.data.user);
  if (close.current) {
    close.current.style.display="block";
  }
  setMessage(resp?.data.message)
  setCheck([])
  setisDeleted(false)
   setTimeout(() => {
   if (close.current) {
     close.current.style.display="none"
   }
 
  }, 5000); 
}
  };
 
  const unS=()=>{

      document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
      });
      setCheck([])
    
  }
  const gn =()=>{
    const btn=document.querySelectorAll("input[type=checkbox]");
    btn.forEach((box)=>{
      box.addEventListener('change',()=>{
        const userName=box.getAttribute('data-gh')
        const userId=box.getAttribute('data-gi') || ''
        if ((box as HTMLInputElement).checked) {
          setCheck([...check,{id:userId,name:userName || ''}])
        }else{
         
          const filteredUsers = check.filter(user => user.id !== userId);
          //console.log(filteredUsers)
          setCheck(filteredUsers)
        }
      })
    })
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
       <div ref={close} className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          {message}
        </div> 
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold">All Customers</h1>
          <input
            type="text"
            placeholder="Search by name"
            className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={`optional ${check.length===0?'hidden':'flex'}`}>
<p>With Selected</p>
       <div>
       <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition duration-300" onClick={()=>{setisDelModal(true)}}> Delete</button>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300">Send Email</button>
        <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-400 transition duration-300" onClick={unS}>Unselect</button>

       </div>

        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-gray-600">
            <thead>
              <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-sm font-medium text-gray-800">Select</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Name</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Email</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Phone</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Joined</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-100 transition duration-300"
                  >
                    <td className="px-6 py-3"><input type="checkbox" data-gh={user.name} data-gi={user.id} onChange={()=>{gn()}} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    </td>
                    <td className="px-6 py-3"><Link href="">{user.name}</Link></td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{user.phone}</td>
                    <td className="px-6 py-3">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button className="text-blue-600 hover:underline">

                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                   
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

{/* modal */}

   {isDelModalOpen?
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-semibold text-gray-800">
        Confirm Delete
      </h2>
      <p className="mt-2 text-gray-600">
        Are you sure you want to delete <b>{check.map((val, index) => (<span key={index}>{val.name + ','}</span>))}</b>?
      </p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        {!isDeleted?<button
         /*  onClick={confirmDelete} */
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={DeleteUser}>
          Delete
        </button>:(<ButtonLoaders ty={'Deleting Users'} />)}
        
      </div>
    </div>
</div>


   :''}


  </div>
  );
};

export default UsersPage;
