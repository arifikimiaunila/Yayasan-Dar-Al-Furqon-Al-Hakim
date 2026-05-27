import { ref } from 'vue';

// Definisikan tipe data state Anda (opsional, tapi bagus untuk TS)
interface FormValues {
    [key: string]: any;
}

// Inisialisasi state di Vue 3 menggunakan ref
const values = ref<FormValues>({});

export function handleChange(e: Event) {
    // Di Vue/TS, kita cast e.target sebagai HTMLInputElement
    const target = e.target as HTMLInputElement;
    const key: string = target.id;
    const value: string = target.value;

    // Cara memperbarui reactive state di Vue 3
    values.value = {
        ...values.value,
        [key]: value
    };
}
