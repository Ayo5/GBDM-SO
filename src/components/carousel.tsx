"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

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

    const handlers = useSwipeable({
        onSwipedLeft: next,
        onSwipedRight: prev,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    if (isMobile) {
        return (
            <div {...handlers} className="w-full">
                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
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
        );
    }

    return (
        <div className="w-full" {...handlers}>
            <div
                className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-visible"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex justify-center items-center h-full">
                    <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px"
                        className="object-cover transition-all duration-700 ease-in-out hover:scale-110 hover:brightness-110"
                        priority
                        onClick={() => setIsFullscreen(true)}
                    />
                </div>
                {!isMobile && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-30"
                        >
                            <ChevronLeft className="w-5 md:w-6 h-5 md:h-6" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-30"
                        >
                            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
                        </button>
                    </>
                )}
            </div>
            {isFullscreen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 md:top-8 right-4 md:right-8 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </button>
                    <div className="relative w-full max-w-5xl h-screen max-h-[80vh] mx-4 md:mx-8">
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
