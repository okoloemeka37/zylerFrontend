import React from 'react'
import { HiTrash } from "react-icons/hi";
import Image from "next/image";
export default function fakeClick(mainclick: React.RefObject<HTMLInputElement>) {
   
        if (mainclick.current) {
          mainclick.current.click()
        }
      
}
 

interface RenderProps {
    source:string[];
    remove: (index: number) => void;
}

export const Render: React.FC<RenderProps> = ({ source, remove }) => {
    return source.map((photo, ind) => (
        <div key={ind} className="ml-5">
            <p onClick={() => remove(ind)}>  <HiTrash size={20} /> Remove</p>
            <Image src={photo} alt="" width={300} height={300} className="Impl" />
        </div>
    ));
};

interface ChangeProps {
    e: React.ChangeEvent<HTMLInputElement>;
    setFiles: React.Dispatch<React.SetStateAction<string[]>>;
    setimage: React.Dispatch<React.SetStateAction<File[]>>;
}

export const Change: React.FC<ChangeProps> = ({ e, setFiles, setimage }) => {
    setFiles([]);
    if (e.target.files) {
        const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        setFiles((prev) => prev.concat(fileArray));
        setimage(Array.from(e.target.files));
    }
    return null;
};


export const Addfield = (morefields,type:string) => {

    const df=document.createElement("div");

   const fieldName=document.createElement("input");
    fieldName.type='text';
    fieldName. className="border-b-1 border-gray-300 focus:outline-none mb-1 focus:border-gray-500 na"
    fieldName.placeholder="Enter Field Name";
df.appendChild(fieldName);
    const val=document.createElement("input");
    val.type=type;
    val.className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 val";
    val.placeholder=`Enter Value Data of ${type}`;
    val.value="";
    const cancel=document.createElement("span");
cancel.innerHTML="X";
cancel.className="cursor-pointer text-red-500 mt-2";
cancel.onclick=()=>morefields.current.removeChild(nm);

const gh=document.createElement('div');
gh.appendChild(val);
gh.appendChild(cancel);
gh.className="flex justify-between";
    const nm=document.createElement("div");
    nm.className='dynamic-field'
    nm.appendChild(df);
    nm.appendChild(gh);
    
if (morefields.current) {
    morefields.current.append(nm)
}
}