import React from "react";

/*
Tick Component
Used for input in several modals.
*/

const Tick: React.FC = () => {
    return (
        <div className="w-full h-full grid place-items-center">
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                />
            </svg>
        </div>
    );
};

export default Tick;
