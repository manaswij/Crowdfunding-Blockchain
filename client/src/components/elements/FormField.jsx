import React from 'react'

export default function FormField(props) {        
    return (
        <label className='mb-2 flex flex-col'>
            {props.labelName && (
                <span className='mb-1 font-medium'>{ props.labelName }</span>
            )}
            {props.isTextArea ? (
                <textarea 
                    required
                    value={props.value}
                    onChange={props.handleChange}
                    rows="6" 
                    placeholder={props.placeholder}
                    className='w-full p-4 bg-slate-900 rounded-2xl border border-slate-300 outline-0 focus:border-[#FB998C] placeholder:text-slate-600'
                />
            ) : (
                <input 
                    required
                    value={props.value}
                    onChange={props.handleChange}
                    type={props.inputType} 
                    placeholder={props.placeholder}
                    step={"0.1"}
                    min={props.min}
                    className='w-full h-10 px-4 bg-slate-900 rounded-full border border-slate-300 outline-0 focus:border-[#FB998C] placeholder:text-slate-600'
                />
            )}
        </label>
    )
}
