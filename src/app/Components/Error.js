import Image from "next/image";
import React from "react";

const Error = ({ err }) => {
    return (
        <div className="flex items-center absolute right-4 top-20 bg-red-200 text-red-600 font-semibold px-4 py-2 border-b-2 border-red-500 drop-shadow-3xl text-sm">
          <Image src={`./assets/warning.svg`}
                width={24}
                height={24}
                className="select-none mr-2"
                alt="warning" />
            {err}
        </div>
    );
};

export default Error;
