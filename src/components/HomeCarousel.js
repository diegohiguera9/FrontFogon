import "../styles/components/HomeCarousel.scss";
import { useRef } from 'react';
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import Autoplay from 'embla-carousel-autoplay';

const images = [
  process.env.PUBLIC_URL + "./carhome/1.jpg",
  process.env.PUBLIC_URL + "./carhome/2.jpg",
  process.env.PUBLIC_URL + "./carhome/3.jpg",
];

const HomeCarousel = () => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  
  return (
    <div className="homecarousel">
      <Carousel
        className="carousel__main"
        slidesToScroll={1}
        withControls={mobile ? false : true}
        breakpoints={[{ maxWidth: "sm", slideGap: "15px" }]}
        withIndicators
        styles={{
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
          indicator: {
            width: 8,
            height: 8,
            borderRadius: "50%",
          },
        }}
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {images.map((item,index) => {
          return (
            <Carousel.Slide key={`Car${index}`}>
              <div className="homecarousel__container">
                <img src={item} alt="carousel"></img>
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
