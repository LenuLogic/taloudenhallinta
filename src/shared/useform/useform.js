import { useState } from "react";

const useForm = (callback, initialState={}, resetOnSubmit=true) => {

    // Esitellään useState-hooks-funktio, johon lomakkeelle syötetty tieto tallennetaan.
    const [values, setValues] = useState(initialState);

    // handleChange tallentaa kentän tiedot kentän nimellä state-muuttujaan
    const handleChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;
        setValues(prevValues => ({...prevValues, [key]: value}));
    }

    // handleSubmit estää oletustoiminnon ja kutsuu callback-funktiota
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback();
        if (resetOnSubmit) resetValues;
    }

    // resetValues
    const resetValues = () => {
        setValues(initialState);
    }

    // return palauttaa lomakekäsittelijät ja tilamuuttujan arvot
    return {
        handleChange,
        handleSubmit,
        resetValues,
        setValues,
        values
    }
}

export default useForm;