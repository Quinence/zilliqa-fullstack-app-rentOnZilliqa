/*
Takes the multiple Map objects in the contract state and returns a handy user object.
Checks if user is host and if listing is rented.
Prices and rent are converted from Qa.
Amenities are converted to bool.
*/

const formatListings = (
    contractState: any,
    currentEpochNumber: number,
    currentUser: string
) => {
    const {
        listing_name,
        listing_description,
        listing_host,
        listing_price,
        listing_rooms,
        listing_bathrooms,
        listing_image,
        listing_location,
        listing_renter,
        listing_rented_till,
        listing_accumulated_rent,
        listing_wifi,
        listing_kitchen,
        listing_tv,
        listing_laundry,
        listing_hvac,
    } = contractState;

    const formattedListings = Object.keys(listing_name).map(
        (key: any, index: any) => {
            return {
                id: key,
                name: listing_name[key],
                description: listing_description[key],
                price: (parseInt(listing_price[key]) / 10 ** 12).toString(),
                rooms: listing_rooms[key],
                bathrooms: listing_bathrooms[key],
                image: listing_image[key],
                location: listing_location[key],
                renter: listing_renter[key],
                rented_till: listing_rented_till[key],
                accumulated_rent: (
                    parseInt(listing_accumulated_rent[key]) /
                    10 ** 12
                ).toString(),
                rented:
                    parseInt(listing_rented_till[key]) >= currentEpochNumber,
                user_is_host: listing_host[0] === currentUser.toLowerCase(),
                amenities: {
                    wifi: listing_wifi[key] === "yes",
                    kitchen: listing_kitchen[key] === "yes",
                    tv: listing_tv[key] === "yes",
                    laundry: listing_laundry[key] === "yes",
                    hvac: listing_hvac[key] === "yes",
                },
            };
        }
    );

    return formattedListings;
};

export default formatListings;
