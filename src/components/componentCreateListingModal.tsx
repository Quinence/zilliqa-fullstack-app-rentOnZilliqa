import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import createListingTransition from "../functions/createListingTransition";
import AmenitiesInput from "./componentAmenitiesInput";
import Input from "./componentInput";
import Modal from "./componentModal";

/*
CreateListingModal Component

This component presents a modal that can be used by a host user to create a listing.
Uses Input and Button components.
createListing function is called.
*/

type props = {
    showCreateListing: boolean;
    setShowCreateListing(visible: boolean): void;
};

const CreateListingModal: React.FC<props> = (props) => {
    const { showCreateListing, setShowCreateListing } = props;

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

    const createListing = () => {
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
        createListingTransition(
            contract,
            zilPay,
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

    useEffect(() => {
        setName(undefined);
        setDescription(undefined);
        setPrice(undefined);
        setRooms(undefined);
        setBathrooms(undefined);
        setLocation(undefined);
        setImage(undefined);
        setWifi(false);
        setKitchen(false);
        setTv(false);
        setLaundry(false);
        setHvac(false);
    }, [showCreateListing]);

    return (
        <Modal
            title="Create Listing"
            visible={showCreateListing}
            setVisible={setShowCreateListing}
            buttonText={"Create"}
            onClick={createListing}
        >
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

export default CreateListingModal;
