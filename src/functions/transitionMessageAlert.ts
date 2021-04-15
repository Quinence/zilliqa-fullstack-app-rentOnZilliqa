import toast from "react-hot-toast";
import decodeMessage from "./decodeMessage";

/*
Creates a toast using react-hot-toast,
Uses ZilPay to subscribe to transactions,
Updates toast with status of transaction,
Shows message as per messages codes.
*/

const transitionMessageAlert = (
    zilPay: any,
    transactionId: string,
    transitionName: string
) => {
    const transition = new Promise<string>((success, error) => {
        const subscription = zilPay.wallet
            .observableTransaction(transactionId)
            .subscribe(async (hash: any) => {
                subscription.unsubscribe();
                try {
                    const Tx = await zilPay.blockchain.getTransaction(hash[0]);
                    const code = Tx.receipt.transitions[0].msg.params[0].value;
                    const message = decodeMessage(code);
                    if (message.type === "success") success(message.alert);
                    error(message.alert);
                } catch (err) {
                    error("Transaction error");
                }
            });
    });
    toast.promise(transition, {
        loading: `${transitionName}`,
        success: (message: string) => message,
        error: (message: string) => message,
    });
};

export default transitionMessageAlert;
