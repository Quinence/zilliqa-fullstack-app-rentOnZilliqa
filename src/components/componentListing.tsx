import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import formatListings from "../functions/formatListings";
import getCurrentEpochNumber from "../functions/getCurrentEpochNumber";
import getCurrentUser from "../functions/getCurretUser";
import Button from "./componentButton";
import { useHistory, useParams } from "react-router-dom";
import bookListingTransition from "../functions/bookListingTransition";
import {
    BathroomIcon,
    BedroomIcon,
    HvacIcon,
    KitchenIcon,
    LaundryIcon,
    TvIcon,
    WifiIcon,
} from "./componentListingIcons";

/*
Listing Component

This component presents a detailed view of the individual listings.
The description, rooms, amenities, map, etc are presented in a detailed manner.
Users can book the listing withing this component, which uses the makeReservation function.
The map embed url is built using the Google Plus Code and the Google Maps API Key.
*/

const Listing: React.FC = () => {
    const [listing, setListing] = useState<any | undefined>(undefined);
    const {
        contract,
        contractState,
        zilPay,
        setCurrentUser,
        currentBlockNumber,
        setCurrentBlockNumber,
    } = ContextContainer.useContainer();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const plusCode = listing?.location.replace(" ", "+").replace("+", "%2B");
    const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_API_KEY}&q=${plusCode}&zoom=18`;

    useEffect(() => {
        (async () => {
            if (!contractState) return;
            const currentEpochNumber = await getCurrentEpochNumber(zilPay);
            setCurrentBlockNumber(currentEpochNumber);
            const currentUser = getCurrentUser(contractState, zilPay);
            setCurrentUser(currentUser);
            const listing = formatListings(
                contractState,
                currentEpochNumber,
                currentUser.address
            ).filter((listing) => {
                return listing.id === id;
            })?.[0];
            if (!listing) history.push("/listings");
            setListing(listing);
        })();
    }, [contractState, currentBlockNumber]);

    const makeReservation = () => {
        bookListingTransition(contract, zilPay, listing.id, listing.price);
    };

    return (
        <>
            {listing ? (
                <div className="container mx-auto px-4 lg:px-2 pb-20">
                    <div className="pt-20 pb-10">
                        <h1 className="text-gray-900 text-3xl font-medium">
                            {listing.name}
                        </h1>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-12 relative">
                        <div className="order-2 lg:order-none lg:col-span-2">
                            <img
                                className="rounded-xl bg-gray-100"
                                src={listing.image}
                            />
                            <div className="max-w-prose mt-20 mb-12">
                                <h2 className="text-2xl font-medium text-gray-900 pb-4">
                                    About
                                </h2>
                                <p className="text-gray-700">
                                    {listing.description}
                                </p>
                            </div>
                            <div className="h-px bg-gray-300"></div>
                            <div className="my-12">
                                <h2 className="text-2xl font-medium text-gray-900 pb-4">
                                    Rooms
                                </h2>
                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                                    <div className="border p-6 rounded-lg">
                                        <BedroomIcon />
                                        <p className="text-lg text-gray-900 pt-1">
                                            {listing.rooms} Bedroom
                                            {listing.rooms > 1 ? "s" : ""}
                                        </p>
                                    </div>
                                    <div className="border p-6 rounded-lg">
                                        <BathroomIcon />
                                        <p className="text-lg text-gray-900 pt-1">
                                            {listing.bathrooms} Bathroom
                                            {listing.bathrooms > 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-gray-300"></div>
                            {Object.values(listing.amenities).filter?.(
                                (amenity: any) => {
                                    return amenity;
                                }
                            ).length > 0 && (
                                <div className="my-12">
                                    <h2 className="text-2xl font-medium text-gray-900 pb-4">
                                        Amenities
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        {listing.amenities.wifi && (
                                            <div className="flex items-center">
                                                <WifiIcon />
                                                <p className="pl-4">WiFi</p>
                                            </div>
                                        )}
                                        {listing.amenities.kitchen && (
                                            <div className="flex items-center">
                                                <KitchenIcon />
                                                <p className="pl-4">Kitchen</p>
                                            </div>
                                        )}
                                        {listing.amenities.tv && (
                                            <div className="flex items-center">
                                                <TvIcon />
                                                <p className="pl-4">
                                                    Television
                                                </p>
                                            </div>
                                        )}
                                        {listing.amenities.laundry && (
                                            <div className="flex items-center">
                                                <LaundryIcon />
                                                <p className="pl-4">Laundry</p>
                                            </div>
                                        )}
                                        {listing.amenities.hvac && (
                                            <div className="flex items-center">
                                                <HvacIcon />
                                                <p className="pl-4">HVAC</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {plusCode && (
                                <>
                                    <div className="h-px bg-gray-300"></div>
                                    <div className="my-12">
                                        <h2 className="text-2xl font-medium text-gray-900 pb-4">
                                            Location
                                        </h2>
                                        <iframe
                                            className="w-full h-96 bg-gray-100"
                                            src={mapEmbedUrl}
                                        ></iframe>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="order-1">
                            <div className="sticky top-32 p-6 rounded-xl border-2 w-full">
                                <div className="text-center">
                                    <p className="mt-4 mb-8 text-xl text-gray-900 font-medium">
                                        {listing.price} ZIL
                                        <span className="text-gray-700 font-normal">
                                            {" "}
                                            / night
                                        </span>
                                    </p>
                                    {listing.rented && (
                                        <p className="mb-10 px-2 py-1 bg-gray-200 text-gray-600 rounded uppercase text-xs tracking-wide font-semibold  inline-block">
                                            Unavailable
                                        </p>
                                    )}
                                </div>
                                <Button
                                    modal
                                    onClick={makeReservation}
                                    text="Make Reservation"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : zilPay.wallet.isConnect ? (
                <p className="pt-20 text-xl text-center">Loading</p>
            ) : (
                <p className="pt-20 text-xl text-center">
                    Please connect ZilPay
                </p>
            )}
        </>
    );
};

export default Listing;
