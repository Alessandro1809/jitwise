
'use client'
interface Props {
    text: string;
    onClick: () => void;
    alt?: string;

}


export const Button = ({text, onClick, alt}: Props) => {
  return (
    <button className=" cursor-pointer bg-jityellow text-white font-bold py-2 px-4 rounded-full  " onClick={onClick} aria-label={alt}>{text}</button>
  )
}
