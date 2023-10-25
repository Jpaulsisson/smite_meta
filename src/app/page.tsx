
import BuildsDropdown from '../components/BuildsDropdown/BuildsDropdown.component';
import GodsItemsDropdown from '../components/GodsItemsDropdown/GodsItemsDropdown.component';
import ProsDropdown from '../components/ProsDropdown/ProsDropdown.component';

export default function Home() {

  return (
    <main className='m-auto w-full h-full'>
      <section className='grid grid-cols-1 md:grid-cols-3 items-center gap-2 w-11/12 md:max-w-5xl m-auto mt-12 min-h-[60dvh]'>
        <BuildsDropdown />
        <GodsItemsDropdown />
        <ProsDropdown />
      </section>
    </main>
  )
}
