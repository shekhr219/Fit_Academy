import React from "react";
import { useTitle } from "../../hooks/useTitle";
import Map from "./Map/Map";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstructor from "./PopularTeacher/PopularInstructor";
import HeroContainer from "./Hero/HeroContainer";
import Gallery from "./Gallery/Gallery";

const Home = () => {
  useTitle("Home | Fit Academy - Unleash Your Inner Self");
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallery />
        <PopularClasses />

        <PopularInstructor />
      </div>
      <Map />
    </section>
  );
};

export default Home;
