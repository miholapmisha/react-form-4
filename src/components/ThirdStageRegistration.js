import React, { useState, useEffect } from 'react';
import RegistrationHeader from "./RegistrationHeader";
import checkMark from '../recourses/check-mark.svg';
import greenCheckMark from '../recourses/green-check-mark.svg'
import greyEye from '../recourses/grey-eye.svg';
import blueEye from '../recourses/blue-eye.svg';
import redClose from '../recourses/red-close.svg';
import { useForm } from 'react-hook-form';

function ThirdStageRegistration({ phoneNumber, setCompleted }) {

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
    const { register, handleSubmit, watch, trigger, getValues, formState: { errors } } = useForm();

    const passwordWatch = watch("password");
    useEffect(() => {
        if (isPasswordInputFocused) {
            trigger("password");
        }
    }, [passwordWatch, isPasswordInputFocused]);

    return (
        <div className="w-[456px] space-y-8">
            <RegistrationHeader></RegistrationHeader>
            <form className="space-y-8" onSubmit={handleSubmit(() => {
                setCompleted(true);
            })}>
                <div className="w-[100%] h-[80px] border-[1px] border-[#E2E4E5] rounded-[8px] py-[10px] px-[20px] space-y-[5px]">
                    <div className="text-[18px]">{phoneNumber}</div>
                    <div className="flex justify-between">
                        <div className="text-[13px] font-thin flex space-x-2">
                            <img src={checkMark}></img>
                            <div> Number confirmed </div>
                        </div>
                    </div>
                </div>

                <div className="w-[100%] p-8 border-[1px] border-[#E2E4E5] rounded-[8px]">
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col space-y-2">
                            <div className="font-thin">Enter your email</div>
                            <div className=" h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex">
                                <input {...register("email", {
                                    required: "Email is empty",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Email is not valid"
                                    }
                                })}
                                    className="w-[100%] outline-none px-[10px]"></input>
                            </div>
                            {errors.email?.message && <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                                <img className="size-[18px]" src={redClose}></img>
                                <div> {errors.email?.message} </div>
                            </div>}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <div className="font-thin">Set a password</div>
                            <div className="h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex justify-between">
                                <input type={isPasswordHidden ? "password" : "input"}
                                    {...register("password", {
                                        required: "Password is empty",
                                        minLength: {
                                            value: 8,
                                            message: "Password is not strong enought"
                                        }
                                    })}
                                    onFocus={() => setIsPasswordInputFocused(true)}
                                    className="w-[90%] outline-none px-[10px]"></input>
                                <img onClick={() => { setIsPasswordHidden(!isPasswordHidden) }} className="cursor-pointer size-[24px]" src={isPasswordHidden ? greyEye : blueEye}></img>
                            </div>

                            {errors.password &&
                                <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                                    <img className="size-[18px]" src={redClose}></img>
                                    <div> {errors.password?.message} </div>
                                </div>
                            }
                            {!errors.password && isPasswordInputFocused && getValues("password").length >= 8 ?
                                <div className="text-[12px] text-[#00FF00] flex items-center space-x-2">
                                    <img className="size-[14px]" src={greenCheckMark}></img>
                                    <div>Good password</div>
                                </div> : ""
                            }
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-[168px] h-[48px] text-white text-[16px] rounded-[4px] bg-[#007AFF]">Register Now</button>
            </form>

        </div >
    );
}

export default ThirdStageRegistration;
