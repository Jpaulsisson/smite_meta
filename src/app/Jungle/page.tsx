import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Youtube from '@/resources/youtube.svg';
import Twitch from '@/resources/twitch.svg';
import Twitter from '@/resources/twitter.svg';
import Discord from '@/resources/discord.svg';
import Insta from '@/resources/instagram.svg';

const jungleContent = [
  {
    name: 'Weak3n',
    youtubeLink: 'https://www.youtube.com/@Weak3n',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/RhYL6z7FuY0?si=m21ZydZ2LYo8mP5F" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitterLink: 'https://www.twitter.com/Weak3n',
    twitterShort: 'twitter.com/Weak3n',
    twitchLink: 'https://www.twitch.tv/weak3n',
    twitchShort: 'twitch.tv/weak3n',
    instagramLink: 'https://www.instagram.com/weak3n',
    instagramShort: 'instagram.com/weak3n',
    discordLink: 'https://discord.gg/mBwseuH',
    discordShort: 'discord.join.Weak3n',
  },
  {
    name: 'Lasbra',
    youtubeLink: 'https://www.youtube.com/@LASBRAgg',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/ee6ZV07hOCc?si=ui6YUr649yQ-uw4k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitterLink: 'https://www.twitter.com/LasbraGG',
    twitterShort: 'twitter.com/LasbraGG',
    twitchLink: 'https://www.twitch.tv/lasbra',
    twitchShort: 'twitch.tv/lasbra',
    instagramLink: 'https://www.instagram.com/lasbra',
    instagramShort: 'instagram.com/lasbra',
    discordLink: 'https://www.discord.gg/BCudd8V',
    discordShort: 'discord.gg/BCudd8V',
  },
  {
    name: 'Adapting',
    youtubeLink: 'https://www.youtube.com/@adaptingx',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/Vu3_WVw0cno?si=Z-HXDHX0Mn4YM0Az" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  },
  {
    name: 'LemTM',
    youtubeLink: 'https://www.youtube.com/@LemSmite',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/vNg0UKzC6ts?si=KKneZAcSnG0gXxb4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://www.twitch.tv/lemtm',
    twitchShort: 'twitch.tv/lemtm',
    twitterLink: 'https://www.twitter.com/LemSmite',
    twitterShort: 'twitter.com/LemSmite',
  }
]

export default function Jungle() {
  return (
    <div className='p-4 md:p-16 text-neutral flex flex-col gap-20'>

      <h2 className='text-4xl md:text-7xl'>Jungle</h2>

      {/* Content mapping */}
      
      {jungleContent.map((content) => {
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
              {content.instagramLink ?
              <div className='flex gap-3'>
                <Image src={Insta} alt='Instagram' width={20} height={20} />
                <Link className='hover:underline' href={content.instagramLink}>{content.instagramShort}</Link>
              </div>
              : null }
              {content.discordLink ?
              <div className='flex gap-3'>
                <Image src={Discord} alt='discord' width={20} height={20} />
                <Link className='hover:underline' href={content.discordLink}>{content.discordShort}</Link>
              </div>
              : null }
            </div>
            
          </div>
        )
      })}
    </div>
  )
}
