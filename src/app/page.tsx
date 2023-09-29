
import BuildsDropdown from '../components/BuildsDropdown/BuildsDropdown.component';
import GodsItemsDropdown from '../components/GodsItemsDropdown/GodsItemsDropdown.component';
import ProsDropdown from '../components/ProsDropdown/ProsDropdown.component';

export default function Home() {

  return (
    <main className='m-auto w-full h-full'>
      <section className='flex flex-col md:flex-row md:max-w-[80%] m-auto items-center justify-center mt-12 gap-6 md:gap-8 min-h-[65dvh]'>
        <BuildsDropdown />
        <GodsItemsDropdown />
        <ProsDropdown />
      </section>
    </main>
  )
}
