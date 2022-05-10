import { useEffect } from "react";

//Click fuera de componente
const useOutiseClick = (ref, callback) => {
    //Manejador
    const handleClick = e => { 
        //Si la referencia continua y contiene el target
        if (ref.current && !ref.current.contains(e.target)) {
            //Realizamos el callback;
            callback();
        }
    };

    //Añadimos los eventos de escucha click
    useEffect(() => {
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    });
};

export default useOutiseClick;