"use client";

import React, { useState, useEffect } from "react";

interface Section {
    title: string;
    content: string;
    image?: string;
    imageAlt?: string;
    width?: number;
    height?: number;
}

interface Article {
    title: string;
    content: string;
    image: string;
    imageAlt: string;
    width: number;
    height: number;
}

export default function ArticleManagement() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [newArticle, setNewArticle] = useState<Article>({
        title: "",
        content: "",
        image: "",
        imageAlt: "",
        width: 0,
        height: 0
    });

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch('/api/articles');
            if (response.ok) {
                const data = await response.json();
                setArticles(data);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des articles:", error);
        }
    };

    const handleInputChange = (field: keyof Article, value: string | number) => {
        setNewArticle({ ...newArticle, [field]: value });
    };

    const handleAddArticle = async () => {
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle)
            });

            if (response.ok) {
                const savedArticle = await response.json();
                setArticles([...articles, savedArticle]);
                setNewArticle({
                    title: "",
                    content: "",
                    image: "",
                    imageAlt: "",
                    width: 0,
                    height: 0
                });
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'article:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestion des Articles</h1>

            <div className="mb-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Nouvel Article</h2>

                <div className="space-y-4">
                    <label className="text-black">Titre de l&#39;Article</label>
                    <input
                        type="text"
                        placeholder="Titre de l'article"
                        value={newArticle.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="border p-2 w-full rounded text-black"
                    />

                    <label className="text-black">Contenu de l&#39;Article</label>
                    <textarea
                        placeholder="Contenu de l'article"
                        value={newArticle.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        className="border p-2 w-full h-32 rounded text-black"
                    />

                    <label className="text-black">URL de l&#39;image</label>
                    <input
                        type="text"
                        placeholder="URL de l'image"
                        value={newArticle.image}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        className="border p-2 w-full rounded text-black"
                    />

                    <label className="text-black">Description de l&#39;image</label>
                    <input
                        type="text"
                        placeholder="Description de l'image"
                        value={newArticle.imageAlt}
                        onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                        className="border p-2 w-full rounded text-black"
                    />

                    <label className="text-black">Largeur</label>
                    <input
                        type="number"
                        placeholder="Largeur"
                        value={newArticle.width}
                        onChange={(e) => handleInputChange('width', parseInt(e.target.value))}
                        className="border p-2 w-full rounded text-black"
                    />

                    <label className="text-black">Hauteur</label>
                    <input
                        type="number"
                        placeholder="Hauteur"
                        value={newArticle.height}
                        onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                        className="border p-2 w-full rounded text-black"
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleAddArticle}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Créer l&#39;article
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Articles existants</h2>
                <div className="space-y-4">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-bold">{article.title}</h3>
                            <p className="text-gray-700">{article.content}</p>
                            {article.image && (
                                <img
                                    src={article.image}
                                    alt={article.imageAlt}
                                    className="mt-2 rounded"
                                    width={article.width}
                                    height={article.height}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}