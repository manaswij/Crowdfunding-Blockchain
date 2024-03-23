import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from './FormField'
import { useStateContext } from '../context'
import { ethers } from 'ethers'
import {checkIfImage} from "../utils"

export default function CreateCampaign(props) {
    const { createCampaign } = useStateContext()
    const navigate = useNavigate()
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
                navigate("/campaigns")
                console.log(form);
            } else {
                alert("Provide a valid image URL")
                setForm({...form, image: ""})
            }
        })
    }

    return (
        <div className='
            fixed top-0 left-0 z-10 w-full h-full p-4 backdrop-blur
        '>
            <div className='
                w-full max-w-3xl m-auto p-8 rounded-lg bg-[url("/images/bg-rocketlaunch.webp")] bg-no-repeat bg-cover
            '>
                <h2>Start a new campaign!</h2>
                <form action="" onSubmit={handleSubmit}>
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
                        placeholder = "dd/mm/yyyy"
                        inputType = "date"
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
                    <button type='submit'>Submit new campaign</button>
                    <button type='button' onClick={() => {props.setVisible(false)}}>Close</button>
                </form>
            </div>
        </div>
    )
}
