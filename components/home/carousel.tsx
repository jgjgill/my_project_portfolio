import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image, { StaticImageData } from 'next/image'

interface CarouselProps {
  imgsInfo: {
    title: string
    src: StaticImageData
  }[]
}

const Carousel = ({ imgsInfo }: CarouselProps) => {
  return (
    <div className='flex flex-col items-center px-8 w-full border border-slate-400 rounded-md shadow-md'>
      <Slider
        dots
        speed={500}
        infinite
        slidesToShow={1}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={5000}
        className='w-[300px] sm:w-[450px] lg:w-[800px] flex p-4'
      >
        {imgsInfo.map((imgInfo, i) => (
          <div key={i}>
            <div className='flex flex-col text-center'>
              <span className='text-2xl font-semibold mb-4 text-slate-400'>{imgInfo.title}</span>
              <Image src={imgInfo.src} height={500} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel
