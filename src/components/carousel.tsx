import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image';

interface Slide {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface CarouselProps {
    images: Slide[];
}

const InfiniteCarousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(next, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    const getSlideIndex = (index: number) => {
        const length = images.length;
        return ((index % length) + length) % length;
    };

    return (
        <div className="w-full">
            <div
                className="relative h-[600px] overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex justify-center items-center h-full">
                    {[-1, 0, 1].map((offset) => {
                        const index = getSlideIndex(currentIndex + offset);
                        const isCenter = offset === 0;

                        return (
                            <div
                                key={index}
                                className={`absolute transition-all duration-700 ease-in-out
                                    ${isCenter ? 'w-[800px] z-20' : 'w-[700px] z-10'}
                                    ${offset === -1 ? '-translate-x-[85%]' : ''}
                                    ${offset === 1 ? 'translate-x-[85%]' : ''}
                                `}
                            >
                                <div className={`relative h-[600px] rounded-xl overflow-hidden transition-transform duration-700 ease-in-out
                                    ${isCenter ? 'scale-100 opacity-100' : 'scale-90 opacity-50'}`}
                                >
                                    <Image
                                        src={images[index].src}
                                        alt={images[index].alt}
                                        fill
                                        quality={100}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px"
                                        className={`object-cover transition-transform duration-700 ease-in-out
                                            ${isCenter ? 'hover:scale-105' : 'grayscale brightness-75'}`}
                                        priority={isCenter}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation buttons */}
                <button
                    onClick={prev}
                    className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-30"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-30"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default InfiniteCarousel;