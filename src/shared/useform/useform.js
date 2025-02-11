import { useState } from "react";

/**
 * @typedef {Object} useFormObject
 * @property {function} handleChange
 *          Lomakekentän onChange-käsittelijä
 * @property {function} handleSubmit
 *          Lomakkeen onSubmit-käsittelijä
 * @property {function} resetValues
 *          Alustaa lomakkeen tiedot alkutilaan.
 * @property {function} setValues
 *          Lomaketietojen päivitysfunktio, jota ei normaalisti tarvita.
 * @property {Object} values    
 *          Lomakkeen tiedot
 */

/**
 * React Hook, joka huolehtii lomakekenttien muutoksista ja 
 * lomaketietojen lähetyksestä.
 * 
 * @example
 * import useForm from './useform.js'
 *
 * // Määritellään lomakkeen lähetyksen käsittelijä.
 * const submit = () => {
 *   console.log(values)
 * }
 *
 * // Määritellään lomakkeen alkutilanne.
 * const initial = { word: 'sana' }
 *
 * // Alustetaan useForm-käsittelijä.
 * const {values, handleChange, handleSubmit } = useForm(submit, initial, false)
 *
 * // Renderöidään lomake, joka käyttää useForm-hooksia.
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input type='input' name='word' value={values.word} onChange={handleChange} />
 *     <button type='submit'>LÄHETÄ</button>
 *   </form>
 * )
 * 
 * @param {function} callback
 *         Lomakekäsittelijä, jota kutsutaan, kun lomakkeen tiedot lähetetään. 
 * @param {Object} [initialState = {}]
 *         Lomakekenttien alkuarvot 
 * @param {boolean} [resetOnSubmit = true]
 *         Lomakkeen alustus alkutilanteeseen tietojen lähetyksen yhteydessä 
 * @returns {useFormObject}
 *         Lomakekäsittelijän funktiot ja lomakkeen tiedot 
 */


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