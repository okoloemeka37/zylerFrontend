import React from 'react'

interface TopsProps {
  title: string;
}

export default function Tops({ title }: TopsProps) {
  return (
<div className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-right">{title}</div>
  )
}
