import Link from 'next/link'
import React from 'react'

export default function TableData({products}) {
  console.log(products)
  return (
 
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

     {
      products.map((product)=>(
        <tr className="bg-base-200"  key={product.id}>
        <th>{product.id}</th>
        <td><Link href={`../product/ViewProduct/${product.id}`}>{product.name} </Link></td>
        <td>{product.Description}</td>
        <td><button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-error">Error</button>
        </td>
      </tr>
      ))
     }
      </tbody>

    </table>
    </div>
  )
}
