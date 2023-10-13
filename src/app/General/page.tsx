import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Youtube from '@/resources/youtube.svg';
import Twitch from '@/resources/twitch.svg';
import Facebook from '@/resources/facebook.svg';
import Twitter from '@/resources/twitter.svg';
import Discord from '@/resources/discord.svg';
import Insta from '@/resources/instagram.svg';


const generalContent = [
  {
    name: 'SmiteOfficial',
    youtubeLink: 'https://www.youtube.com/@smitegame',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/7RzXrjhUdSM?si=C1heKjD32bNv_-x8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  },
  {
    name: 'SoloDoubleJ',
    youtubeLink: 'https://www.youtube.com/@soloDoubleJ',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/JvcNfbuxfgg?si=brWUZ31yxZ_crJGo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitterLink: 'https://www.twitter.com/SoloDoubleJ',
    twitterShort: 'twitter.com/SoloDoubleJ',
    twitchLink: 'https://www.twitch.tv/solodoublej',
    twitchShort: 'twitch.tv/solodoublej'
  },
  {
    name: 'KittenOfDoom',
    youtubeLink: 'https://www.youtube.com/@KittenOfDoom',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/Yobg6fBQ1EI?si=bXSto_IpiYF59QSK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitterLink: 'https://www.twitter.com/Kitten0fDoom',
    twitterShort: 'twitter.com/Kitten0fDoom',
    instagramLink: 'https://www.instagram.com/Kitten0fDoom',
    instagramShort: 'instagram.com/Kitten0fDoom',
    facebookLink: 'https://www.facebook.com/Kitten0fDoom',
    facebookShort: 'facebook.com/Kitten0fDoom',
    discordLink: 'https://discord.com/invite/aEpVhXN',
    discordShort: 'discord.join.Kitten0fDoom',
  },
  {
    name: 'El leon',
    youtubeLink: 'https://www.youtube.com/@ELLEONGAMING',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/X2rybmf4Yck?si=UTqDFaFmbVpmWu_V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitterLink: 'https://www.twitter.com/SSGELLEON',
    twitterShort: 'twitter.com/SSGELLEON',
    instagramLink: 'https://www.instagram.com/andyboii',
    instagramShort: 'instagram.com/andyboii',
    twitchLink: 'https://www.twitch.tv/elleon',
    twitchShort: 'twitch.tv/elleon',
  },
  {
    name: 'Inters3ct',
    youtubeLink: 'https://www.youtube.com/@Inters3ct/',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/UeMcDz_NPbg?si=KSUGqAbvdCAzJrLF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    discordLink: 'https://www.discord.gg/wpNKHBs',
    discordShort: 'discord.gg/wpNKHBs',
  },
  {
    name: 'Incon',
    youtubeLink: 'https://www.youtube.com/@InconSSG',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/2g-7H7AGFno?si=m9cqenPeJU0ES3I7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://www.twitch.tv/Incon',
    twitchShort: 'twitch.tv/Incon',
    twitterLink: 'https://www.twitter.com/SSG_Incon',
    twitterShort: 'twitter.com/SSG_Incon',
  }
]

export default function General() {

  return (
    <div className='p-4 md:p-16 text-neutral flex flex-col gap-20'>

      <h2 className='text-4xl md:text-7xl'>Smite Content</h2>

      {/* Content mapping */}
      
      {generalContent.map((content) => {
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
              {content.discordLink ?
              <div className='flex gap-3'>
                <Image src={Discord} alt='discord' width={20} height={20} />
                <Link className='underline' href={content.discordLink}>{content.discordShort}</Link>
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
