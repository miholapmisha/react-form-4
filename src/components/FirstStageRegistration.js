import { useEffect, useRef, useState } from "react";
import { Combobox } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import phone_data from '../recourses/phone_codes.json'
import lock from '../recourses/lock.svg'
import greyClose from '../recourses/grey-close.svg'
import redClose from '../recourses/red-close.svg'
import dropDown from '../recourses/drop-down.svg'
import RegistrationHeader from "./RegistrationHeader";

function FirstStageRegistration({ updateIndexStageOn, updateNumber, phoneNumber }) {

    const getPhoneParts = (phoneNumber) => {

        const spaceIndex = phoneNumber.indexOf(" ");
        const phoneCode = phoneNumber.slice(0, spaceIndex).trim();
        const restOfNumber = phoneNumber.slice(spaceIndex + 1).trim();

        return [phoneCode, restOfNumber];
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passedPhoneCode, passedRestOfNumber] = getPhoneParts(phoneNumber);
    const [isDialogWindowOpen, setIsDialogWindowOpen] = useState(true);
    const [phoneCode, setPhoneCode] = useState(passedPhoneCode !== "" ? passedPhoneCode : phone_data[0].dial_code);
    const [inputNumberBody, setInputNumberBody] = useState(passedRestOfNumber);
    const [query, setQuery] = useState('');
    const [openOptions, setOpenOptions] = useState(false);
    const inputRef = useRef(null);

    const filteredCodes =
        query === ''
            ? phone_data
            : phone_data
                .filter((code) =>
                    code.dial_code.includes(query)
                )

    const toggleDropdown = () => {
        setOpenOptions(!openOptions);
    };

    const handleSendCodeButtonClick = () => {
        updateNumber(phoneCode + " " + inputNumberBody);
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setOpenOptions(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [])

    return (
        <div className="w-[456px] space-y-8">
            <RegistrationHeader></RegistrationHeader>
            <form className="w-[100%] space-y-8" onSubmit={handleSubmit((data) => {
                handleSendCodeButtonClick();
                updateIndexStageOn(1);
            })}>
                <div>
                    {isDialogWindowOpen && (
                        <div className="w-[100%] rounded-[8px] py-[15px] flex bg-[#F0F2F4] text-sm">
                            <div className="w-[15%] flex justify-center">
                                <img className="size-[24px]" src={lock}></img>
                            </div>
                            <div className="w-[70%] text-[13px]">
                                <div>We take privacy issues seriously. You can be sure that your personal data is securely protected.</div>
                            </div>
                            <div className="w-[15%] flex justify-center">
                                <button className="outline-none h-[24px]" onClick={() => { setIsDialogWindowOpen(false) }}> <img className="size-[24px]" src={greyClose}></img> </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="rounded-[8px] border-[1px] border-[#E2E4E5] flex flex-col p-8 space-y-8 ">
                    <div> Enter your phone number </div>

                    <div className="flex w-[100%] space-x-4 text-lg">
                        <div className="max-w-[25%]">
                            <Combobox value={phoneCode} onChange={setPhoneCode}>
                                <div className="flex border-b-[1px] border-[#E2E4E5]">
                                    <Combobox.Input className="pl-[20px] outline-none h-[44px] w-[100%]" onChange={(event) => { setQuery(event.target.value); }} />
                                    <img src={dropDown} ref={inputRef} onClick={() => { toggleDropdown() }}></img>
                                </div>
                                <Combobox.Options static={openOptions} className=" cursor-pointer absolute mt-1 max-h-60 w-[100px] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {filteredCodes.map((data) => (
                                        <Combobox.Option className="border-y-[1px] py-[10px] text-[16px] text-thin" key={data.code} value={data.dial_code}>
                                            {data.dial_code}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Options>
                            </Combobox>
                        </div>
                        <div className="max-w-[75%] border-b-[1px] border-[#E2E4E5]">
                            <input {...register("inputPhoneNumberBody", {
                                required: "Number required",
                                minLength: { value: 10, message: "Should contain only 10 digits." },
                                maxLength: { value: 10, message: "Should contain only 10 digits." }
                            })}
                                defaultValue={passedRestOfNumber} onChange={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, "");;
                                    setInputNumberBody(e.target.value);

                                }} className="pl-[20px] h-[44px] w-[100%] outline-none"></input>
                        </div>
                    </div>
                    {errors.inputPhoneNumberBody?.message &&
                        <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                            <img className="size-[18px]" src={redClose}></img>
                            <div> {errors.inputPhoneNumberBody?.message} </div>
                        </div>}
                </div>
                <button type="submit" className="w-[137px] h-[48px] border-[1px] border-[#BBBFC1]">Send Code</button>
            </form>

        </div>
    )
}

export default FirstStageRegistration;