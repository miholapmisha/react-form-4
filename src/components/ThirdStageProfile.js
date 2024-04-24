import HeaderProfileForm from "./HeaderProfileForm";
import dropDown from "../recourses/drop-down.svg";
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import { Combobox } from '@headlessui/react'
import redClose from "../recourses/red-close.svg";

function ThirdStageProfile({ personData, updatePersonData }) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [countries, setCountries] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [countryQuery, setCountryQuery] = useState("");
    const [cityQuery, setCityQuery] = useState("");
    const [zipCode, setZipCode] = useState("");
    const localUpdatedPersonData = personData;
    const [isLoading, setIsLoading] = useState(true);

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
        fetch('https://countriesnow.space/api/v0.1/countries')
            .then(response => response.json())
            .then((result) => {
                setCountries(result.data);
                setSelectedCountry(result.data[0].country);
                setIsLoading(false);
            });
    }, []);

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
                        {!isLoading ?
                            <Combobox value={selectedCity} onChange={(selectedOption) => {
                                setSelectedCity(selectedOption);
                            }}>
                                <div className="h-[44px] border-b-[1px] border-[#E2E4E5] flex items-center">
                                    <Combobox.Input className="w-[100%] outline-none px-[16px]" onChange={(event) => { setCityQuery(event.target.value); }}></Combobox.Input>
                                    <Combobox.Button> <img src={dropDown}></img> </Combobox.Button>
                                </div>
                                <Combobox.Options className=" cursor-pointer absolute mt-1 max-h-60 w-[390px] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {filteredCities.map((city, index) => (
                                        <Combobox.Option className="border-y-[1px] py-[10px] text-[16px] text-thin pl-[15px]" key={index} value={city}>
                                            {city}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Options>
                            </Combobox> : <div className="h-[44px] flex items-center pl-[15px] border-b-[1px] border-[#E2E4E5]"> <p>Loading...</p> </div>}
                    </div>

                    <div className="w-[100%] flex space-x-[32px]">
                        <div className="w-[180px]">
                            {!isLoading ?
                                <Combobox value={selectedCountry} onChange={(selectedOption) => {
                                    setSelectedCountry(selectedOption);
                                }}>
                                    <div className="font-thin text-[14px]">Country</div>
                                    <div className="h-[44px] border-b-[1px] border-[#E2E4E5]">
                                        <div className="flex h-[100%] ">
                                            <Combobox.Input className="w-[170px] outline-none px-[16px]" onChange={(event) => { setCountryQuery(event.target.value); }} />
                                            <Combobox.Button> <img src={dropDown}></img> </Combobox.Button>
                                        </div>
                                        <Combobox.Options className=" cursor-pointer absolute mt-1 max-h-60 w-[170px] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                            {filteredCountries.map((data) => (
                                                <Combobox.Option className="border-y-[1px] py-[10px] text-[16px] text-thin pl-[15px]" key={data.country} value={data.country}>
                                                    {data.country}
                                                </Combobox.Option>
                                            ))}
                                        </Combobox.Options>
                                    </div>

                                </Combobox> : <div className="h-[44px] flex items-center pl-[15px] border-b-[1px] border-[#E2E4E5]"> <p>Loading...</p> </div>}
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