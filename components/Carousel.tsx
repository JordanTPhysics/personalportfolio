import React, { useState } from "react";

interface CarouselItem {
  id: number;
  bgColor: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface CarouselProps {
  data: CarouselItem[];
  activeSlide?: number;
}

export default function Carousel(props: CarouselProps) {
  const [activeSlide, setactiveSlide] = useState(props.activeSlide || 0);

  const next = () =>
    activeSlide < props.data.length - 1 && setactiveSlide(activeSlide + 1);

  const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);

  const getStyles = (index: number): React.CSSProperties | undefined => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7
      };
  };

  return (
    <>
      <div className="relative perspective-1000 preserve-3d w-[362px] h-[272px] mx-auto">
        {props.data.map((item, i) => (
          <React.Fragment key={item.id}>
            <div
              className="absolute top-0 w-[362px] h-[272px] rounded-xl transition-all duration-500 flex justify-center items-center"
              style={{
                background: item.bgColor,
                boxShadow: `0 5px 20px ${item.bgColor}30`,
                ...getStyles(i)
              }}
            >
              <SliderContent {...item} />
            </div>
            <div
              className="absolute w-full h-[60px] -bottom-[60px] rounded-xl transition-all duration-500"
              style={{
                background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                ...getStyles(i)
              }}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="pt-[100px] flex justify-center">
        <button
          className="cursor-pointer text-white text-[2rem] bg-transparent border-none"
          onClick={prev}
        >
          ‹
        </button>
        <button
          className="cursor-pointer text-white text-[2rem] bg-transparent border-none ml-10"
          onClick={next}
        >
          ›
        </button>
      </div>
    </>
  );
};

interface SliderContentProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const SliderContent = (props: SliderContentProps) => {
  return (
    <div className="flex flex-col text-white p-[30px] items-start font-sans">
      {props.icon}
      <h2 className="my-4">{props.title}</h2>
      <p className="m-0 mb-4">{props.desc}</p>
    </div>
  );
};
