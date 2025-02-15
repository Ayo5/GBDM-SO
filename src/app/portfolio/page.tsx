"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import InfiniteCarousel from "@/components/carousel";
import { ParallaxSection } from "@/components/parallax";

// Type pour un carousel
interface Carousel {
    _id: string;
    title: string;
    slides: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
    }>;
    order: number;
    isActive: boolean;
}

// Données statiques des carousels
const staticCarousels: Carousel[] = [
    {
        _id: "1",
        title: "Premier Carousel Example",
        slides: [
            {
                src: "/uploads/webp/DSC02573.webp",
                alt: "Example Image 1",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC02577.webp",
                alt: "Example Image 2",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC02578.webp",
                alt: "Example Image 3",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC02580.webp",
                alt: "Example Image 4",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC02583.webp",
                alt: "Example Image 5",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC02585.webp",
                alt: "Example Image 5",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC02766.webp",
                alt: "Example Image 5",
                width: 100,
                height: 100,
            },
        ],
        order: 1,
        isActive: true,
    },
    {
        _id: "2",
        title: "Second Carousel Example",
        slides: [
            {
                src: "/uploads/webp/DSC09904.webp",
                alt: "Example Image 1",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC09905.webp",
                alt: "Example Image 2",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC09906.webp",
                alt: "Example Image 3",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC09907.webp",
                alt: "Example Image 4",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC09911.webp",
                alt: "Example Image 5",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC09912.webp",
                alt: "Example Image 5",
                width: 100,
                height: 100,
            },
            {
                src: "/uploads/webp/DSC09913.webp",
                alt: "Example Image 5",
                width: 100,
                height: 100,
            },
        ],
        order: 1,
        isActive: true
    }
];
export default function Portfolio() {
    const [carousels] = useState<Carousel[]>(staticCarousels);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full py-8 md:py-16">
                <div className="w-full max-w-[2000px] mx-auto px-4 md:px-0">
                    {carousels.map((carousel, index) => (
                        <React.Fragment key={carousel._id}>
                            {index === 1 && (
                                <div className="hidden md:block">
                                    <ParallaxSection image="DSC02580"/>
                                </div>
                            )}
                            <h1 className="text-xl md:text-2xl font-bold text-left my-8 md:my-16 ml-4 md:ml-12">
                                {carousel.title}
                            </h1>
                            <div className={`mx-auto px-0 md:px-8 py-6 md:py-10 
                                ${index === 0 ? 'mb-16 md:mb-32' : 'rounded-2xl'}`}>
                                <InfiniteCarousel
                                    images={carousel.slides}
                                    isMobile={typeof window !== 'undefined' && window.innerWidth < 768}
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}