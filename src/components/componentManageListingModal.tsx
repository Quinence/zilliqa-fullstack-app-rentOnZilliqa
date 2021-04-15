import React, { useEffect, useState } from "react";
import claimRentTransition from "../functions/claimRentTransition";
import ContextContainer from "../functions/contextContainer";
import deleteListingTransition from "../functions/deleteListingTransition";
import updateListingTransition from "../functions/updateListingTransition";
import AmenitiesInput from "./componentAmenitiesInput";
import Button from "./componentButton";
import Input from "./componentInput";
import Modal from "./componentModal";

/*
ManageListingModal Component

This component presents a modal that can be used by a host user to manage their listing.
Uses Input and Button components.
deleteListing, updateListing and claimRent functions are called as required.
*/

type props = {
    modalListing: any;
    showManageListing: boolean;
    setShowManageListing(visible: boolean): void;
};

const ManageListingModal: React.FC<props> = (props) => {
    const { showManageListing, setShowManageListing, modalListing } = props;
    const { id, accumulated_rent } = modalListing;

    const [name, setName] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(
        undefined
    );
    const [price, setPrice] = useState<string | undefined>(undefined);
    const [rooms, setRooms] = useState<string | undefined>(undefined);
    const [bathrooms, setBathrooms] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<string | undefined>(undefined);
    const [image, setImage] = useState<string | undefined>(undefined);

    const [wifi, setWifi] = useState<boolean>(false);
    const [kitchen, setKitchen] = useState<boolean>(false);
    const [tv, setTv] = useState<boolean>(false);
    const [laundry, setLaundry] = useState<boolean>(false);
    const [hvac, setHvac] = useState<boolean>(false);

    const { contract, zilPay } = ContextContainer.useContainer();

    const updateListing = () => {
        if (
            !name ||
            !description ||
            !price ||
            !rooms ||
            !bathrooms ||
            !location ||
            !image
        )
            return;
        updateListingTransition(
            contract,
            zilPay,
            id,
            name,
            description,
            price,
            rooms,
            bathrooms,
            image,
            location,
            wifi,
            kitchen,
            tv,
            laundry,
            hvac
        );
    };

    const claimRent = () => {
        claimRentTransition(contract, zilPay, id);
        setShowManageListing(false);
    };

    const deleteListing = () => {
        deleteListingTransition(contract, zilPay, id);
        setShowManageListing(false);
    };

    useEffect(() => {
        setName(modalListing.name);
        setDescription(modalListing.description);
        setPrice(modalListing.price);
        setRooms(modalListing.rooms);
        setBathrooms(modalListing.bathrooms);
        setLocation(modalListing.location);
        setImage(modalListing.image);
        setWifi(modalListing.amenities.wifi);
        setKitchen(modalListing.amenities.kitchen);
        setTv(modalListing.amenities.tv);
        setLaundry(modalListing.amenities.laundry);
        setHvac(modalListing.amenities.hvac);
    }, [showManageListing]);

    return (
        <Modal
            title="Manage Listing"
            visible={showManageListing}
            setVisible={setShowManageListing}
            buttonText={"Update Listing"}
            onClick={updateListing}
        >
            <>
                <h4 className="text-sm font-semibold text-gray-500 tracking-wide uppercase py-4">
                    Accumulated Rent
                </h4>
                <div className="flex justify-between items-center pb-8">
                    <p className="text-2xl ">{accumulated_rent}</p>
                    <Button text={"Claim Rent"} onClick={claimRent} />
                </div>
            </>
            <>
                <h4 className="text-sm font-semibold text-gray-500 tracking-wide uppercase py-4">
                    Delete Listing
                </h4>
                <Button
                    text={"Delete Listing"}
                    onClick={deleteListing}
                    alert
                    padding
                    modal
                />
            </>
            <Input name="Name" value={name} setValue={setName} />
            <Input
                name="Description"
                value={description}
                setValue={setDescription}
            />
            <Input
                name="Rooms"
                value={rooms}
                type="number"
                setValue={setRooms}
            />
            <Input
                name="Bathrooms"
                value={bathrooms}
                type="number"
                setValue={setBathrooms}
            />
            <Input
                name="Price (ZIL)"
                unit="per night"
                value={price}
                type="number"
                setValue={setPrice}
            />
            <Input
                name="Image URL"
                value={image}
                type="text"
                setValue={setImage}
            />
            <Input
                name="Google Maps Plus Code"
                value={location}
                type="text"
                setValue={setLocation}
            />
            <AmenitiesInput
                {...{
                    wifi,
                    setWifi,
                    kitchen,
                    setKitchen,
                    tv,
                    setTv,
                    laundry,
                    setLaundry,
                    hvac,
                    setHvac,
                }}
            />
        </Modal>
    );
};

export default ManageListingModal;
