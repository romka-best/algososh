import React from 'react';

export function useForm(inputValues: Record<string, string>) {
    const [ values, setValues ] = React.useState(inputValues);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}
