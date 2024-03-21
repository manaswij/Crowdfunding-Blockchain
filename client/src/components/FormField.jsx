import React from 'react'

export default function FormField(props) {        
    return (
        <label className='flex flex-col'>
            {props.labelName && (
                <span>{ props.labelName }</span>
            )}
            {props.isTextArea ? (
                <textarea 
                    required
                    value={props.value}
                    onChange={props.handleChange}
                    rows="10" 
                    placeholder={props.placeholder}
                    className='text-black'
                />
            ) : (
                <input 
                    required
                    value={props.value}
                    onChange={props.handleChange}
                    type={props.inputType} 
                    placeholder={props.placeholder}
                    step={"0.1"}
                    className='text-black'
                />
            )}
        </label>
    )
}
