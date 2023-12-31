"use client";

import Image from 'next/image';
import DeleteIcon from '@/resources/trash-can.svg';
import EditIcon from '@/resources/edit.svg';
import { useDataContext } from '@/contexts/data.context';
import { useUserContext } from '@/contexts/user.context';
import { getAllUserBuilds, getUserRecentBuilds, deleteBuild } from '@/database/supabase';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DeleteConfirmationPopup from '@/components/DeleteConfirmationPopup/DeleteConfirmationPopup.component';

type Build = {
  id: number, 
  created_at: string,
  user_id: string,
  item_1_id: number | null, 
  item_2_id: number | null, 
  item_3_id: number | null, 
  item_4_id: number | null, 
  item_5_id: number | null, 
  item_6_id: number | null,
  god_id: number | null,
}

// Format "created_at" for use
function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const time = new Date(timestamp);
  const formattedDate =  date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
  const formattedTime = time.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})
  return {
    formattedDate: formattedDate,
    formattedTime: formattedTime
  };
}

// Format query string
const createBuildHref = (build: Build) => {
  const buildQueryString = {
    item1Id: typeof build.item_1_id === 'number' ? String(build.item_1_id) + ',' : '',
    item2Id: typeof build.item_2_id === 'number' ? String(build.item_2_id) + ',' : '',
    item3Id: typeof build.item_3_id === 'number' ? String(build.item_3_id) + ',' : '',
    item4Id: typeof build.item_4_id === 'number' ? String(build.item_4_id) + ',' : '',
    item5Id: typeof build.item_5_id === 'number' ? String(build.item_5_id) + ',' : '',
    item6Id: typeof build.item_6_id === 'number' ? String(build.item_6_id) : '',
    godId: typeof build.god_id === 'number' ? String(build.god_id) : 'null',
  }
  return buildQueryString;
}

