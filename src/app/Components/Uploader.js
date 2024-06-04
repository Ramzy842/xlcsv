import React from "react";
import Image from "next/image";

const Uploader = () => {
    return (
        <div className=" w-56 flex flex-col items-center justify-center mx-auto mt-16 bg-black rounded-md py-4 px-2 drop-shadow-2xl">
            <p className="font-semibold mb-4 text-white">Drop Your Folder Here</p>
            <Image src={`./assets/upload.svg`} width={32} height={32} className="cursor-pointer" alt="upload"  />
        </div>
    );
};

export default Uploader;
