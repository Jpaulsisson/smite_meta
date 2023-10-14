import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Youtube from '@/resources/youtube.svg';
import Twitch from '@/resources/twitch.svg';
import Twitter from '@/resources/twitter.svg';


const supportContent = [
  {
    name: 'AwesomeJake408',
    youtubeLink: 'https://www.youtube.com/@Awesomejake408',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/EUq7I2tcpsE?si=WkhSkyn40p7RozFy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  },
  {
    name: 'PolarBearMike',
    youtubeLink: 'https://www.youtube.com/@PBMsmite',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/nBvZRKNY6UI?si=M104gYrzg2fEkzBZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    twitterLink: 'https://www.twitter.com/pbmsmite',
    twitterShort: 'twitter.com/pbmsmite',
    twitchLink: 'https://www.twitch.tv/PBMsmite',
    twitchShort: 'twitch.tv/PBMsmite'
  },
  {
    name: 'Genetics',
    youtubeLink: 'https://www.youtube.com/@GeneticsSmite',
    embed: '<iframe width="321" src="https://www.youtube.com/embed/Ho7TF2QXKJo?si=wi3bDE9oxfAl14j8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  }
]

export default function General() {

  return (
    <div className='p-4 md:p-16 text-neutral flex flex-col gap-20'>

      <h2 className='text-4xl md:text-7xl'>Support</h2>

      {/* Content mapping */}
      
      {supportContent.map((content) => {
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
            
