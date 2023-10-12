'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import { getPlayer, getXboxPlayer } from '@/database/hirez-calls';
import { addMember } from '@/database/supabase';
import Steam from '@/resources/steam.svg';
import Xbox from '@/resources/xbox.svg';
import PlayStation from '@/resources/playstation.svg';
import Nintendo from '@/resources/nintendo.svg';

export default function LinkAccount() {

  const [usernameInput, setUsernameInput] = useState('');
  const [platform, setPlatform] = useState('Steam');
  const [smiteUsernameInput, setSmiteUsernameInput] = useState('');
  const [avatarPhoto, setAvatarPhoto] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.target.value);
  }

  const handlePlatformChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlatform(e.target.value)
  }

  const handleSmiteUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSmiteUsernameInput(e.target.value);
  }

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatarPhoto(e.target.value);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // first we need to call the hirez api and check the given in-game name to make sure we get a match
    // if we get the player back correctly then we can push the rest to our database
    let playerInfo = null;
    // if (platform !== 'Xbox') {
    //   playerInfo = await getPlayer(smiteUsernameInput);  
    // }
    if (platform === 'Xbox') {
      playerInfo = await getXboxPlayer(smiteUsernameInput);
    }
    if (playerInfo.length === 0) {
      return alert('That name could not be found in the Smite Database. Double check your spelling and capitalization as it must match EXACTLY how it appears in Smite.');
    }
    console.log(playerInfo);
  }

  // const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {

  //   const { email, password, confirm } = formData;

  //   if (password !== confirm) {
  //     alert('You rock! Cancel That! JK, your password and confirm password are different. Try again');
  //     return;
  //   }
  const options = {
    method: 'POST',
    body: JSON.stringify({ name: 'Pro1337Shot'})
  }

  const getPlayer = async() => {
    const player = await fetch('/api/smite/handleGetPlayer/', options);
    
  }

  return (
    <div className="m-auto flex flex-col items-center justify-center text-neutral">
      {/* Intro */}

      <h2 className="text-primaryFontColor mb-4 text-center p-2">
        This will allow us to save you as a member of our site and show you your
        match history
      </h2>

      {/* Form start */}

      <form
        onSubmit={handleSubmit}
        id="member-form"
        className="flex flex-col gap-3 md:gap-6 w-11/12 md:w-1/3 mb-20"
      >
        <label htmlFor="username">Name *</label>
        <input
          required
          onChange={handleNameChange}
          value={usernameInput}
          type="text"
          name="username"
          id="username"
          placeholder="What should we call you?"
          className="p-2 text-black text-xl placeholder:text-sm placeholder:text-black/60"
        />
        <fieldset className="grid grid-cols-2 gap-6 md:flex md:justify-evenly  border-thin border-neutral p-2 pb-6">
          <legend className="p-2">Choose a platform *</legend>
          <div className="flex gap-2 items-center">
            <input
              onChange={handlePlatformChange}
              type="radio"
              id="steam"
              name="platform"
              value={'Steam'}
              defaultChecked
            />
            <label htmlFor="steam">
              Steam
              <Image
                src={Steam}
                alt="Steam logo"
                width={50}
                height={50}
                className="rounded-full bg-neutral"
              />
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              onChange={handlePlatformChange}
              type="radio"
              id="xbox"
              name="platform"
              value={'Xbox'}
            />
            <label htmlFor="xbox">
              Xbox
              <Image
                src={Xbox}
                alt="Xbox logo"
                width={50}
                height={50}
                className="rounded-full bg-neutral"
              />
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              onChange={handlePlatformChange}
              type="radio"
              id="playstation"
              name="platform"
              value={'PlayStation'}
            />
            <label htmlFor="playstation">
              PlayStation
              <Image
                src={PlayStation}
                alt="PlayStation logo"
                width={50}
                height={50}
                className="rounded-full bg-neutral p-1"
              />
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              onChange={handlePlatformChange}
              type="radio"
              id="nintendo"
              name="platform"
              value={'Nintendo'}
            />
            <label htmlFor="nintendo">
              Nintendo
              <Image
                src={Nintendo}
                alt="Nintendo logo"
                width={50}
                height={50}
                className="rounded-full bg-neutral"
              />
            </label>
          </div>
        </fieldset>
        <label htmlFor="smite-username">Smite Username *</label>
        <input
          onChange={handleSmiteUsernameChange}
          value={smiteUsernameInput}
          type="text"
          name="smite-username"
          id="smite-username"
          placeholder="This must be your exact in-game name on Smite"
          className="p-2 text-black text-xl placeholder:text-sm placeholder:text-black/60"
        />

        {/* <label>Upload an avatar: (optional)</label> */}
        {/* <input onChange={handlePhotoChange} type="file" id="avatar-photo" accept="image/*" /> */}

        <button
          type="submit"
          className="border-thin border-neutral rounded-sm p-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
