import HeaderProfileForm from "./HeaderProfileForm";
import checkMark from "../recourses/check-mark.svg";
import dropDown from "../recourses/drop-down.svg";
import redClose from "../recourses/red-close.svg";
import { useState, useEffect } from "react";
import { Combobox } from '@headlessui/react'
import { useForm } from 'react-hook-form';

function FirstStageProfile({ updatePersonData, changeIndexStage }) {

    const [countries, setCountries] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("Loading...");
    const [selectedCity, setSelectedCity] = useState("");
    const [countryQuery, setCountryQuery] = useState('');
    const [cityQuery, setCityQuery] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState("2024-01-01");
    const { register, handleSubmit, formState: { errors } } = useForm();
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

    }, [selectedCountry, countries]);


    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries')
            .then(response => response.json())
            .then((result) => {
                setCountries(result.data);
                setSelectedCountry(result.data[0].country);
                setIsLoading(false);
            });
    }, [])

    return (
        <div className="w-[456px] space-y-8">
            <HeaderProfileForm></HeaderProfileForm>
            <div className="flex space-x-2 h-[32px]">
                <div className="flex items-center">
                    <input className="size-[18px]" type="checkbox"></input>
                </div>
                <div className="flex font-bold items-center text-[16px]">I agree with</div>
                <div className="flex items-center font-bold text-[#007AFF] text-[16px]">Terms of use</div>
            </div>
            <form className="space-y-8" onSubmit={handleSubmit((data) => {
                updatePersonData("firstName", data.firstName);
                updatePersonData("secondName", data.secondName);
                updatePersonData("dateOfBirth", dateOfBirth);
                updatePersonData("cityOfBirth", selectedCity);
                updatePersonData("countryOfBirth", selectedCountry);
                changeIndexStage(1);
            })}>
                <div className="w-[100%] p-8 border-[1px] border-[#E2E4E5] space-y-8 rounded-[8px]">
                    <div class="flex h-[46px] flex-col">
                        <div className="font-bold text-[20px]">Personal data</div>
                        <div className="font-thin text-[12px]">Specify exacly as in your passport</div>
                    </div>
                    <div className="h-[72px]">
                        <div className="font-thin text-[14px]">First name</div>
                        <div className=" h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex">
                            <input {...register("firstName", { required: "First name is required" })} className="outline-none px-[16px]"></input>
                        </div>
                        {errors.firstName && <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                            <img className="size-[14px]" src={redClose}></img>
                            <div>{errors.firstName.message}</div>
                        </div>}
                    </div>

                    <div className="h-[72px]">
                        <div className="font-thin text-[14px]">Second name</div>
                        <div className=" h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex">
                            <input {...register("secondName", { required: "Second name is required" })} className="outline-none px-[16px]"></input>
                        </div>
                        {errors.secondName && <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                            <img className="size-[14px]" src={redClose}></img>
                            <div>{errors.secondName.message}</div>
                        </div>}

                    </div>

                    <div className="w-[100%] flex space-x-[32px]">
                        <div className="w-[180px]">
                            <div className="font-thin text-[14px]">Date of birth</div>
                            <div className=" h-[44px] border-b-[1px] border-[#E2E4E5] flex">
                                <input value={dateOfBirth} type="date" className="w-[180px] outline-none px-[16px]" onChange={(e) => setDateOfBirth(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="w-[180px]">
                            <div className="font-thin text-[14px]">Place of birth</div>
                            <div className="flex flex-col space-y-4">
                                {!isLoading ?
                                    <Combobox value={selectedCountry} onChange={(selectedOption) => {
                                        setSelectedCountry(selectedOption);
                                    }}>
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
                            {!isLoading ?
                                <Combobox value={selectedCity} onChange={(selectedOption) => {
                                    setSelectedCity(selectedOption);
                                }}>
                                    <div className="h-[44px] border-b-[1px] border-[#E2E4E5] flex items-center">
                                        <Combobox.Input className="w-[170px] outline-none px-[16px]" onChange={(event) => { setCityQuery(event.target.value); }}></Combobox.Input>
                                        <Combobox.Button> <img src={dropDown}></img> </Combobox.Button>
                                    </div>
                                    <Combobox.Options className=" cursor-pointer absolute mt-1 max-h-60 w-[170px] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {filteredCities.map((city, index) => (
                                            <Combobox.Option className="border-y-[1px] py-[10px] text-[16px] text-thin pl-[15px]" key={index} value={city}>
                                                {city}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                </Combobox> : <div className="h-[44px] flex items-center pl-[15px] border-b-[1px] border-[#E2E4E5]"> <p>Loading...</p> </div>}
                        </div>
                    </div>

                </div >

                <div className="w-[100%] h-[80px] py-4 px-4 border-[1px] border-[#E2E4E5] rounded-[8px]">
                    <div className="text-[18px]">123-45-678</div>
                    <div className="flex space-x-2">
                        <img src={checkMark}></img>
                        <div className="text-[13px] font-thin">Your ITIN</div>
                    </div>
                </div>

                <button className="w-[137px] text-[16px] h-[48px] border-[1px] border-[#BBBFC1]">Go Next →</button>
            </form>
        </div >
    )
}

export default FirstStageProfile;