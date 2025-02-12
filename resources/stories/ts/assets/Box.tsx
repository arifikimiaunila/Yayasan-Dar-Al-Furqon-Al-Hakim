export interface BoxProps{
    fill: string;
    picture: Object;
    state: string;
}

const Box: React.FC<BoxProps> = () => (
  <>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="icon"
    fill="#000"
    viewBox="0 0 32 32"
  >
    <path d="M28 8h-4V4a2.002 2.002 0 0 0-2-2H4a2.002 2.002 0 0 0-2 2v18a2.002 2.002 0 0 0 2 2h4v4a2.002 2.002 0 0 0 2 2h18a2.002 2.002 0 0 0 2-2V10a2.002 2.002 0 0 0-2-2Zm-6 14h-8v-5h8Zm0-7h-8v-5h8Zm-10 0H4v-5h8ZM22 4v4H4V4ZM4 22v-5h8v5Zm24 6H10v-4h12a2.002 2.002 0 0 0 2-2V10h4Z" />
    <path
      id="_Transparent_Rectangle_"
      d="M0 0h32v32H0z"
      className="fill-none"
      data-name="&lt;Transparent Rectangle&gt;"
    />
  </svg>
  </>
);

export default Box;
