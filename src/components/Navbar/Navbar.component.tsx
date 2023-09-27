import { Exo_2 } from "next/font/google";
import Image from "next/image";
import AvatarPlaceHolder from "../../resources/avatar.svg"
import SmiteLogo from '../../resources/smite_logo.png';


const exoFont = Exo_2({
  weight: '200',
  subsets: ["latin"]
});


export default function Navbar() {
  return (
    <nav className={`p-8 mt-2 grid grid-cols-10 items-center ${exoFont.className} text-center bg-slate-900/40`}>
      <h1 className={`col-start-4 col-end-8 md:col-start-1 md:col-end-2 text-font-color text-3xl flex flex-col items-center`}>
        <a href="/" className="w-full h-full">
          <Image src={SmiteLogo} alt='Smite logo' />
        </a>
        META
      </h1>
      <h2 className="text-neutral text-6xl hidden md:block md:col-start-3 md:col-end-9">Welcome, You Rock!</h2>
      <a className="col-start-10">
        <Image src={AvatarPlaceHolder} alt='avatar placeholder'  className='max-h-[65px]' />
      </a>
    </nav>
  )
}
