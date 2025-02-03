export function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const key: string = (e.target as HTMLInputElement).id;
    const value: string = (e.target as HTMLInputElement).value;
    setValues((values: any) => ({
        ...values,
        [key]: value,
    }))
}

