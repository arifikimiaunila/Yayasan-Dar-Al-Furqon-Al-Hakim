export function handleChangeFile(e: Event, onChange?: (file: File | null) => void) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    const file = files && files[0] ? files[0] : null;

  if (onChange) {
    onChange(file);
  }

  return file;
}
