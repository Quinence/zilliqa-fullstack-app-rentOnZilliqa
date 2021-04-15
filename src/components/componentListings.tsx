import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ContextContainer from "../functions/contextContainer";
import formatListings from "../functions/formatListings";
import getCurrentEpochNumber from "../functions/getCurrentEpochNumber";
import getCurrentUser from "../functions/getCurretUser";
import Button from "./componentButton";
import CreateListingModal from "./componentCreateListingModal";
import ListingCard from "./componentListingCard";
import ManageListingModal from "./componentManageListingModal";

const Listings: React.FC = () => {
    const [showCreateListing, setShowCreateListing] = useState<boolean>(false);
    const [showManageListing, setShowManageListing] = useState<boolean>(false);
    const [modalListing, setModalListing] = useState<any | undefined>(
        undefined
    );
    const {
        contractState,
        zilPay,
        currentUser,
        setCurrentUser,
        currentBlockNumber,
        setCurrentBlockNumber,
    } = ContextContainer.useContainer();
    const [listings, setListings] = useState<any | undefined>(undefined);
    const history = useHistory();

    const hostedListings = listings?.filter((listing: any) => {
        return listing.user_is_host;
    });

    useEffect(() => {
        (async () => {
            if (!contractState) return;
            const currentEpochNumber = await getCurrentEpochNumber(zilPay);
            setCurrentBlockNumber(currentEpochNumber);
            const currentUser = getCurrentUser(contractState, zilPay);
            setCurrentUser(currentUser);
            setListings(
                formatListings(
                    contractState,
                    currentEpochNumber,
                    currentUser.address
                )
            );
        })();
    }, [contractState, currentBlockNumber]);

    return (
        <div className="container mx-auto px-4 lg:px-2 pb-20">
            <div className="pt-20 pb-10 flex justify-between items-center">
                <h1 className="text-gray-900 text-2xl font-medium">Listings</h1>
            </div>
            {listings ? (
                <>
                    {listings.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-5 gap-6">
                                {listings.map((listing: any, index: number) => {
                                    return (
                                        <ListingCard
                                            {...listing}
                                            onClick={() => {
                                                history.push(
                                                    `/listing/${listing.id}`
                                                );
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <p className="text-xl text-center">No listings</p>
                    )}
                    {currentUser?.role === "host" && (
                        <>
                            <div className="pt-32 pb-10 flex justify-between items-center">
                                <h1 className="text-gray-900 text-2xl font-medium">
                                    Hosted
                                </h1>
                                <Button
                                    text={"New Listing"}
                                    onClick={() => setShowCreateListing(true)}
                                />
                            </div>
                            {hostedListings.length > 0 ? (
                                <div className="grid md:grid-cols-5 gap-6">
                                    {hostedListings.map(
                                        (listing: any, index: number) => {
                                            return (
                                                <ListingCard
                                                    {...listing}
                                                    onClick={() => {
                                                        setModalListing(
                                                            listing
                                                        );
                                                        setShowManageListing(
                                                            true
                                                        );
                                                    }}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            ) : (
                                <p className="text-xl text-center">
                                    No listings
                                </p>
                            )}
                        </>
                    )}
                </>
            ) : zilPay.wallet.isConnect ? (
                <p className="text-xl text-center">Loading</p>
            ) : (
                <p className="text-xl text-center">Please connect ZilPay</p>
            )}
            <CreateListingModal
                {...{ showCreateListing, setShowCreateListing }}
            />
            {modalListing && (
                <ManageListingModal
                    {...{
                        modalListing,
                        showManageListing,
                        setShowManageListing,
                    }}
                />
            )}
        </div>
    );
};

export default Listings;
