import React from "react";

/*
ListingCard Component

This component creates the listing card used on the listings page.
*/

type props = {
    id: string;
    name: string;
    price: string | number;
    rooms: string | number;
    bathrooms: string | number;
    image: string;
    renter: string | undefined;
    rented_till: string;
    accumulated_rent: string;
    rented: boolean;
    user_is_host: boolean;
    onClick(): void;
};

const ListingCard: React.FC<props> = (props) => {
    const { name, price, rooms, bathrooms, image, rented, onClick } = props;
    return (
        <div className="w-full rounded-2xl cursor-pointer" onClick={onClick}>
            <div
                className="w-full h-48 rounded-lg mb-4 bg-gray-100 flex justify-end items-start p-2"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                }}
            >
                {rented && (
                    <div>
                        <div className="px-2 py-1 bg-gray-200 text-gray-600 rounded uppercase text-xs tracking-wide font-semibold">
                            Unavailable
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center text-base font-light text-gray-600">
                <p>
                    {rooms} Room{rooms > 1 ? "s" : ""}
                </p>
                <div className="w-1 h-1 bg-gray-500 rounded-full mx-2"></div>
                <p>
                    {bathrooms} Bathroom{bathrooms > 1 ? "s" : ""}
                </p>
            </div>
            <h3 className="text-gray-900 text-xl">{name}</h3>
            <p className="text-gray-900 font-semibold">
                {price} ZIL
                <span className="text-gray-600 font-light"> / night</span>
            </p>
        </div>
    );
};

export default ListingCard;
