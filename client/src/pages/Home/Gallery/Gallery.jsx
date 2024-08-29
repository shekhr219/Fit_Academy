import React from "react";
import image1 from "../../../assets/gallery/image1.png";
import image2 from "../../../assets/gallery/image2.png";
import image3 from "../../../assets/gallery/image3.png";
import image4 from "../../../assets/gallery/image4.png";
import image5 from "../../../assets/gallery/image5.png";
const Gallary = () => {
  return (
    <div className="md:w-[100%] mx-auto my-28">
      <div className=" mb-16">
        <h1 className="text-5xl font-bold text-center">
          Our <span className="text-secondary"></span> Gallary
        </h1>
      </div>
      <div className="md:grid grid-cols-2 items-center justify-center border gap-4">
        <div className="mb-4 md:mb-0">
          <img src={image1} alt="" className="md:h-[720px] w-full mx-auto" />
        </div>
        <div className="gap-4 grid grid-cols-2 items-start">
          <div className="">
            <img src={image2} alt="" className="md:h-[350px]" />
          </div>
          <div>
            <img src={image3} alt="" className="md:h-[350px]" />
          </div>
          <div>
            <img src={image5} alt="" className="md:h-[350px]" />
          </div>
          <div>
            <img src={image4} alt="" className="md:h-[350px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