export default function SavedUserBuilds() {

  const { currentUserId } = useUserContext();
  const { gods, items } = useDataContext();

  const [recentBuilds, setRecentBuilds] = useState<Build[]>();
  const [buildIdToDelete, setBuildIdToDelete] = useState<number>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Set recentBuilds to all user builds
  const seeAllBuilds = async (user_id: string) => {
    const allBuilds = await getAllUserBuilds(user_id);
    setRecentBuilds(allBuilds as Build[]);
  }

  // Open delete build confirmation/set build ID to be deleted
  const prepForDelete = (id: number) => {
    setBuildIdToDelete(id);
    setModalOpen(true);
  }

  // Delete builds
  const deleteUserBuildFromDB = async (id: number) => {

  if (!id) return;

  const response = await deleteBuild(id);
  const newRecentBuilds = recentBuilds!.filter((build) => build.id !== id);
  setRecentBuilds(newRecentBuilds);
  setModalOpen(false);
}

  // Set recentBuilds to 10 most recent user builds
  useEffect(() => {
    async function getRecentBuilds(currentUserId: string) {
      const builds = await getUserRecentBuilds(currentUserId);
      if (builds!.length > 0) setRecentBuilds(builds as Build[]);
    }
    if (currentUserId) getRecentBuilds(currentUserId);
    
  }, [currentUserId])

  return (
    <div className='p-4 md:p-12'>

      <DeleteConfirmationPopup 
        deleteBuild={deleteUserBuildFromDB} 
        buildId={buildIdToDelete as number} 
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        />
      
      {currentUserId ?
        <div>

          {/* Page header and see all builds button */}

          <h2 className='text-neutral text-7xl'>Your builds</h2>

          {/* Recent builds container */}

          <div className='flex flex-col gap-y-6 max-w-screen-md p-4'>

            {/* Recent builds */}

            {recentBuilds?.map((build) => {

              const { id, god_id, item_1_id, item_2_id, item_3_id, item_4_id, item_5_id, item_6_id } = build;
              const god = gods?.find(god => god.id === god_id);
              const item1 = items?.find(item => item.id === item_1_id);
              const item2 = items?.find(item => item.id === item_2_id);
              const item3 = items?.find(item => item.id === item_3_id);
              const item4 = items?.find(item => item.id === item_4_id);
              const item5 = items?.find(item => item.id === item_5_id);
              const item6 = items?.find(item => item.id === item_6_id);
              const thisBuild = [item1, item2, item3, item4, item5, item6];
              const timestamp = formatTimestamp(build.created_at);
              const buildQueryString = createBuildHref(build);
              return (
                <div key={id} className='pb-4 grid grid-cols-5 grid-rows-auto gap-2 border-b-thin border-b-primaryFontColor'>
                  
                  {/* build header and god */}

                  {typeof god !== 'undefined' ?
                  <>
                    <div className='col-span-full text-start text-neutral text-lg grid grid-cols-4 grid-rows-2'>
                      <h2 className='col-start-1 col-span-2'>{god.name} build</h2>
                      <aside className='col-start-1 col-span-2 text-xs'>Saved: {timestamp.formattedDate} {timestamp.formattedTime} </aside>
                      <div className='col-start-4 row-span-full justify-self-end flex gap-3 items-center'>
                        <Link
                          href={`/CreateBuild?build=${buildQueryString.item1Id}${buildQueryString.item2Id}${buildQueryString.item3Id}${buildQueryString.item4Id}${buildQueryString.item5Id}${buildQueryString.item6Id}&god=${buildQueryString.godId}`} >
                          <Image src={EditIcon} alt='trash can delete button' width={25} height={25}/>
                        </Link>
                        <button
                        // onClick={() => deleteUserBuildFromDB(build.id)}
                        onClick={() => prepForDelete(build.id)}
                        className=''>
                          <Image src={DeleteIcon} alt='trash can delete button' width={25} height={25}/>
                        </button>
                        
                      </div>
                    </div>
                    <div className='col-span-2 row-span-2 max-h-36 aspect-square'>
                    <Image
                      src={god.pic_url} alt={god.name} width={500} height={500}
                      className='object-cover object-top w-full h-full'
                      />
                    </div>
                  </>
                  :
                  <>
                    <div className='col-span-full text-start text-neutral text-lg grid grid-cols-3 grid-rows-2'>
                      <h2 className='col-start-1 col-span-2'>Non-specific build</h2>
                      <aside className='col-start-1 col-span-2 text-xs'>Saved: {timestamp.formattedDate} {timestamp.formattedTime} </aside>
                      <button 
                        onClick={() => deleteUserBuildFromDB(build.id)}
                        className='col-start-3 row-span-full justify-self-end'>
                        <Image src={DeleteIcon} alt='trash can delete button' width={25} height={25}/>
                      </button>
                    </div>
                    <div className='col-span-2 row-span-2 max-h-36 aspect-square'>
                      <span className='w-full h-full text-neutral text-lg'>No god saved</span>
                    </div>
                  </>
                  }

                  {/* items */}

                  {thisBuild.map((item, index) => {
                    return (
                    <div key={index}>
                      {typeof item !== 'undefined' ?
                      <div className='max-h-20 aspect-square border-thin border-neutral rounded-sm self-center'>
                        <Image
                          src={item.pic_url} alt={item.name} width={100} height={100}
                          className='object-cover object-top w-full h-full'
                          />
                      </div>
                      :
                      <div className='border-thin border-primaryFontColor aspect-square max-h-20 flex items-center justify-center text-neutral text-xs'>
                        <p>No item</p>
                      </div>
                      }
                    </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <button 
            onClick={() => seeAllBuilds(currentUserId)}
            className='p-4 text-lg text-primaryFontColor underline underline-offset-2 active:brightness-50'>Load all builds</button>
        </div>
      :
        <div className='flex flex-col gap-5'>
          <h2 className='text-neutral text-5xl' >
            This page is for signed in users.
          </h2>
          <Link href={'/SignUp'} className='hover:underline text-3xl text-primaryFontColor'> Click here to sign up.</Link>
        </div>
        }
    </div>
  )
}
