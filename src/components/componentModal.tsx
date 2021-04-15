import React, { useEffect } from "react";
import Button from "./componentButton";

/*
Modal Component
Most transitions take place via a modal.
This component takes care of the basic Modal functionality.
The title, button, dismiss button, overlay, are part of this component.
The children passed to this component are the content in the modal.
The onClick function will be called when the main button is clicked.
*/

type props = {
    title: string;
    children: JSX.Element | JSX.Element[];
    setVisible(visible: boolean): void;
    visible: boolean;
    buttonText: string;
    onClick(): void;
};

const Modal: React.FC<props> = (props) => {
    const { title, children, setVisible, visible, buttonText, onClick } = props;

    useEffect(() => {
        document.onkeydown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();
                onClick();
            }
        };
    }, []);

    return (
        <div
            className={
                "w-screen h-screen bg-black bg-opacity-25 fixed top-0 left-0 z-20 transition-all"
            }
            style={
                visible
                    ? {
                          opacity: 1,
                          visibility: "visible",
                          transform: "translateY(0)",
                      }
                    : {
                          opacity: 0,
                          visibility: "hidden",
                          transform: "translateY(30px)",
                      }
            }
            onClick={() => setVisible(false)}
        >
            <div className="w-full h-full flex justify-center items-center px-4 lg:px-2 py-2">
                <div
                    className="w-full lg:w-1/3 bg-white shadow-xl rounded-2xl max-h-full flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-8">
                        <p className="text-xl font-bold text-gray-900">
                            {title}
                        </p>
                        <button
                            className="p-1 rounded hover:bg-gray-100 transition-colors -mr-1"
                            onClick={() => setVisible(false)}
                        >
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="w-full px-8 pt-0 overflow-y-scroll flex-grow">
                        {children}
                    </div>
                    <div className="p-8">
                        <Button
                            modal
                            text={buttonText}
                            onClick={(e: any) => {
                                onClick();
                                setVisible(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
