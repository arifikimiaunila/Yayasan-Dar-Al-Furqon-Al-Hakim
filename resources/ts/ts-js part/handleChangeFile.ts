import { ref } from 'vue';

// 1. Definisikan state untuk menyimpan file di Vue 3
const fileState = ref<File | null>(null);

// 2. Definisikan emit jika fungsi ini memicu event custom ke parent component (opsional)
const emit = defineEmits<{
  (e: 'change', file: File | null): void
}>();

// 3. Fungsi Handler File Change
export function handleChangeFile(e: Event) {
    // Di tipe data DOM standar, target di-cast ke HTMLInputElement
    const target = e.target as HTMLInputElement;
    const files = target.files;
    const file = files && files[0] ? files[0] : null;

    // Mengubah nilai state di Vue 3
    fileState.value = file;

    // Memicu fungsi callback / emit ke parent component (seperti onChange?.(file) di React)
    emit('change', file);
}
