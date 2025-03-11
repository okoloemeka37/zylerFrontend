import { useState } from "react";
import { HiTrash } from "react-icons/hi";

interface HandleImageSepProps {
  images: string;
  onUpdate: (remainingImages: string[]) => void;
}

export default function HandleImageSep({ images, onUpdate }: HandleImageSepProps) {
  const Img = images.split(",");
  const [removedImg, setRemovedImg] = useState<string[]>([]);

  const remove = (img: string): void => {
    const updatedRemovedImages = [...removedImg, img];
    setRemovedImg(updatedRemovedImages);
    onUpdate(Img.filter(image => !updatedRemovedImages.includes(image))); // Send remaining images to parent
  };

  const remainingImages = Img.filter(image => !removedImg.includes(image));

  return (
    <>
      {remainingImages.map((image, index) => (
        <div key={index} className="ml-4">
          <p className="w-fit cursor-pointer" onClick={() => remove(image)}>
            <HiTrash size={20} />
          </p>
          <img
            className="w-96 h-40"
            src={`https://raw.githubusercontent.com/okoloemeka37/ImageHolder/main/uploads/${image}`}
            alt={`Image ${index}`}
          />
        </div>
      ))}
    </>
  );
}
