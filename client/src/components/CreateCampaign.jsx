import React, { useState } from 'react'
import FormField from './FormField'
import { useStateContext } from '../context'
import { ethers } from 'ethers'
import {checkIfImage} from "../utils"
import Loader from './Loader'

export default function CreateCampaign(props) {
    const { createCampaign } = useStateContext()
    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        name: "",
        title: "",
        description: "",
        target: "",
        deadline: "",
        image: "",
    })
    const handleFormFieldsChange = (fieldName, e) => {
        setForm({...form, [fieldName]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        // revisa si la imagen existe
        checkIfImage(form.image, async(exist) => {
            if(exist) {
                setIsLoading(true)

                // envia datos de form y transforma ETH a wei
                await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)}) 
                
                setIsLoading(false)
                props.setVisible(false)
                window.location.reload(false);
            } else {
                alert("Provide a valid image URL")
                setForm({...form, image: ""})
            }
        })
    }

    return (
        <div className='fixed top-0 left-0 z-30 w-full h-full p-4 flex items-center justify-center backdrop-blur overscroll-contain'>
            {isLoading && <Loader />}

            <div className='
                w-full max-w-xl h-full max-h-[750px] m-auto p-6 rounded-lg bg-stone-800 overflow-y-auto
            '>
                <div className='mb-4 flex items-center justify-between'>
                    <h2 className='text-[20px] font-semibold'>Start a new campaign!</h2>
                    <button 
                        type='button' 
                        onClick={() => {
                            props.setVisible(false)
                            document.body.style.overflow = "auto"
                        }}>
                        <img src="/icons/close.png" alt="close" width={"18px"} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <FormField 
                        labelName = "Name"
                        placeholder = "Your creator's name"
                        inputType = "text"
                        value = {form.name}
                        handleChange = {(e) => handleFormFieldsChange("name", e)}
                    />
                    <FormField 
                        labelName = "Campaign Title*"
                        placeholder = "Write an engaging title"
                        inputType = "text"
                        value = {form.title}
                        handleChange = {(e) => handleFormFieldsChange("title", e)}
                    />
                    <FormField 
                        labelName = "Story"
                        placeholder = "Tell them your story"
                        isTextArea
                        value = {form.description}
                        handleChange = {(e) => handleFormFieldsChange("description", e)}
                    />
                    <FormField 
                        labelName = "Goal*"
                        placeholder = "ETH"
                        inputType = "number"
                        value = {form.target}
                        handleChange = {(e) => handleFormFieldsChange("target", e)}
                    />
                    <FormField 
                        labelName = "End Date"
                        placeholder = ""
                        inputType = "date"
                        min = {new Date().toISOString().split('T')[0]}
                        value = {form.deadline}
                        handleChange = {(e) => handleFormFieldsChange("deadline", e)}
                    />
                    <FormField 
                        labelName = "Campaign Image"
                        placeholder = "Paste image URL of your campaign"
                        inputType = "url"
                        value = {form.image}
                        handleChange = {(e) => handleFormFieldsChange("image", e)}
                    />
                    
                    <button type='submit' className='mt-2 w-full btn-primary'>Submit new campaign</button>
                </form>
            </div>
        </div>
    )
}
