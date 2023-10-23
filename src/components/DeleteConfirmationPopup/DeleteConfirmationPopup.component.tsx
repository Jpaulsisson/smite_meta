"use client";

import React, { Dispatch, SetStateAction } from 'react'
import ReactModal from "react-modal";
import { useUserContext } from '@/contexts/user.context';

type Props = {
  deleteBuild: (id: number) => Promise<void>;
  buildId: number;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}



export default function DeleteConfirmationPopup({ deleteBuild, buildId, modalOpen, setModalOpen }: Props) {
  
  const { appElement } = useUserContext();
  
  return (
    <ReactModal
    isOpen={modalOpen}
    contentLabel='delete confirmation'
    appElement={appElement}
    onRequestClose={() => setModalOpen(false)}
    style={{
      content: {
        zIndex: '999',
        backgroundColor: 'var(--accentBg)',
        color: 'var(--neutralFontColor)',
        width: '80%',
        height: '50%',
        margin: 'auto',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem',
        overflowY: 'scroll'
      },
      overlay: {
        zIndex: '998',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      }
    }}>
      <h2>Are you sure?</h2>
      <button className='bg-neutral p-4 border-thin border-red-500 rounded-lg text-black' onClick={() => deleteBuild(buildId)}>Yes, delete it.</button>
      <button className='bg-neutral p-4 border-thin border-emerald-500 rounded-lg text-black' onClick={() => setModalOpen(false)}>No, cancel that.</button>
    </ReactModal>
  )
}
