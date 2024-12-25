type  TextProps = {
  tujuan: string,
  judul: string,
  tambahan: string
}

export default function TextArea({tujuan, judul, tambahan}:TextProps){
const x: number= tambahan.length;
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
const d: String = tambahan.substring(0, x);
return (
 <>
 <label htmlFor={tujuan} className="sr-only" {...d}>{judul}</label>
 <textarea
   id="editor"
   rows={8}
   className="block w-full px-0 text-sm text-gray-800 bg-white border-0 
     dark:bg-gray-800 dark:focus:ring-0 dark:text-white dark:placeholder-gray-400 overflow-scroll"
   placeholder="Write an article..."
   required
   {...d}
 ></textarea>
  </>
);}
