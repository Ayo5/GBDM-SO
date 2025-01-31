"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Article {
    _id?: string; // Changé de 'id' à '_id' pour correspondre au format MongoDB
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
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
        if (editingArticle) {
            setEditingArticle({ ...editingArticle, [field]: value });
        } else {
            setNewArticle({ ...newArticle, [field]: value });
        }
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

    const handleEditClick = (article: Article, index: number) => {
        setEditingArticle(article);
        setEditingIndex(index);
    };

    const handleUpdateArticle = async () => {
        if (!editingArticle || editingIndex === null || !editingArticle._id) return;

        try {
            const response = await fetch(`/api/articles/${editingArticle._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingArticle)
            });

            if (response.ok) {
                const updatedArticle = await response.json();
                const updatedArticles = [...articles];
                updatedArticles[editingIndex] = updatedArticle;
                setArticles(updatedArticles);
                setEditingArticle(null);
                setEditingIndex(null);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article:", error);
        }
    };

    const handleDeleteArticle = async (article: Article, index: number) => {
        if (!article._id) return;
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

        try {
            const response = await fetch(`/api/articles/${article._id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const updatedArticles = articles.filter((_, i) => i !== index);
                setArticles(updatedArticles);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article:", error);
        }
    };

    const renderArticleForm = (article: Article, isEditing: boolean = false) => (
        <div className="space-y-4">
            <label className="text-black">Titre de l&#39;Article</label>
            <input
                type="text"
                placeholder="Titre de l'article"
                value={article.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="border p-2 w-full rounded text-black"
            />

            <label className="text-black">Contenu de l&#39;Article</label>
            <textarea
                placeholder="Contenu de l'article"
                value={article.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="border p-2 w-full h-32 rounded text-black"
            />

            <label className="text-black">URL de l&#39;image</label>
            <input
                type="text"
                placeholder="URL de l'image"
                value={article.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="border p-2 w-full rounded text-black"
            />

            <label className="text-black">Description de l&#39;image</label>
            <input
                type="text"
                placeholder="Description de l'image"
                value={article.imageAlt}
                onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                className="border p-2 w-full rounded text-black"
            />

            <label className="text-black">Largeur</label>
            <input
                type="number"
                placeholder="Largeur"
                value={article.width}
                onChange={(e) => handleInputChange('width', parseInt(e.target.value))}
                className="border p-2 w-full rounded text-black"
            />

            <label className="text-black">Hauteur</label>
            <input
                type="number"
                placeholder="Hauteur"
                value={article.height}
                onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                className="border p-2 w-full rounded text-black"
            />

            <div className="flex gap-4 mt-4">
                <button
                    onClick={isEditing ? handleUpdateArticle : handleAddArticle}
                    className={`${isEditing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded`}
                >
                    {isEditing ? "Mettre à jour" : "Créer l'article"}
                </button>
                {isEditing && (
                    <button
                        onClick={() => {
                            setEditingArticle(null);
                            setEditingIndex(null);
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Annuler
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestion des Articles</h1>

            <div className="mb-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                    {editingArticle ? "Modifier l'Article" : "Nouvel Article"}
                </h2>
                {renderArticleForm(editingArticle || newArticle, !!editingArticle)}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Articles existants</h2>
                <div className="space-y-4">
                    {articles.map((article, index) => (
                        <div key={article._id} className="bg-white p-4 rounded-lg shadow relative">
                            <div className="absolute top-4 right-4 space-x-2">
                                <button
                                    onClick={() => handleEditClick(article, index)}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Modifier"
                                >
                                    <Pencil size={20} />
                                </button>
                                <button
                                    onClick={() => handleDeleteArticle(article, index)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Supprimer"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
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