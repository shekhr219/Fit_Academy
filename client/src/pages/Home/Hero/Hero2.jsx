import React from "react";
import banner2 from "../../../assets/home/banner2.jpg";
const Hero2 = () => {
  return (
    <div
      className="min-h-screen  bg-cover"
      style={{ backgroundImage: `url(${banner2})` }}
    >
      <div className="min-h-screen flex justify-start pl-11 text-white items-center bg-black bg-opacity-60">
        <div className="">
          <div className="space-y-4">
            <h1 className="md:text-7xl text-4xl font-bold ">
              Breathe, Move, Thrive – Find Your Balance with Us
            </h1>
            <div className="md:w-1/2">
              <p className="">
                We offer unparalleled support to help you thrive in every aspect
                of wellness. Whether it’s achieving your fitness goals,
                mastering yoga, or embracing a healthier lifestyle through
                nutrition, we are here to guide you every step of the way with
                creativity and care
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase">
                Join Today
              </button>
              <button className="px-7 py-[10px] bg-opacity-80 hover:bg-white hover:text-black hover:outline-white duration-200  rounded-lg bg-transparent outline  font-bold uppercase">
                View Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
