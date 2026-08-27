interface FormValues {
    [key: string]: any;
}

export function handleChange(e: Event, currentValues: FormValues = {}) {
    const target = e.target as HTMLInputElement;
    const key: string = target.id;
    const value: string = target.value;

    return {
        ...currentValues,
        [key]: value
    };
}
