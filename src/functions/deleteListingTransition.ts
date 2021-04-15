import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

/* Calls delete_listing transition */

const deleteListingTransition = async (
    contract: any,
    zilPay: any,
    id: string | undefined
) => {
    try {
        const callTransition = await contract.call(
            "delete_listing",
            [
                {
                    vname: "id",
                    type: "Uint128",
                    value: id,
                },
            ],
            getCallParameters(zilPay)
        );
        transitionMessageAlert(zilPay, callTransition.ID, "Deleting listing");
    } catch (error) {
        toast.error(decodeZilPayError(error));
    }
};

export default deleteListingTransition;
