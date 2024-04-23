import HeaderProfileForm from "./HeaderProfileForm";
import dropDown from "../drop-down.svg";
import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from "react";
import { Combobox } from '@headlessui/react'
import redClose from "../red-close.svg";

function ThirdStageProfile({ personData, updatePersonData }) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [openCityOptions, setCityOpenOptions] = useState(false);
    const [openCountryOptions, setCountryOpenOptions] = useState(false);
    const [countries, setCountries] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const countryInputRef = useRef(null);
    const cityInputRef = useRef(null);
    const [countryQuery, setCountryQuery] = useState('');
    const [cityQuery, setCityQuery] = useState('');
    const [zipCode, setZipCode] = useState('');
    const localUpdatedPersonData = personData;

    const filteredCountries =
        countryQuery === ''
            ? countries
            : countries
                .filter((country) =>
                    country.country.toLowerCase().includes(countryQuery.toLowerCase())
                );

    const filteredCities =
        cityQuery === ''
            ? availableCities
            : availableCities
                .filter((city) => {
                    return city.toLowerCase().includes(cityQuery.toLowerCase())
                }
                );

    useEffect(() => {
        const citiesByCoutries = countries
            .filter((country) => country.country === selectedCountry)
            .flatMap((country) => country.cities);
        setAvailableCities(citiesByCoutries);
        setSelectedCity(citiesByCoutries[0]);

    }, [selectedCountry]);


    useEffect(() => {
        fetchData();
        const handleOutsideClickForCountryInput = (event) => {
            if (countryInputRef.current && !countryInputRef.current.contains(event.target)) {
                setCountryOpenOptions(false);
            }
        }

        const handleOutsideClickForCityInput = (event) => {
            if (cityInputRef.current && !cityInputRef.current.contains(event.target)) {
                setCityOpenOptions(false);
            }
        }
        document.addEventListener('click', handleOutsideClickForCountryInput);
        document.addEventListener('click', handleOutsideClickForCityInput);

        return () => {
            document.removeEventListener('click', handleOutsideClickForCountryInput);
            document.removeEventListener('click', handleOutsideClickForCityInput);
        };

    }, [])

    const fetchData = () => {
        fetch('https://countriesnow.space/api/v0.1/countries')
            .then(response => response.json())
            .then((result) => {
                setCountries(result.data);
                console.log(result.data[0].country);
                setSelectedCountry(result.data[0].country);
            });
    }

    const toggleDropdown = (entity) => {
        if (entity === "country") {
            setCountryOpenOptions(!openCountryOptions);
        } else if (entity === "city") {
            setCityOpenOptions(!openCityOptions);
        }
    };

    const updateLocalPersonData = (data) => {
        localUpdatedPersonData.deiveryAddress = data.address;
        localUpdatedPersonData.deliveryCity = selectedCity;
        localUpdatedPersonData.deliveryCountry = selectedCountry;
        localUpdatedPersonData.zipCode = data.zipCode;
        localUpdatedPersonData.optional = data.optional;
    }


    return (
        <div className="w-[456px] space-y-8">
            <form className="space-y-8" onSubmit={handleSubmit((data) => {
                updatePersonData("deiveryAddress", data.address);
                updatePersonData("deliveryCity", selectedCity);
                updatePersonData("deliveryCountry", selectedCountry);
                updatePersonData("zipCode", data.zipCode);
                updatePersonData("optional", data.optional);

                updateLocalPersonData(data);
                console.log(localUpdatedPersonData);
            })}>
                <HeaderProfileForm></HeaderProfileForm>
                <div className="w-[100%] p-8 border-[1px] border-[#E2E4E5] space-y-8 rounded-[8px]">
                    <div class="flex h-[46px] flex-col">
                        <div className="font-bold text-[20px]">Delivery address</div>
                        <div className="font-thin text-[12px]">Used for shipping orders</div>
                    </div>

                    <div className="h-[72px]">
                        <div className="font-thin text-[14px]">Address</div>
                        <div className=" h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex">
                            <input {...register("address", { required: "Address is empty" })} className="outline-none px-[16px]"></input>
                        </div>
                        {errors.address && <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                            <img className="size-[14px]" src={redClose}></img>
                            <div>{errors.address.message}</div>
                        </div>}
                    </div>

                    <div className="h-[72px]">
                        <div className="font-thin text-[14px]">City</div>
                        <Combobox value={selectedCity} onChange={(selectedOption) => {
                            setSelectedCity(selectedOption);
                        }}>
                            <div className=" h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex justify-between items-center">
                                <Combobox.Input className="outline-none px-[16px]" onChange={(event) => { setCityQuery(event.target.value); }} />
                                <img ref={cityInputRef} src={dropDown} onClick={() => toggleDropdown("city")}></img>
                            </div>
                            <Combobox.Options static={openCityOptions} className=" cursor-pointer absolute mt-1 max-h-60 w-[396px] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {filteredCities.map((city, index) => (
                                    <Combobox.Option className="border-y-[1px] py-[10px] text-[16px] text-thin pl-[15px]" key={index} value={city}>
                                        {city}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Combobox>
                    </div>

                    <div className="w-[100%] flex space-x-[32px]">
                        <div className="w-[180px]">
                            <Combobox value={selectedCountry} onChange={(selectedOption) => {
                                setSelectedCountry(selectedOption);
                            }}>
                                <div className="font-thin text-[14px]">Country</div>
                                <div className="h-[44px] border-b-[1px] border-[#E2E4E5] flex justify-between items-center">
                                    <Combobox.Input className="w-[170px] outline-none px-[16px]" onChange={(event) => { setCountryQuery(event.target.value); }} />
                                    <img src={dropDown} ref={countryInputRef} onClick={() => toggleDropdown("country")}></img>
                                </div>
                                <Combobox.Options static={openCountryOptions} className=" cursor-pointer absolute mt-1 max-h-60 w-[170px] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {filteredCountries.map((data) => (
                                        <Combobox.Option className="border-y-[1px] py-[10px] text-[16px] text-thin pl-[15px]" key={data.country} value={data.country}>
                                            {data.country}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Options>
                            </Combobox>
                        </div>

                        <div className="w-[180px]">
                            <div className="font-thin text-[14px]">Zip code</div>
                            <div className="focus-within:border-[#007AFF] h-[44px] border-b-[1px] border-[#E2E4E5] flex">
                                <input {...register("zipCode", { required: "Zip code is empty" })}
                                    defaultValue={zipCode} onChange={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, "");;
                                        setZipCode(e.target.value);
                                    }}
                                    className="w-[180px] outline-none px-[16px]"></input>
                            </div>
                            {errors.zipCode && <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                                <img className="size-[14px]" src={redClose}></img>
                                <div>{errors.zipCode.message}</div>
                            </div>}
                        </div>
                    </div>

                    <div className="h-[72px]">
                        <div className="font-thin text-[14px]">Optional</div>
                        <div className=" h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex">
                            <input {...register("optional")} className="outline-none px-[16px]"></input>
                        </div>
                    </div>
                </div >

                <button className="bg-[#007AFF] text-white rounded-[4px] w-[137px] text-[16px] h-[48px] border-[1px] border-[#BBBFC1]">Save ✓</button>
            </form>
        </div >
    )
}

export default ThirdStageProfile;