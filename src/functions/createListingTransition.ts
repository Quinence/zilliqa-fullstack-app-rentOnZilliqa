import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

/* Calls create_listing transition */

const createListingTransition = async (
    contract: any,
    zilPay: any,
    name: string | undefined,
    description: string | undefined,
    price: string | undefined,
    rooms: string | undefined,
    bathrooms: string | undefined,
    image: string | undefined,
    location: string | undefined,
    wifi: boolean,
    kitchen: boolean,
    tv: boolean,
    laundry: boolean,
    hvac: boolean
) => {
    const convertedPrice = (parseInt(price || "") * 10 ** 12).toString();
    try {
        const callTransition = await contract.call(
            "create_listing",
            [
                {
                    vname: "name",
                    type: "String",
                    value: name,
                },
                {
                    vname: "description",
                    type: "String",
                    value: description,
                },
                {
                    vname: "price",
                    type: "Uint128",
                    value: convertedPrice,
                },
                {
                    vname: "rooms",
                    type: "Uint32",
                    value: rooms,
                },
                {
                    vname: "bathrooms",
                    type: "Uint32",
                    value: bathrooms,
                },
                {
                    vname: "image",
                    type: "String",
                    value: image,
                },
                {
                    vname: "location",
                    type: "String",
                    value: location,
                },
                {
                    vname: "wifi",
                    type: "String",
                    value: wifi ? "yes" : "no",
                },
                {
                    vname: "kitchen",
                    type: "String",
                    value: kitchen ? "yes" : "no",
                },
                {
                    vname: "tv",
                    type: "String",
                    value: tv ? "yes" : "no",
                },
                {
                    vname: "laundry",
                    type: "String",
                    value: laundry ? "yes" : "no",
                },
                {
                    vname: "hvac",
                    type: "String",
                    value: hvac ? "yes" : "no",
                },
            ],
            getCallParameters(zilPay)
        );
        transitionMessageAlert(zilPay, callTransition.ID, "Creating listing");
    } catch (error) {
        toast.error(decodeZilPayError(error));
    }
};

export default createListingTransition;
