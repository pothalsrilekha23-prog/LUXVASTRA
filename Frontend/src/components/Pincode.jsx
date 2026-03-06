import React, { useState } from 'react';
import { MapPin } from 'react-feather'; // Keep using your existing icon
import { MdClose } from 'react-icons/md'; // Import the close icon from react-icons

const Pincode = () => {
    const [locationInfo, setLocationInfo] = useState("Select Pincode");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [pincode, setPincode] = useState('');

    const fetchCityFromIP = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://api.fastgeoip.net/?lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            return data.city || "Your City"; // Fallback in case of no city returned
        } catch (error) {
            console.error("Error fetching city data:", error);
            return "Unknown Location";
        }
    };

    const fetchCityFromPincode = async () => {
        try {
            const response = await fetch(`https://api.yourpincodeapi.com/getCity?pincode=${pincode}`);
            const data = await response.json();
            return data.city || "Your City"; // Fallback in case of no city returned
        } catch (error) {
            console.error("Error fetching city data from pincode:", error);
            return "Unknown Location";
        }
    };

    const handleLocationPermission = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const cityName = await fetchCityFromIP(latitude, longitude);
                    setLocationInfo(`${cityName} (${latitude}, ${longitude})`);
                    setIsPopoverOpen(false);
                },
                (error) => {
                    console.error("Error accessing location: ", error);
                }
            );
        }
    };

    const handlePincodeSubmit = async () => {
        const cityName = await fetchCityFromPincode();
        setLocationInfo(`${cityName} (${pincode})`);
        setIsPopoverOpen(false);
    };

    // Function to close the popup
    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    return (
        <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
                <div
                    className="hidden md:flex items-center gap-1 text-sm cursor-pointer relative"
                    onClick={() => setIsPopoverOpen(true)}
                >
                    <MapPin size={16} />
                    <span className="underline font-medium">{locationInfo}</span>
                </div>
            </div>

            {isPopoverOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 z-40 transition-opacity duration-200" />
            )}

            {isPopoverOpen && (
                <div className="fixed inset-x-0 top-16 mx-auto max-w-[375px] w-full bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <MapPin size={20} />
                            <h3 className="font-semibold">Set Location</h3>
                        </div>
                        <button onClick={closePopover} aria-label="Close popup" className="focus:outline-none">
                            <MdClose size={24} />
                        </button>
                    </div>
                    <button
                        className="w-full bg-[#8b6f47] hover:bg-[#735a39] text-white py-3 rounded-lg font-medium transition duration-300 mt-4"
                        onClick={handleLocationPermission}
                    >
                        Use Current Location
                    </button>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="hidden md:block w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                            className="w-full bg-[#8b6f47] hover:bg-[#735a39] text-white py-3 rounded-lg font-medium transition duration-300 mt-4"
                            onClick={handlePincodeSubmit}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pincode;
