import { useState } from "react";
import { ProductObject } from "../../lib/types/types";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
type CardProps = {
  data: ProductObject[];
};

const Card = ({ data }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [productIndex, setProductIndex] = useState(0);

  function handleLeftClick() {
    setProductIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  }

  function handleRightClick() {
    setProductIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  }

  function handleClick() {
    window.open(data[productIndex].productLink, "_blank");
  }

  return (
    <div className="my-auto mx-1 w-1/6 flex flex-col items-center">
      <div
        className="w-full p- bg-white shadow-lg rounded-md relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={data[productIndex].imageURL}
          alt="placeholder"
          className="w-full h-auto rounded-md object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-75 text-white">
            <h3 className="font-semibold text-md mb-10">{data[productIndex].itemName}</h3>
            <p className="  text-xs mb-0">Designed By:</p>
            <p className=" text-lg mb-8 mx-2">{data[productIndex].designerName}</p>
            <button
              onClick={handleClick}
              className="bg-white text-black py-2 px-6 rounded-full border-2 border-black transition-all duration-300 hover:bg-black hover:text-white"
              style={{ opacity: 0.9 }}
            >
              Buy
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-1 mb-4">
        <button
          onClick={handleLeftClick}
          className="bg-transparent text-black py-2 px-0 mr-2 rounded-full  border-black transition-all duration-300 hover:bg-black hover:text-white"
          style={{ opacity: 0.9 }}
        >
         <ArrowBackIosIcon />

        </button>
        <button
          onClick={handleRightClick}
          className="bg-transparent text-black py-2 px-0 mr-2 rounded-full  border-black transition-all duration-300 hover:bg-black hover:text-white"
          style={{ opacity: 0.9 }}
        >
          <ArrowForwardIosIcon/>
        </button>
      </div>
    </div>
  );
};

export default Card;
