"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Article from "@/components/article";

interface Section {
    _id: number;
    title: string;
    content: string;
    image?: string;
    imageAlt?: string;
    width?: number;
    height?: number;
}

export default function Home() {
    const [sections, setSections] = useState<Section[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles');
                const data = await response.json();
                setSections(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="homepage-background min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white/80 rounded-2xl shadow-lg">
                    <Article sections={sections} />
                </div>
            </main>
            <Footer />
        </div>
    );
}