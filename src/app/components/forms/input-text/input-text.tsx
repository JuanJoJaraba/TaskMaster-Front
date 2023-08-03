"use client";
import React, { useEffect, useState } from "react";
import "@/app/components/forms/input-text/input-text.css"


export default function InputText(props: { hint: string, type: string, id: string, handleInput: any[], value?: string }) {

    const [text, setText] = useState('');

    useEffect(() => { if (props.value != null) { setText(props.value) } }, [])
    return (

        <input className="InputText" type={props.type} placeholder={props.hint} id={props.id} value={text} name={props.id} onChange={e => {
            setText(e.target.value)
            props.handleInput[0](e, props.handleInput[1], props.handleInput[2])
        }} />

    )

}