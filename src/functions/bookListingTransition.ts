import toast from "react-hot-toast";
import { decodeZilPayError } from "./decodeMessage";
import getCallParameters from "./getCallParameters";
import transitionMessageAlert from "./transitionMessageAlert";

/* Calls book_listing transition */

const bookListingTransition = async (
    contract: any,
    zilPay: any,
    id: string,
    amount: string
) => {
    try {
        const callTransition = await contract.call(
            "book_listing",
            [
                {
                    vname: "id",
                    type: "Uint128",
                    value: id,
                },
            ],
            getCallParameters(zilPay, amount)
        );
        transitionMessageAlert(zilPay, callTransition.ID, "Making reservation");
    } catch (error) {
        toast.error(decodeZilPayError(error));
    }
};

export default bookListingTransition;
