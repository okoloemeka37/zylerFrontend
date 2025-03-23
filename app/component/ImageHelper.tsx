import React,{useRef} from 'react'

interface ImageHelperProps {
  Product: { image: string };
  height: number|string;
  width: number|string;
  count: number;
}

export default function ImageHelper({ Product, height, count,width }: ImageHelperProps) {

   
  const images=Product.image;
  const image=images.split(',');
 

    const ChIm = useRef<HTMLImageElement>(null)
    const handleLoad = () => {
  
      if (ChIm.current) {
        ChIm.current.style.display = 'none'
        
      }
    }
  return (
    <div>
   
        <img src={`https://raw.githubusercontent.com/okoloemeka37/ImageHolder/main/uploads/${count <image.length? image[count]:image[1]}`}
  alt="Product Image"
  className={`w-${width} h-${height} object-cover transition-transform duration-500 transform group-hover:scale-105`}
  onLoad={handleLoad}
/>
<img src="/spin.gif" alt="" ref={ChIm}/>
    </div>
  )
}
