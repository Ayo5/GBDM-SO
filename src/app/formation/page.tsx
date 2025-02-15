import React from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Page() {
    return (
        <div className="homepage-background min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow container mx-auto px-4 py-16 flex items-center">
                <div className="bg-white/80 rounded-2xl shadow-lg w-full max-w-4xl mx-auto p-12">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Coming Soon ...</h1>
                </div>
            </main>
            <Footer/>
        </div>
    );
}