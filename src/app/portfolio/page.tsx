"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import InfiniteCarousel from "@/components/carousel";
import { ParallaxSection } from "@/components/parallax";

const SLIDES = [
    { src: "/background.jpg", alt: "Example Image 1", width: 100, height: 100 },
    { src: "/background.jpg", alt: "Example Image 2", width: 100, height: 100 },
    { src: "/background.jpg", alt: "Example Image 3", width: 100, height: 100 },
    { src: "/background.jpg", alt: "Example Image 4", width: 100, height: 100 },
    { src: "/background.jpg", alt: "Example Image 5", width: 100, height: 100 }
];

export default function Portfolio() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full px-8 py-16">
                <div className="max-w-[2000px] mx-auto">

                    <h1 className="text-2xl font-bold text-left my-16">
                        Thème 1
                    </h1>
                    <div className="mx-auto px-8 py-10 mb-32">
                        <InfiniteCarousel images={SLIDES} />
                    </div>

                    <ParallaxSection />

                    <h1 className="text-2xl font-bold text-left my-16">
                        Thème 2
                    </h1>
                    <div className="mx-auto px-8 py-10 rounded-2xl">
                        <InfiniteCarousel images={SLIDES} />
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
