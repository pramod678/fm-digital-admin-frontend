import { useEffect, useState } from "react";

function useCaptcha() {
    const [captcha, setCaptcha] = useState("");
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const generateCaptcha = () => {
        const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += alpha.charAt(Math.floor(Math.random() * alpha.length));
        }
        setCaptcha(code);
    };

    useEffect(()=>{
        generateCaptcha()
        setInput("")
        setError("");
        setSuccess("")
    }, [])

    const checkValidCaptcha = () => {
        const string1 = captcha.replace(/\s/g, "");
        const string2 = input.replace(/\s/g, "");
        if (string1 === string2) {
            setSuccess("Form is validated Successfully");
            setError("");
            return true
        } else {
            setError("Please enter a valid captcha.");
            setSuccess("");
        }
    };

    const refreshCaptcha = () => {
        generateCaptcha();
        setInput("");
        setError("");
        setSuccess("");
    };

    const handleInputChange = (value:any) => {
        setInput(value);
        setError("");
        setSuccess("");
    };

    return {
        captcha,
        input,
        error,
        success,
        generateCaptcha,
        checkValidCaptcha,
        refreshCaptcha,
        handleInputChange,
    };
}

export default useCaptcha;
