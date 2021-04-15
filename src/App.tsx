import React, { useEffect, useState } from "react";
import Header from "./components/componentHeader";
import Listing from "./components/componentListing";
import Listings from "./components/componentListings";
import SignUpModal from "./components/componentCreateAccountModal";
import ContextContainer from "./functions/contextContainer";
import { Toaster } from "react-hot-toast";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const App: React.FC = () => {
    const [showSignUp, setShowSignUp] = useState<boolean>(false);
    const [zilPayCheck, setZilPayCheck] = useState<number>(0);
    const {
        zilPay,
        setZilPay,
        error,
        setError,
        setContract,
        setContractState,
        setCurrentBlockNumber,
    } = ContextContainer.useContainer();

    const getContractState = async () => {
        const contract = await zilPay.contracts.at(
            process.env.REACT_APP_SMART_CONTRACT_ADDRESS
        );
        setContract(contract);
        const contractState = await contract.getState();
        setContractState(contractState);
    };

    useEffect(() => {
        if (error === false) return;
        // @ts-ignore
        const zilPay = window.zilPay;
        if (zilPay === undefined) {
            setError(true);
            return;
        }
        setZilPay(zilPay);
        setError(false);
    }, [error]);

    useEffect(() => {
        if (error && zilPayCheck < 100) {
            setZilPayCheck(zilPayCheck + 1);
            setError(undefined);
            return;
        }
        if (error !== false) return;

        let block: any = undefined;
        let account: any = undefined;

        if (!zilPay.wallet.isConnect) return;
        try {
            block = zilPay.wallet.observableBlock().subscribe((block: any) => {
                const blockNumber = parseInt(block.TxBlock.header.BlockNum);
                setCurrentBlockNumber(blockNumber);
                getContractState();
            });
            account = zilPay.wallet
                .observableAccount()
                .subscribe(() => getContractState());

            getContractState();
        } catch (e) {
            console.log(e);
        }
        return function cleanup() {
            block?.unsubscribe?.();
            account?.unsubscribe?.();
        };
    }, [error]);

    return zilPay ? (
        <div className="rentonzilliqa">
            <Router>
                <Header {...{ setShowSignUp }} />
                <main>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to={"/listings"} />
                        </Route>
                        <Route path="/listings">
                            <Listings />
                        </Route>
                        <Route path="/listing/:id">
                            <Listing />
                        </Route>
                        <Redirect to={"/listings"} />
                    </Switch>
                    <SignUpModal {...{ showSignUp, setShowSignUp }} />
                </main>
            </Router>
            <Toaster
                toastOptions={{
                    success: { duration: 6000 },
                    error: { duration: 8000 },
                    loading: { duration: 130000 },
                }}
            />
        </div>
    ) : (
        <main className="h-screen flex justify-center items-center text-xl">
            Please install ZilPay
        </main>
    );
};

export default App;
