import HeaderProfileForm from "./HeaderProfileForm";
import letter from "../recourses/letter.svg";
import phone from "../recourses/phone.svg";
import dropDown from "../recourses/drop-down.svg";
import skype from "../recourses/skype.svg";
import facebook from "../recourses/facebook.svg";
import plus from "../recourses/plus.svg";
import redClose from "../recourses/red-close.svg";
import { useForm } from 'react-hook-form';

function SecondStageProfile({ updatePersonData, changeIndexStage }) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        < div className="w-[456px] space-y-8" >
            <HeaderProfileForm></HeaderProfileForm>
            <form className="space-y-8" onSubmit={handleSubmit((data) => {
                updatePersonData("email", data.email);
                updatePersonData("phoneNuber", data.inputPhoneNumberBody);
                updatePersonData("facebookProfile", data.facebook);
                updatePersonData("skypeProfile", data.skype);

                changeIndexStage(1);
            })}>
                <div className="w-[100%] p-8 border-[1px] border-[#E2E4E5] space-y-8 rounded-[8px]">
                    <div className="flex flex-col space-y-6">
                        <div class="flex h-[46px] flex-col">
                            <div className="font-bold text-[18px]">Contacts</div>
                            <div className="font-thin text-[12px]">These contacts are used to inform about others</div>
                        </div>

                        <div className="space-x-2 h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex items-center">
                            <img className="w-[20px] h-[16px]" src={letter}></img>
                            <input  {...register("email", {
                                required: "Email is empty",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Email is not valid"
                                }
                            })}
                                className="w-[90%] h-[100%] outline-none px-[16px]"></input>
                        </div>
                        {errors.email?.message && <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                            <img className="size-[18px]" src={redClose}></img>
                            <div> {errors.email?.message} </div>
                        </div>}

                        <div className="space-x-2 h-[44px] w-[100]% border-b-[1px] border-[#E2E4E5] flex items-center">
                            <img className="size-[18px]" src={phone}></img>
                            <input {...register("inputPhoneNumberBody", {
                                required: "Number required",
                                minLength: { value: 10, message: "Should contain over 10 digits" }
                            })} className="w-[90%] h-[100%] outline-none px-[16px]"></input>
                        </div>
                        {errors.inputPhoneNumberBody?.message && <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                            <img className="size-[18px]" src={redClose}></img>
                            <div> {errors.inputPhoneNumberBody?.message} </div>
                        </div>}
                    </div>

                    <div className="flex flex-col space-y-6">
                        <div class="flex h-[46px] flex-col">
                            <div className="font-bold text-[18px]">Social Network</div>
                            <div className="font-thin text-[12px]">Indicate the desired comunication method</div>
                        </div>

                        <div className="flex justify-between">
                            <div className=" h-[44px] w-[188px] border-b-[1px] border-[#E2E4E5] flex items-center pr-[10px]">
                                <img className="size-[18px]" src={skype}></img>
                                <input value="Skype" className="w-[100%] outline-none px-[16px]"></input>
                                <img src={dropDown}></img>
                            </div>
                            <div className="focus-within:border-[#007AFF] h-[44px] w-[188px] border-b-[1px] border-[#E2E4E5] flex items-center">
                                <input {...register("skype")} placeholder="@profile" className="w-[100%] outline-none px-[16px]"></input>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className=" h-[44px] w-[188px] border-b-[1px] border-[#E2E4E5] flex items-center pr-[10px]">
                                <img className="size-[18px]" src={facebook}></img>
                                <input defaultValue="Facebook" className="w-[100%] outline-none px-[16px]"></input>
                                <img src={dropDown}></img>
                            </div>
                            <div className="focus-within:border-[#007AFF] h-[44px] w-[188px] border-b-[1px] border-[#E2E4E5] flex items-center">
                                <input {...register("facebook")} placeholder="@profile" className="w-[100%] outline-none px-[16px]"></input>
                            </div>
                        </div>


                    </div>

                    <div className="flex space-x-2">
                        <img src={plus}></img>
                        <div className="text-[#007AFF] font-medium">Add more</div>
                    </div>
                </div>
                <button className="w-[137px] text-[16px] h-[48px] border-[1px] border-[#BBBFC1]">Go Next →</button>
            </form>
        </div>
    )
}

export default SecondStageProfile;