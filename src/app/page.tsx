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

const articles: Section[] = [
    {
        "_id": 1,
        "title": "Modèle Masculin ",
        "content": "Immortalisez vos instants les plus précieux à travers l’objectif d’un passionné." +
            " Spécialisé dans la capture d’émotions authentiques," +
            " je transforme chaque moment en une œuvre intemporelle." +
            " Que ce soit pour un portrait artistique, un mariage, un shooting mode ou un projet professionnel," +
            " chaque cliché raconte une histoire unique. " +
            "Mon approche allie technique et créativité pour sublimer la lumière," +
            " les couleurs et les expressions. Laissez-moi capturer la beauté de l’instant et révéler l’âme de vos souvenirs.",
        "image": "/uploads/webp/_DSC2021.webp",
        "imageAlt": "",
        "width": 400,
        "height": 500,
    } ,

    {
        "_id": 2,
        "title": "Modèle féminin",
        "content": "Élégance et grâce incarnées, ce modèle féminin illumine chaque cliché par sa présence captivante. Son port altier et sa gestuelle délicate révèlent une maîtrise parfaite de l’art de poser, sublimant les vêtements qu’elle porte et les accessoires qui l’accompagnent. Son regard profond et expressif attire immédiatement l’attention, tandis que son sourire subtil ajoute une touche de douceur et de mystère à l’image. Chaque détail, de la posture à l’attitude, reflète une féminité affirmée et intemporelle, transformant chaque photo en une œuvre d’art vibrante et inspirante. ",
        "image": "/uploads/webp/DSC09904.webp",
        "imageAlt": "",
        "width": 400,
        "height": 500,
    } ,
    {
        "_id": 3,
        "title": "Modalité de réservation",
        "content": "Pour réserver une séance photo, il vous suffit de me contacter via Instagram ou via mail : ceci@exemple.fr",
    }
];

export default function Home() {
    const [sections, setSections] = useState<Section[]>([]);

    useEffect(() => {
        setSections(articles);
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