import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='aboslute top-10 left-10 z-40'>
      <Image src={'/11ELVN.svg'} width={150} height={100} alt='logo' className='object-cover '/>
    </div>
  )
}

export default Logo
