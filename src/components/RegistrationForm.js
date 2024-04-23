import { useEffect, useState } from "react";
import { Tab } from '@headlessui/react'
import FirstStageRegistration from "./FirstStageRegistration";
import SecondStageRegistration from "./SecondStageRegistration";
import ThirdStageRegistration from "./ThirdStageRegistration";

function RegistrationForm({ setCompleted }) {
    const [indexStage, setIndexStage] = useState(0);
    const [selectedTabs, setSelectedTabs] = useState([false, false, false]);
    const [enteredNumber, setEnteredNumber] = useState("");

    const savePhoneNumber = (number) => {
        setEnteredNumber(number);
    }

    const updateSelectedTab = (index, value) => {
        selectedTabs[index] = value;
    }

    const updateIndexStageOn = (number) => {
        if (indexStage >= 2) {
            setIndexStage(0);
        } else {
            setIndexStage(prevIndex => prevIndex + number);
        }
    };

    useEffect(() => {

        const updatedTabs = [...selectedTabs];
        for (let i = indexStage + 1; i < updatedTabs.length; i++) {
            if (updatedTabs[i]) {
                updatedTabs[i] = false;
            }
        }

        setSelectedTabs(updatedTabs);

    }, [JSON.stringify(selectedTabs)])

    return (
        <Tab.Group selectedIndex={indexStage}>
            <Tab.List>
                <div className="flex items-center h-[16px] w-[456px]">
                    <RoundStageTab index={0} updateSelectedTab={updateSelectedTab} tabs={selectedTabs}></RoundStageTab>
                    <div class="flex items-center mx-2">
                        <div className="w-[40px] h-[1px] bg-[#B9B9C3]"></div>
                    </div>
                    <RoundStageTab index={1} updateSelectedTab={updateSelectedTab} tabs={selectedTabs}></RoundStageTab>
                    <div class="flex items-center mx-2">
                        <div className="w-[40px] h-[1px] bg-[#B9B9C3]"></div>
                    </div>
                    <RoundStageTab index={2} updateSelectedTab={updateSelectedTab} tabs={selectedTabs}></RoundStageTab>
                </div>
            </Tab.List>
            <Tab.Panels className="mt-14">

                <Tab.Panel>
                    <FirstStageRegistration updateIndexStageOn={updateIndexStageOn} updateNumber={savePhoneNumber} phoneNumber={enteredNumber}></FirstStageRegistration>
                </Tab.Panel>

                <Tab.Panel>
                    <SecondStageRegistration updateIndexStageOn={updateIndexStageOn} phoneNumber={enteredNumber}></SecondStageRegistration>
                </Tab.Panel>
                <Tab.Panel>
                    <ThirdStageRegistration setCompleted={setCompleted} phoneNumber={enteredNumber}></ThirdStageRegistration>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    )
}

function RoundStageTab({ index, updateSelectedTab, tabs }) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Tab className={({ selected }) => {
            let itWasSelected = tabs[index];
            if (selected) {
                updateSelectedTab(index, true);
            }

            if (itWasSelected || selected) {
                return classNames(
                    "w-[12px] h-[12px] rounded-[50px] border-[1px] border-[#B9B9C3]", "bg-[#007AFF]")
            } else {
                return classNames(
                    "w-[12px] h-[12px] rounded-[50px] border-[1px] border-[#B9B9C3]")
            }
        }
        }>
        </Tab>
    );
}

export default RegistrationForm;