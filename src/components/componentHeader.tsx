import React from "react";
import { Link } from "react-router-dom";
import Button from "./componentButton";

type props = {
    setShowSignUp(showSignUp: boolean): void;
};

const Header: React.FC<props> = (props) => {
    const { setShowSignUp } = props;

    return (
        <header className="bg-gray-900 sticky top-0 z-10">
            <div className="container mx-auto px-4 lg:px-2 py-3 flex justify-between items-center">
                <Link
                    className="text-white text-2xl font-medium cursor-pointer"
                    to="/listings"
                >
                    RentOnZilliqa
                </Link>
                <Button
                    text={"Create Account"}
                    onClick={() => setShowSignUp(true)}
                    white
                    header
                />
            </div>
        </header>
    );
};

export default Header;
