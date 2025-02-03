export default function handleChangeFile(e: React.FormEvent<HTMLInputElement>) {
    const files = e.currentTarget?.files as FileList;
    const file = files[0] || null;

    setFile(file);
    onChange?.(file);
  }

   
 


