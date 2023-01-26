import { Alert, Button, CloseButton, MultiSelect, Select, TextInput } from "@mantine/core";
import { useState } from "react"

function PopupGroup({socket, username, handleclose}) {
    const [selectValue, setSelectValue] = useState("");
    const [inputName, setInputName] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)


    const newGroup = (name : string, privacy : string, password : string) => {
        if(!privacy)
            throw "No privacy selected";
        if(!name)
            throw "Please, type a name... (rly?)";
        if(privacy === "protected" && !password)
            throw "Please, type a password... (rly?)";

        const data = {
            name : name,
            privacy : privacy,
            password : password ? password : null,
        };
        socket.emit("chat.newgroup", data);
        handleclose();
    };

    
    return (
            <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
            <header className="pt-6 pb-4 px-5 border-b border-gray-200">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                        <a className="inline-flex items-start mr-3" href="#0">
                            <img className="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                        </a>
                        <div className="pr-1">
                            <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                <h2 className="text-xl leading-snug font-bold">John Decorte</h2>
                            </a>
                            <a className="block text-sm font-medium hover:text-indigo-500" href="#0">@jdecorte</a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="py-3 px-5">

                <CloseButton onClick={ () => handleclose() } className="content-end" aria-label="Close modal" />
                <TextInput
                    label="Group Name:"
                    placeholder="Your group name..."
                    onChange={event => setInputName(event.target.value)}
                />
                <Select
                    label="Type of group:"
                    placeholder="Pick one"
                    onChange={setSelectValue}
                    data={[
                        { value: 'public', label: 'Public' },
                        { value: 'protected', label: 'Protected' },
                    ]}
                />
                {
                    selectValue === "protected" &&
                    <TextInput
                        label="Password:"
                        placeholder="Password..."
                        onChange={event => setInputPassword(event.target.value)}
                    />
                }


            </div>
            <button onClick={() => newGroup(inputName, selectValue,inputPassword)} className="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                <span>Create</span>
            </button>
            </div>
    )
}
export default PopupGroup;