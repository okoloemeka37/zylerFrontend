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


export const Addfield = (morefields: React.RefObject<HTMLDivElement>,type:string) => {

    const df=document.createElement("div");

   const fieldName=document.createElement("input");
    fieldName.type='text';
    fieldName. className="border-b-1 border-gray-300 focus:outline-none mb-1 focus:border-gray-500 na"
    fieldName.placeholder="Enter Field Name";
df.appendChild(fieldName);
   let val;
    if(type==='list'){
         val=document.createElement("textarea");
         val.placeholder=`separate list with commas`;
    }else{
        val=document.createElement("input");
        val.type=type;
        val.placeholder=`Enter Value Data of ${type}`;
    }
   
    val.className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 val";
   
    val.value="";
    const cancel=document.createElement("span");
cancel.innerHTML="X";
cancel.className="cursor-pointer text-red-500 mt-2";
cancel.onclick=() => {
    if (morefields.current) {
        morefields.current.removeChild(nm);
    }
};

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

export function highlights(dat:{ 'id': number,'Description':string, 'name': string, 'price': number, 'stock': number, 'image': string, 'category': string, 'tag': string  }) {  
  const hig=dat['Description'].split(',');
  return (
    <>
      {hig.map((val,index) => (
        <div key={index}>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>{val}</li>
       
      </ul>
      </div>
      ))}
    </>
  );
}

interface DynamicHlightsProps {
    text: string;
}

export function DynamicHlights({ text }: DynamicHlightsProps) {  
    const hig = text.split(',');
    return (
        <> 
         <div className="w-full max-w-xs" >
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select Color</label>
            <select id="category" className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" disabled selected>Select an option</option>
            {hig.map((val, index) => (
                <option key={index} value="clothing">{val}</option>    
            ))}
                </select>
        </div>
        </>
    );
}