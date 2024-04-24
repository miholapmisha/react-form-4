import { useRef, useState } from 'react';
import pen from '../recourses/pen.svg';
import reload from '../recourses/reload.svg';
import redClose from '../recourses/red-close.svg';
import RegistrationHeader from './RegistrationHeader';
import { useForm } from 'react-hook-form';

function SecondStageRegistration({ updateIndexStageOn, phoneNumber }) {
    const correctPin = "1234";
    const pinDigits = correctPin.length;
    const inputRefs = useRef([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const pinRegisters = () => {
        let array = [];
        for (let i = 0; i < pinDigits; i++) {
            const { ref, ...rest } = register(`pinDigit${i}`, { required: true });
            array.push({ ref, rest });
        }
        return array;
    }

    const doesPincodeContainsErrors = () => {
        return Object.entries(errors).length > 0 ? true : false;
    }

    const handleInputChange = (e, index) => {
        e.target.value = e.target.value.replace(/\D/g, "");
        const { value } = e.target;
        setErrorMessage('');
        if (value.length > 1) {
            index = 0
            inputRefs.current[index].blur();
        } else {
            if (value !== '' && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const isCorrectPin = () => {
        let result = inputRefs.current.map(ref => ref.value).join('');
        if (result !== correctPin) {
            return false;
        }
        return true;
    }

    const handleFormSubmission = () => {

        if (!isCorrectPin()) {
            setErrorMessage('Incorrect PIN. Please try again.');
        } else {
            updateIndexStageOn(1);
        }
    }

    return (
        <div className="w-[456px] flex flex-col space-y-8">
            <RegistrationHeader></RegistrationHeader>
            <form className="w-[100%] space-y-8" onSubmit={handleSubmit((data) => {
                handleFormSubmission();
            })}>
                <div className="w-[100%] h-[80px] border-[1px] border-[#E2E4E5] rounded-[8px] py-[10px] px-[20px] space-y-[5px]">
                    <div className="text-[18px]">{phoneNumber}</div>
                    <div className="flex justify-between">
                        <div className="text-[13px] font-thin">Number not confirmed yet</div>
                        <div className="cursor-pointer"> <img onClick={() => { updateIndexStageOn(-1); }} className="size-[18px]" src={pen} alt="pen"></img> </div>
                    </div>
                </div>
                <div className="flex w-[100%]">
                    <div className="w-[296px] space-y-2">
                        <div className='space-y-2'>
                            <div className="text-[13px]">Confirmation code</div>
                            <div className="py-[2px] px-[8px] border-b-[1px] border-[#007AFF]">
                                {Array.from({ length: pinDigits }).map((_, index) => (
                                    <input
                                        key={index}
                                        {...pinRegisters()[index].rest}
                                        onChange={(event) => handleInputChange(event, index)}
                                        ref={(el) => {
                                            pinRegisters()[index].ref(el);
                                            inputRefs.current[index] = el;
                                        }}
                                        className='text-[18px] text-center focus:placeholder-transparent outline-none w-[32px]'
                                        maxLength="1"
                                        placeholder='—'
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="text-[14px] font-thin">
                            Confirm phone number with code from sms message
                        </div>
                        {doesPincodeContainsErrors() &&
                            <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                                <img className="size-[18px]" src={redClose}></img>
                                <div> All digits required!</div>
                            </div>
                        }
                        {errorMessage &&
                            <div className="text-[12px] text-[#FF0000] flex items-center space-x-2">
                                <img className="size-[18px]" src={redClose}></img>
                                <div>{errorMessage}</div>
                            </div>
                        }

                    </div>
                    <div className="flex w-[160px] items-center justify-center">
                        <img className='cursor-pointer' src={reload} alt="reload"></img>
                    </div>
                </div>
                <button type="submit" className="w-[137px] h-[48px] border-[1px] border-[#BBBFC1]">Confirm</button>
            </form>
        </div>
    );
}

export default SecondStageRegistration;
