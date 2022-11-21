import React from "react";


const Story = ({ img, username }) => {
  return (
    <div className="">
      <img
        src={img}
        alt={username}
        className="rounded-full w-14 h-14 p-[1.5px] hover:scale-110 transition transform duration-200 easeo=-out cursor-pointer"
      />
      <p className="text-xs w-14 truncate text-white text-center font-bold">
        {username}
      </p>
    </div>
  );
};

export default Story;
