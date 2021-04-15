import React from "react";
import Tick from "./componentTick";

/*
Checkbox Component

This component is used within the modals.
The CreateAccount Modal uses it for user role selection.
It is used for selecting amenities in the Create and Update Listing Modals.
*/

type props = {
    checked: boolean;
    setChecked(checked: boolean): void;
    children: any;
    name: String;
};

const CheckBox: React.FC<props> = (props) => {
    const { checked, setChecked, children, name } = props;
    return (
        <>
            <div
                className="flex justify-between items-center cursor-pointer mt-3"
                onClick={() => setChecked(!checked)}
            >
                <div className="flex items-center">
                    {children}
                    <p className="text-lg text-gray-800 pl-4">{name}</p>
                </div>
                <div
                    className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all ${
                        checked ? "" : "hover:bg-gray-300"
                    }`}
                >
                    <div
                        className={`w-full h-full rounded transition-colors text-transparent ${
                            checked ? "bg-gray-900 text-white" : ""
                        }`}
                    >
                        {checked && <Tick />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckBox;
