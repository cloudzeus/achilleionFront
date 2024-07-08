import React from "react";
import SliderCard from "./slider-card";

function Slides({ data }) {
  return (
    <div className=" flex w-full gap-6">
      {data.map((data, index) => {
        return <SliderCard key={`slides-dsfsdfs453453-${index}`} data={data} />;
      })}
    </div>
  );
}

export default Slides;
