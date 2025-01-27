// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import autoplay styles

import './Banner.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules'; // Import Autoplay module

const Banner = () => {

  const bannerTitile = <>
    <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
      <div className='text-white lg:space-y-7 space-y-3 lg:w-1/2 lg:pl-24 pl-10 text-left'>
        <h2 className="lg:text-6xl w-2/3 lg:w-auto text-xl font-bold">Your Nest, Our Priority Finding Your Perfect Home with Nest Finder</h2>
        <p className='lg:text-xl text-sm'>Discover the best properties tailored to your needs and experience seamless home hunting with Nest Finder.</p>
        <div className="flex flex-wrap mt-4"> {/* Use flex-wrap to ensure buttons wrap on smaller screens */}
          <button className="btn btn-warning mr-2 mb-2 lg:mb-0 lg:mr-5 text-sm lg:text-base">Discover More</button>
          <button className="btn btn-outline btn-warning text-sm lg:text-base">Latest Properties</button>
        </div>
      </div>
    </div>
  </>

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 5000, // 3 seconds delay
        disableOnInteraction: false, // Keep autoplay running even after user interaction
      }}
      modules={[Pagination, Autoplay]} // Include Autoplay module
      className="mySwiper"
    >
      <SwiperSlide>
        <div className='w-full lg:h-[calc(100vh-76px)] relative'>
          <img className='w-full lg:h-[calc(100vh-76px)]' src="https://i.ibb.co/xS1rKNj/low-angle-shot-modern-building-with-glass-windows.jpg" alt="" />
          {bannerTitile}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full lg:h-[calc(100vh-76px)]'>
          <img className='w-full lg:h-[calc(100vh-40px)]' src="https://i.ibb.co/dJy8kZV/stuart-frisby-x-FZrh-VZu-VH8-unsplash.jpg" alt="" />
          {bannerTitile}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full lg:h-[calc(100vh-76px)]'>
          <img className='w-full lg:h-[calc(100vh-76px)]' src="https://i.ibb.co/W2W5bpP/leohoho-v-O1j-SPq-Zpl-A-unsplash.jpg" alt="" />
          {bannerTitile}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full lg:h-[calc(100vh-76px)]'>
          <img className='w-full lg:h-[calc(100vh-76px)]' src="https://i.ibb.co/rHwz0Vb/zane-lee-NHGaz3-VIi-DI-unsplash.jpg" alt="" />
          {bannerTitile}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
