import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Youtube from '@/resources/youtube.svg';
import Twitch from '@/resources/twitch.svg';
import Facebook from '@/resources/facebook.svg';
import Twitter from '@/resources/twitter.svg';
import Discord from '@/resources/discord.svg';
import Insta from '@/resources/instagram.svg';


const carryContent = [
  {
    name: 'Zapman',
    youtubeLink: 'https://www.youtube.com/@Zapman',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/dw01S3tE-Nc?si=4xaIzN8vwTys0YMh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://twitch.tv/zapman',
    twitchShort: 'twitch.tv/zapman',
    twitterLink: 'https://twitter.com/sZapMan',
    twitterShort: 'twitter.com/sZapMan',
    instagramLink: 'https://instagram.com/szapman',
    instagramShort: 'instagram.com/szapman',
  },
  {
    name: 'Barraccudda',
    youtubeLink: 'https://www.youtube.com/@BaRRaCCuDDa',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/o34EI02sdXw?si=MDQJVsO5hPL5CjST" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://twitch.tv/barraccudda',
    twitchShort: 'twitch.tv/barraccudda',
    twitterLink: 'https://twitter.com/BaRRaCCuDDa_',
    twitterShort: 'twitter.com/BaRRaCCuDDa_',
    facebookLink: 'https://facebook.com/xBaRRaCCuDDa',
    facebookShort: 'facebook.com/xBaRRaCCuDDa',
  },
  {
    name: 'PandaCat',
    youtubeLink: 'https://www.youtube.com/@PandaCatSmite',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/3hbqsp9A-WY?si=fnDhuGCJWqktZhBR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://twitch.tv/PandaCat',
    twitchShort: 'twitch.tv/PandaCat',
    twitterLink: 'https://twitter.com/mPandaCat',
    twitterShort: 'twitter.com/mPandaCat'
  }
]

export default function General() {

  return (
    <div className='p-4 md:p-16 text-neutral flex flex-col gap-20'>

      <h2 className='text-4xl md:text-7xl'>Carry</h2>

      {/* Content mapping */}
      
      {carryContent.map((content) => {
        const { name, youtubeLink, embed } = content;
        return (
          <div key={name} className='flex flex-col gap-2 md:text-2xl md:flex-row '>
            <div className='flex flex-col gap-3 '>
              <Link href={youtubeLink} className='flex items-center gap-3 text-primaryFontColor text-2xl md:text-4xl underline'>
                {name}
                <Image src={Youtube} alt='Youtube' width={20} height={20} />
              </Link>
              <div dangerouslySetInnerHTML={{__html: embed}}></div>
            </div>
            <div className='flex flex-col justify-center'>
              {content.twitchLink ?
              <div className='flex gap-3'>
                <Image src={Twitch} alt='Twitch' width={20} height={20} />
                <Link className='underline' href={content.twitchLink}>{content.twitchShort}</Link>
              </div>
              : null }
              {content.twitterLink ?
              <div className='flex gap-3'>
                <Image src={Twitter} alt='Twitter' width={20} height={20} />
                <Link className='underline' href={content.twitterLink}>{content.twitterShort}</Link>
              </div>
              : null }
              {content.instagramLink ?
              <div className='flex gap-3'>
                <Image src={Insta} alt='Instagram' width={20} height={20} />
                <Link className='underline' href={content.instagramLink}>{content.instagramShort}</Link>
              </div>
              : null }
              {content.facebookLink ?
              <div className='flex gap-3'>
                <Image src={Facebook} alt='facebook' width={20} height={20} />
                <Link className='underline' href={content.facebookLink}>{content.facebookShort}</Link>
              </div>
              : null }
            </div>
            
          </div>
        )
      })}
    </div>
  )
}