import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Youtube from '@/resources/youtube.svg';
import Twitch from '@/resources/twitch.svg';
import Facebook from '@/resources/facebook.svg';
import Twitter from '@/resources/twitter.svg';
import Discord from '@/resources/discord.svg';
import Insta from '@/resources/instagram.svg';


const midContent = [
  {
    name: 'Venenu',
    youtubeLink: 'https://www.youtube.com/@Venenu',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/qanyZuDtTm0?si=e8654N8SO8P6QD57" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://twitch.tv/venenu_',
    twitchShort: 'twitch.tv/venenu_',
    twitterLink: 'https://twitter.com/Venenu_',
    twitterShort: 'twitter.com/Venenu_',
  },
  {
    name: 'TrelliRelli',
    youtubeLink: 'https://www.youtube.com/@TrelliRelli',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/0116DWf6DWA?si=lxZwykf7ZY_NKGJQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://twitch.tv/trellirelli',
    twitchShort: 'twitch.tv/trellirelli',
    twitterLink: 'https://twitter.com/trellirelli',
    twitterShort: 'twitter.com/trellirelli',
  },
  {
    name: 'Sheento',
    youtubeLink: 'https://www.youtube.com/@sheento7103',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/UkDTATbq4gs?si=plKxRTQPfoza-Zx5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  }
]

export default function Mid() {

  return (
    <div className='p-4 md:p-16 text-neutral flex flex-col gap-20'>
      <h2 className='text-4xl md:text-7xl'>Mid</h2>

      {/* Content mapping */}
      
      {midContent.map((content) => {
        const { name, youtubeLink, embed } = content;
        return (
          <div key={name} className='flex flex-col gap-2 md:flex-row '>
            <div className='flex flex-col gap-3 '>
              <Link href={youtubeLink} className='flex items-center gap-3 text-neutral text-2xl md:text-4xl border-b-neutral border-b-thin'>
                {name}
                <Image src={Youtube} alt='Youtube' width={20} height={20} />
              </Link>
              <div dangerouslySetInnerHTML={{__html: embed}}></div>
            </div>
            <div className='flex flex-col justify-center gap-1'>
              {content.twitchLink ?
              <div className='flex gap-3'>
                <Image src={Twitch} alt='Twitch' width={20} height={20} />
                <Link className='hover:underline' href={content.twitchLink}>{content.twitchShort}</Link>
              </div>
              : null }
              {content.twitterLink ?
              <div className='flex gap-3'>
                <Image src={Twitter} alt='Twitter' width={20} height={20} />
                <Link className='hover:underline' href={content.twitterLink}>{content.twitterShort}</Link>
              </div>
              : null }
            </div>
            
          </div>
        )
      })}
    </div>
  )
}
