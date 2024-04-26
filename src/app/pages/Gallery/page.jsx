"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { images } from '@/app/lib/images';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Gallery() {
  return (
    <main>
      <div className='py-10 px-5 '>
        <div className=' container mx-auto md:px-10 lg:px-20 xl:px-40'>
        <Swiper
          navigation
          pagination={{ type: 'fraction' }}
          modules={[Navigation, Pagination]}
          className=' rounded-lg'
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='flex h-full w-full items-center justify-center'>
                <Image
                  src={image.src}
                  alt={image.alt}
                  priority={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </main>
  )
}
