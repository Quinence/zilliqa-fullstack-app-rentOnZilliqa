/*
Fetches the wallet address of the active ZilPay user.
Gets the name and role of the user from the contract state.
*/

const getCurrentUser = (contractState: any, zilPay: any) => {
    const currentUser = zilPay.wallet.defaultAccount.base16;
    const address = currentUser.toLowerCase();
    const name = contractState.user_name[address];
    const role = contractState.user_role?.[address] === "1" ? "host" : "renter";
    return { address, name, role };
};

export default getCurrentUser;
