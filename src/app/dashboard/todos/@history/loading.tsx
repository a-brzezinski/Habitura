import React from "react";

import { Spinner } from "@/components/shared/Spinner";

const Loading: React.FC = () => {
  return (
    <div className="loading-container flex w-1/2 items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
