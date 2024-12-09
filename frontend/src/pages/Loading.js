import React from "react";
import { lineWobble } from "ldrs";

lineWobble.register();

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-center">
      <div>
        <l-line-wobble
          size="100"
          stroke="10"
          bg-opacity="0.1"
          speed="1.75"
          color="#334155"
        ></l-line-wobble>
      </div>
    </div>
  );
};

export default Loading;
