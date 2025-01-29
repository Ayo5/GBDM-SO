"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import InfiniteCarousel from "@/components/carousel";



const SLIDES = [
    { src: "/background.jpg", alt: "Example Image 1", width : 100 , height: 100  },
    { src: "/background.jpg", alt: "Example Image 2" ,  width : 100 , height: 100},
    { src: "/background.jpg", alt: "Example Image 3",  width : 100 , height: 100 },
    { src: "/background.jpg", alt: "Example Image 4" ,  width : 100 , height: 100},
    { src: "/background.jpg", alt: "Example Image 5" ,  width : 100 , height: 100}
];


export default function Portfolio() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full px-4 py-16 ">
                <div className="max-w-[2000px] mx-auto">
                    <InfiniteCarousel images={SLIDES} />
                </div>
            </main>
            <Footer />
        </div>
    );
}