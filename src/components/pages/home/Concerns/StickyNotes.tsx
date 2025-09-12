import { useState } from 'react'
import type { TConcern } from '@/api/type'

type TStickyNotesProps = {
  data: TConcern
  color: string
  rotation: number
  marginBottom: string
}

const StickyNotes = ({ 
  data,
  color, 
  rotation, 
  marginBottom 
}: TStickyNotesProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const parseContent = (content: string): [string, string] => {
    const trimmed = content.trim()
    const spaceIndex = trimmed.indexOf(' ')
    
    if (spaceIndex === -1) {
      return [trimmed, '']
    }
    
    const firstLine = trimmed.substring(0, spaceIndex)
    const secondLine = trimmed.substring(spaceIndex + 1)
    
    return [firstLine, secondLine]
  }

  const [firstLine, secondLine] = parseContent(data.content)
  
  const containerClassName = `w-[250px] h-[260px] pt-[18px] relative shrink-0 transition-translate duration-300 ease-out hover:-translate-y-5 ${marginBottom !== '0' ? `mb-[${marginBottom}]` : ''}`
  const combinedStyle = { transform: `rotate(${rotation}deg)` }
  
  return (
    <div 
      className={containerClassName} 
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        xmlns='http://www.w3.org/2000/svg' 
        width='250' 
        height='260' 
        viewBox='0 0 250 260' 
        fill='none'
        className={`absolute top-[6px] left-[6px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <path 
          d='M16 0 H234 C242.837 0 250 7.163 250 16 V244 C250 252.837 242.837 260 234 260 H16 C7.163 260 0 252.837 0 244 V75.5 L65 0 Z' 
          fill={color} 
        />
        <path 
          d='M62.652 60.2386L0 75.5L65 0L74.4579 41.1055C76.4214 49.6393 71.16 58.1661 62.652 60.2386Z' 
          fill={color} 
        />
      </svg>

      <svg 
        xmlns='http://www.w3.org/2000/svg' 
        width='250' 
        height='260' 
        viewBox='0 0 250 260' 
        fill='none'
        className='absolute top-0 left-0'
      >
        <path 
          d='M16 0 H234 C242.837 0 250 7.163 250 16 V244 C250 252.837 242.837 260 234 260 H16 C7.163 260 0 252.837 0 244 V75.5 L65 0 Z' 
          fill='#FFFFFF' 
        />
        <path 
          d='M62.652 60.2386L0 75.5L65 0L74.4579 41.1055C76.4214 49.6393 71.16 58.1661 62.652 60.2386Z' 
          fill={color} 
        />
      </svg>
      <div className='absolute flex flex-col h-[181px] items-center justify-between left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'>
        <p className='font-luxurious-deco-l-regular' style={{color: `${color}`}}>{data.number}</p>
        <div className='font-genseki-h5-medium text-figma-neutral-950 text-center text-nowrap'>
            <p>{firstLine}</p>
            {secondLine && <p>{secondLine}</p>}
        </div>
      </div>
    </div>
  )
}

export default StickyNotes