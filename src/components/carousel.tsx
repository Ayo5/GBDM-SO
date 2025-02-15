import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from 'next/image';

interface Slide {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface CarouselProps {
    images: Slide[];
    isMobile?: boolean;
}

const InfiniteCarousel: React.FC<CarouselProps> = ({ images, isMobile = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        if (!isHovered && !isFullscreen) {
            const interval = setInterval(next, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered, isFullscreen]);

    const getSlideIndex = (index: number) => {
        const length = images.length;
        return ((index % length) + length) % length;
    };

    if (isMobile) {
        return (
            <div className="w-full">
                <div
                    className="relative h-[400px] overflow-hidden"
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                >
                    <div className="h-full">
                        <div className="relative h-full">
                            <Image
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                fill
                                quality={100}
                                className="object-cover transition-all duration-500"
                                sizes="100vw"
                                priority
                                onClick={() => setIsFullscreen(true)}
                            />
                        </div>
                    </div>

                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 z-30"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 z-30"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div
                className="relative h-[600px] overflow-visible"
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
                                    ${isCenter ? 'w-[900px] z-20' : 'w-[700px] z-10'}
                                    ${offset === -1 ? '-translate-x-[85%]' : ''}
                                    ${offset === 1 ? 'translate-x-[85%]' : ''}
                                `}
                            >
                                <div
                                    className={`relative h-[600px] rounded-xl overflow-hidden transition-all duration-700 ease-in-out
                                        ${isCenter ? 'scale-100 opacity-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] cursor-pointer' : 'scale-90 opacity-50'}`}
                                    onClick={() => isCenter && setIsFullscreen(true)}
                                >
                                    <Image
                                        src={images[index].src}
                                        alt={images[index].alt}
                                        fill
                                        quality={100}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px"
                                        className={`object-cover transition-all duration-700 ease-in-out
                                            ${isCenter ? 'hover:scale-110 hover:brightness-110' : 'grayscale brightness-75'}`}
                                        priority={isCenter}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={prev}
                    className="absolute left-8 top-1/2 -translate-y-1/2 bg-black hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-30"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-8 top-1/2 -translate-y-1/2 bg-black hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-30"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {isFullscreen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 md:top-8 right-4 md:right-8 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </button>
                    <div className="relative w-full max-w-7xl h-screen max-h-[90vh] mx-4 md:mx-8">
                        <Image
                            src={images[currentIndex].src}
                            alt={images[currentIndex].alt}
                            fill
                            quality={100}
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfiniteCarousel;