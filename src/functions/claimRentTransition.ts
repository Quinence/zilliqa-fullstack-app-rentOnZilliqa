import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

/* Calls claim_rent transition */

const claimRentTransition = async (
    contract: any,
    zilPay: any,
    id: string | undefined
) => {
    try {
        const callTransition = await contract.call(
            "claim_rent",
            [
                {
                    vname: "id",
                    type: "Uint128",
                    value: id,
                },
            ],
            getCallParameters(zilPay)
        );
        transitionMessageAlert(zilPay, callTransition.ID, "Claiming rent");
    } catch (error) {
        toast.error(decodeZilPayError(error));
    }
};

export default claimRentTransition;
