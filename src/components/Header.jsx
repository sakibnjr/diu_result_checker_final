import { RiAiGenerateText } from "react-icons/ri";

import React from "react";

const Header = () => {
  return (
    <h1 className="text-xl md:text-3xl font-bold text-gray-800 text-center m-4 relative z-10">
      <RiAiGenerateText className="inline-block mr-2" /> Transcript Generator
    </h1>
  );
};

export default Header;
