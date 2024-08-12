import React, { useState } from "react";

const Steps = () => {
    const [steps, setSteps] = useState([
        {
            id: 0,
            number: 1,
            title: "Upload xls/xlsx-file(s)",
            description:
                "Drag and drop your XLSX files, folders containing XLSX files, or a combination of both into the designated area.",
        },
        {
            id: 1,
            number: 2,
            title: 'Click on "Start conversion"',
            description:
                "Sit back and relax while the progress bar and loader keep you updated on the conversion.",
        },
        {
            id: 2,
            number: 3,
            title: "Download your CSV files",
            description:
                'Once converted, a list of your converted CSV files will appear, you can download each file individually by clicking the corresponding download icon next to each file. Alternatively, click the "Download All" button to get all the converted CSVs zipped into a single folder for easy download.',
        },
    ]);
    return (
        <ul className="bg-cyan flex justify-evenly ">
            {steps.map((step) => (
                <li key={step.id} className="p-4 mx-2 text-center w-3/4 max-w-lg flex flex-col items-center ">
                    <p className="text-green-600 font-semibold bg-black w-full mb-2 select-none">Step {step.number}</p>
                    <h1 className="text-teal-600 mb-2 font-bold w-full select-none">{step.title}</h1>
                    <p className="text-sm font-light text-gray-200 w-full select-none">{step.description}</p>
                </li>
            ))}
        </ul>
    );
};

export default Steps;
