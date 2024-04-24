import RegistrationForm from "./RegistrationForm";
import logo from "../recourses/logo.svg"
import largeClose from "../recourses/large-close.svg"
import { useState } from "react";
import ProfileForm from "./ProfileForm";

function Main() {
    const [registrationCompleted, setRegistrationCompleted] = useState(false);

    const setCompleted = (value) => {
        setRegistrationCompleted(value);
    }

    return (
        <div className="flex justify-between py-[50px] px-[100px]">
            <div className="flex h-[18px] items-center">
                <img src={logo}></img>
                <div className="font-bold ml-[10px]"> COMPANY NAME </div>
            </div>
            <div>
                {!registrationCompleted
                    ? <RegistrationForm setCompleted={setCompleted}></RegistrationForm>
                    : <ProfileForm></ProfileForm>}
            </div>
            <div>
                <img className="cursor-pointer" src={largeClose}></img>
            </div>
        </div>
    )
}

export default Main;