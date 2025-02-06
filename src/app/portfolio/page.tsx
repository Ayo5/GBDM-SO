"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import InfiniteCarousel from "@/components/carousel";
import { ParallaxSection } from "@/components/parallax";

// Type pour un carousel
interface Carousel {
    _id: string;
    slides: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
    }>;
    order: number;
    isActive: boolean;
}

export default function Portfolio() {
    const [carousels, setCarousels] = useState<Carousel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const response = await fetch('/api/carousel');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des carousels');
                }
                const data = await response.json();
                // Trie les carousels par leur ordre
                const sortedCarousels = data.sort((a: Carousel, b: Carousel) => a.order - b.order);
                setCarousels(sortedCarousels);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCarousels();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-red-500 text-center">
                        <h2 className="text-xl font-bold">Erreur</h2>
                        <p>{error}</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full py-16">
                <div className="max-w-[2000px] mx-auto">
                    {carousels.map((carousel, index) => (
                        <React.Fragment key={carousel._id}>
                            {index === 1 && <ParallaxSection />}
                            <h1 className="text-2xl font-bold text-left my-16 ml-12">
                                Carousel {index + 1}
                            </h1>
                            <div className={`mx-auto px-8 py-10 ${index === 0 ? 'mb-32' : 'rounded-2xl'}`}>
                                <InfiniteCarousel images={carousel.slides} />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}