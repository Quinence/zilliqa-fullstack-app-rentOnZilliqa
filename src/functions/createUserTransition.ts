import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

/* Calls create_user transition */

const createUserTransition = async (
    contract: any,
    zilPay: any,
    name: string | undefined,
    role: string
) => {
    try {
        const callTransition = await contract.call(
            "create_user",
            [
                {
                    vname: "name",
                    type: "String",
                    value: name,
                },
                {
                    vname: "role",
                    type: "Uint32",
                    value: role,
                },
            ],
            getCallParameters(zilPay)
        );
        transitionMessageAlert(zilPay, callTransition.ID, "Creating user");
    } catch (error) {
        toast.error(decodeZilPayError(error));
    }
};

export default createUserTransition;
