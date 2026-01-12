import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import carouselData from "@/components/carousel-data";

import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle  } from "react-icons/io";
import { useMediaQuery } from "@/app/hooks/use-media-query";

interface Carousel3DProps {
    onActiveIndexChange?: (index: number) => void;
}

// Helper function to convert hex color to RGB
const hexToRgb = (hex: string): string => {
    // Remove # if present
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
};

export default function Carousel3D({ onActiveIndexChange }: Carousel3DProps) {
    const [angle, setAngle] = useState(0);
    const data = carouselData;
    const itemsPerView = data.length;
    const isMobile = useMediaQuery("(max-width: 768px)");

    const rotate = (delta: number) => {
        setAngle((prev) => prev + delta);
    };

    // Calculate which item is facing the front
    useEffect(() => {
        const normalizedAngle = ((angle % 360) + 360) % 360;
        const anglePerItem = 360 / itemsPerView;
        // Find the item closest to 0 degrees (facing front)
        let activeIndex = Math.round(normalizedAngle / anglePerItem) % itemsPerView;
        if (activeIndex < 0) activeIndex += itemsPerView;

        if (onActiveIndexChange) {
            onActiveIndexChange(activeIndex);
        }
    }, [angle, itemsPerView, onActiveIndexChange]);

    return (
        <div className="flex items-center min-h-[50vh] relative">
            <div className="perspective-1000 relative w-[400px] h-[260px] overflow-hidden">
                <div
                    className="absolute top-1/2 md:left-2/3 lg:left-2/3 left-7/12 transition-transform duration-500"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: `translate(-50%, -50%) rotateY(5deg) rotate3d(1, 0, 0, ${-angle}deg)`,
                        transformOrigin: "center center"
                    }}
                >
                    {data.map((item, i) => {
                        const theta = (360 / itemsPerView) * i;

                        return (
                            <div
                                key={item.id}
                                className="absolute text-xl font-bold p-4 rounded shadow flex flex-col items-center justify-center"
                                style={{
                                    background: `rgba(${hexToRgb(item.bgColor)}, 0.6)`,
                                    border: `2px solid ${item.bgColor}`,
                                    color: "white",
                                    transformStyle: "preserve-3d",
                                    transform: `rotateX(${theta}deg) rotateY(-5deg) translateZ(${240}px)`,
                                    width: "130px",
                                    height: "130px",
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: "-65px",
                                    marginTop: "-65px",
                                }}
                            >
                                <div className="mb-2">{item.icon}</div>
                                <div className="text-center font-semibold">{item.title}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="absolute lg:left-0 left-1/6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                <button className="rounded-full" onClick={() => rotate(-360 / itemsPerView)}>
                    <IoIosArrowDropupCircle size={isMobile ? 36 : 48} color="turquoise" />
                </button>
                <button className="rounded-full" onClick={() => rotate(360 / itemsPerView)}>
                    <IoIosArrowDropdownCircle size={isMobile ? 36 : 48} color="turquoise" />
                </button>
            </div>
        </div>
    );
}
