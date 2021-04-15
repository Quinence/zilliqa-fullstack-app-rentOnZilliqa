import React, { useEffect, useState } from "react";
import {
    HvacIcon,
    KitchenIcon,
    LaundryIcon,
    TvIcon,
    WifiIcon,
} from "./componentListingIcons";
import CheckBox from "./componentCheckBox";

/*
AmenitiesInput Component

This component groups many inputs to clean up the code
*/

type props = {
    wifi: boolean;
    setWifi(wifi: boolean): void;
    kitchen: boolean;
    setKitchen(kitchen: boolean): void;
    tv: boolean;
    setTv(tv: boolean): void;
    laundry: boolean;
    setLaundry(laundry: boolean): void;
    hvac: boolean;
    setHvac(hvac: boolean): void;
};

const AmenitiesInput: React.FC<props> = (props) => {
    const {
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
    } = props;
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        setSelectAll(!(wifi || kitchen || tv || laundry || hvac));
    }, [wifi, kitchen, tv, laundry, hvac]);

    const setAll = (value: boolean) => {
        setWifi(value);
        setKitchen(value);
        setTv(value);
        setLaundry(value);
        setHvac(value);
    };

    return (
        <>
            <div className="flex justify-between text-xs font-semibold text-gray-500 tracking-wide uppercase py-4">
                <h4>Amenities</h4>
                <p
                    className="font-medium text-gray-400 cursor-pointer hover:text-gray-500 transition-colors"
                    onClick={() => setAll(selectAll)}
                >
                    {selectAll ? "Select All" : "Select None"}
                </p>
            </div>
            <CheckBox name="WiFi" checked={wifi} setChecked={setWifi}>
                <WifiIcon />
            </CheckBox>
            <CheckBox name="Kitchen" checked={kitchen} setChecked={setKitchen}>
                <KitchenIcon />
            </CheckBox>
            <CheckBox name="Television" checked={tv} setChecked={setTv}>
                <TvIcon />
            </CheckBox>
            <CheckBox name="Laundry" checked={laundry} setChecked={setLaundry}>
                <LaundryIcon />
            </CheckBox>
            <CheckBox name="HVAC" checked={hvac} setChecked={setHvac}>
                <HvacIcon />
            </CheckBox>
        </>
    );
};

export default AmenitiesInput;
