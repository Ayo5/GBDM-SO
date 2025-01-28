import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Card from "@/components/card";

export default function Home() {
    return (
        <div className="homepage-background">
            <Navbar/>
            <main className="flex flex-col items-center justify-center h-screen bg-white/80 mx-16 rounded-2xl ">
                <Card
                    imageUrl="/background.jpg"
                    altText ="Background image"
                    href="#"
                    width={400}
                    height={300}
                />
            </main>
            <Footer/>
        </div>
    );
}