import { useEffect, useState } from "react";

// Tekee muuttujasta JSON-merkkijonon
const decode = (value) => {
    return JSON.stringify(value);
}

// Purkaa JSON-merkkijonon muuttujaksi
const encode = (value) => {
    return JSON.parse(value);
}

const useLocalStorage = (key, defaultState) => {

    // Määritellään tilamuuttujat ja haetaan arvoksi joko
    // localStorage-muuttujan arvo tai alkuarvo.
    const [value, setValue] = useState(
        encode(localStorage.getItem(key) || null) || defaultState
    );

    // Tallennetaan tilamuuttuja localStorageen aina, 
    // kun arvo muuttuu.
    useEffect(() => {
        localStorage.setItem(key, decode(value));
    }, [value]);

    // Alkuarvojen palautus
    const resetValue = () => {
        setValue(defaultState);
    }

    return [value, setValue, resetValue];

}

export default useLocalStorage;