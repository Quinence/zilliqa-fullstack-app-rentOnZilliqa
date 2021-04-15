import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import createUserTransition from "../functions/createUserTransition";
import Button from "./componentButton";
import Input from "./componentInput";
import Modal from "./componentModal";
import Tick from "./componentTick";

/*
ManageListingModal Component

This component presents a modal that can be used by a user to create an account.
Uses Input and Button components.
Uses CheckBox for selecting user role.
A button is presented for connecting ZilPay when required.w
*/

type props = {
    showSignUp: boolean;
    setShowSignUp(visible: boolean): void;
};

const SignUpModal: React.FC<props> = (props) => {
    const { showSignUp, setShowSignUp } = props;
    const [name, setName] = useState<string | undefined>(undefined);
    const [userRole, setUserRole] = useState<string | undefined>("host");
    const { zilPay, contract } = ContextContainer.useContainer();

    const createUser = async () => {
        const role = userRole === "host" ? "1" : "0";
        createUserTransition(contract, zilPay, name, role);
    };

    const connectZilPay = async () => {
        await zilPay.wallet.connect();
        window.location.reload();
    };

    useEffect(() => {
        setName(undefined);
        setUserRole("host");
    }, [setShowSignUp]);

    return (
        <Modal
            title="Create Account"
            visible={showSignUp}
            setVisible={setShowSignUp}
            buttonText={"Create Account"}
            onClick={createUser}
        >
            <>
                {!zilPay.wallet.isConnect && (
                    <>
                        <h4 className="text-xs font-semibold text-gray-500 tracking-wide uppercase py-4">
                            ZilPay
                        </h4>
                        <Button
                            text={"Connect ZilPay"}
                            padding
                            onClick={connectZilPay}
                            modal
                        />
                    </>
                )}
                <Input name="Your name" value={name} setValue={setName} />
                <h4 className="text-xs font-semibold text-gray-500 tracking-wide uppercase py-4">
                    Please select one
                </h4>
                <div className="flex gap-12 mb-8">
                    <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => setUserRole("host")}
                    >
                        <p className="text-lg text-gray-800 pr-4">Host</p>
                        <div
                            className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all ${
                                userRole === "host" ? "" : "hover:bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-full h-full rounded transition-colors text-transparent ${
                                    userRole === "host"
                                        ? "bg-gray-900 text-gray-200"
                                        : ""
                                }`}
                            >
                                {userRole === "host" && <Tick />}
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => setUserRole("renter")}
                    >
                        <p className="text-lg text-gray-800 pr-4">Rent</p>
                        <div
                            className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all ${
                                userRole !== "host" ? "" : "hover:bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-full h-full rounded transition-colors text-transparent ${
                                    userRole !== "host"
                                        ? "bg-gray-900 text-gray-200"
                                        : ""
                                }`}
                            >
                                {userRole !== "host" && <Tick />}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Modal>
    );
};

export default SignUpModal;
