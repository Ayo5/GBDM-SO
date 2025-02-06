import React from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Page() {
    return (
        <div className="homepage-background min-h-screen">
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white/80 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Coming Soon ...</h1>
                </div>
            </main>
            <Footer/>
        </div>
    );
}