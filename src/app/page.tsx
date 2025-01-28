import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Article from "@/components/article";

const sections = [
    {
        image: "/background.jpg",
        imageAlt: "Image 1",
        title: "Article 1",
        width: 400,
        height: 200,
        content: "Lorem ipsum dolor sit amet, " +
            "consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
            " ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea "
    },
    {
        image: "/background.jpg",
        imageAlt: "Image 2",
        title: "Article 2",
        width: 400,
        height: 600,
        content: "Lorem ipsum dolor sit amet, " +
            "consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
            " ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea "
    },
    {
        title: "Article 3",
        content: "This is the content of the third article without an image."
    }
];



export default function Home() {
    return (
        <div className="homepage-background min-h-screen">
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white/80 rounded-2xl shadow-lg ">
                    <Article sections={sections}/>
                </div>
            </main>
            <Footer/>
        </div>
    );
}