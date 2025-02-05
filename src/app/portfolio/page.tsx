"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import InfiniteCarousel from "@/components/carousel";
import { ParallaxSection } from "@/components/parallax";

const SLIDES = [
    { src: "/uploads/webp/DSC02573.webp", alt: "Example Image 1", width: 100, height: 100 },
    { src: "/uploads/webp/DSC02577.webp", alt: "Example Image 2", width: 100, height: 100 },
    { src: "/uploads/webp/DSC02578.webp", alt: "Example Image 3", width: 100, height: 100 },
    { src: "/uploads/webp/DSC02580.webp", alt: "Example Image 4", width: 100, height: 100 },
    { src: "/uploads/webp/DSC02583.webp", alt: "Example Image 5", width: 100, height: 100 }
];

const SLIDES1 = [
    { src: "/uploads/webp/image1.webp", alt: "Example Image 2", width: 100, height: 100 },
    { src: "/uploads/webp/_DSC2006.webp", alt: "Example Image 3", width: 100, height: 100 },
    { src: "/uploads/webp/_DSC2021.webp", alt: "Example Image 4", width: 100, height: 100 },
    { src: "/uploads/webp/_DSC2033.webp", alt: "Example Image 5", width: 100, height: 100 },
    { src: "/uploads/webp/_DSC2031.webp", alt: "Example Image 6", width: 100, height: 100 }
];


export default function Portfolio() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-fullpy-16">
                <div className="max-w-[2000px] mx-auto">

                    <h1 className="text-2xl font-bold text-left my-16 ml-12">
                        Anniversaire
                    </h1>
                    <div className="mx-auto px-8 py-10 mb-32">
                        <InfiniteCarousel images={SLIDES} />
                    </div>

                    <ParallaxSection />

                    <h1 className="text-2xl font-bold text-left my-16 ml-12">
                        Thème 2
                    </h1>
                    <div className="mx-auto px-8 py-10 rounded-2xl">
                        <InfiniteCarousel images={SLIDES1} />
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
