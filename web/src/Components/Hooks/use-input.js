import { useState } from "react";

function useInput(validateValue) {
    const [enteredValue, setEnterdValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const enteredValueValid = validateValue(enteredValue);
    const enteredValueInValid = !enteredValueValid && isTouched;

    const valueChangeHandler = (e) => {
        setEnterdValue(e.target.value);
    };

    const valueBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnterdValue("");
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        changeHandler: valueChangeHandler,
        blurHandler: valueBlurHandler,
        valueValid: enteredValueValid,
        valueInvalid: enteredValueInValid,
        reset: reset,
    };
}

export default useInput;
