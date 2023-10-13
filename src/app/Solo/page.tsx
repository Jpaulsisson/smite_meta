import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Youtube from '@/resources/youtube.svg';
import Twitch from '@/resources/twitch.svg';
import Twitter from '@/resources/twitter.svg';
import Discord from '@/resources/discord.svg';
import Insta from '@/resources/instagram.svg';


const soloContent = [
  {
    name: 'fineokay',
    youtubeLink: 'https://www.youtube.com/@DudeImFonz',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/VTrJTCNCZu0?si=ilsEqA4elt4xIlNu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://www.twitch.tv/fineokay',
    twitchShort: 'twitch.tv/fineokay',
    twitterLink: 'https://www.twitter.com/fineokay_',
    twitterShort: 'twitter.com/fineokay_',
  },
  {
    name: 'MAST',
    youtubeLink: 'https://www.youtube.com/channel/UCU0oLTV2RO-l4uUkQVy2TvA',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/8hcshJ3oIls?si=ehN8jB2PH2R8WKut" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://twitch.tv/CallMeMast',
    twitchShort: 'twitch.tv/CallMeMast',
    twitterLink: 'https://twitter.com/CallMeMast',
    twitterShort: 'https://twitter.com/CallMeMast',
  },
  {
    name: 'Haddix',
    youtubeLink: 'https://www.youtube.com/@Haddixx',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/Kk-ZW3y6ONU?si=l8adrShecUOu5uMB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitterLink: 'https://twitter.com/notHaddix',
    twitterShort: 'twitter.com/notHaddix',
    instagramLink: 'https://www.instagram.com/nothaddix',
    instagramShort: 'instagram.com/nothaddix',
    twitchLink: 'https://www.twitch.tv/haddix',
    twitchShort: 'twitch.tv/haddix',
    discordLink: 'https://www.discord.gg/4eSRtGwW73',
    discordShort: 'discord.gg/4eSRtGwW73',
  },
  {
    name: 'SoloOrTroll',
    youtubeLink: 'https://www.youtube.com/@SoloOrTroll',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/vSazIOtvgtg?si=Pmbc-T4JDBMEtz5R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitchLink: 'https://twitch.tv/solo0rtroll',
    twitchShort: 'twitch.tv/solo0rtroll',
    twitterLink: 'https://twitter.com/SoloOrTroll',
    twitterShort: 'twitter.com/SoloOrTroll',
  }
]

export default function Solo() {

  return (
    <div className='p-4 md:p-16 text-neutral flex flex-col gap-20'>

      <h2 className='text-4xl md:text-7xl'>Solo</h2>

      {/* Content mapping */}
      
      {soloContent.map((content) => {
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
            </div>
            
          </div>
        )
      })}
    </div>
  )
}
