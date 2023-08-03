import React from "react";
import "@/app/components/forms/boton/boton.css"

const BotonRegister = (props: { texto: string, callBack: Function }) => {
  

    return (

        <button className="botonregister" onClick={function(){props.callBack()}}>{props.texto}</button>
        

    );

}
export default BotonRegister;