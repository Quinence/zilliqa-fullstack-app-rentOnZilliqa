/*
Returns an object with the parameters reuquired for calling transitions.
Optional amountValue argument can be used.
Values are converted to appropriate units using ZilPay.
*/

const getCallParameters = (zilPay: any, amountValue: string = "0") => {
    const { units, bytes } = zilPay.utils;

    const CHAIN_ID = 333;
    const MSG_VERSION = 1;
    const GAS_PRICE = 60000000000;
    const GAS_LIMIT = 50000;

    const version = bytes.pack(CHAIN_ID, MSG_VERSION);
    const amount = units.toQa(amountValue, units.Units.Zil);
    const gasPrice = units.fromQa(GAS_PRICE, units.Units.Qa);
    const gasLimit = units.fromQa(GAS_LIMIT, units.Units.Qa);

    return { version, amount, gasPrice, gasLimit };
};

export default getCallParameters;
