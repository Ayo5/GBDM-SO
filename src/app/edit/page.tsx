"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Article {
    _id?: string;
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
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);

        // Créer un aperçu de l'image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Obtenir les dimensions de l'image
        const img = new Image();
        img.onload = () => {
            if (editingArticle) {
                setEditingArticle({
                    ...editingArticle,
                    width: img.width,
                    height: img.height
                });
            } else {
                setNewArticle({
                    ...newArticle,
                    width: img.width,
                    height: img.height
                });
            }
        };
        img.src = URL.createObjectURL(file);
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Erreur lors du téléchargement de l\'image');
            }

            return data.imageUrl;
        } catch (error) {
            console.error("Erreur lors du téléchargement de l'image:", error);
            throw error;
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
            let imageUrl = newArticle.image;

            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile);
            }

            const articleToSave = {
                ...newArticle,
                image: imageUrl
            };

            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleToSave)
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
                setSelectedFile(null);
                setImagePreview("");
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'article:", error);
        }
    };

    const handleEditClick = (article: Article, index: number) => {
        setEditingArticle(article);
        setEditingIndex(index);
        setImagePreview(article.image);
    };

    const handleUpdateArticle = async () => {
        if (!editingArticle || editingIndex === null || !editingArticle._id) return;

        try {
            let imageUrl = editingArticle.image;

            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile);
            }

            const articleToUpdate = {
                ...editingArticle,
                image: imageUrl
            };

            const response = await fetch(`/api/articles/${editingArticle._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleToUpdate)
            });

            if (response.ok) {
                const updatedArticle = await response.json();
                const updatedArticles = [...articles];
                updatedArticles[editingIndex] = updatedArticle;
                setArticles(updatedArticles);
                setEditingArticle(null);
                setEditingIndex(null);
                setSelectedFile(null);
                setImagePreview("");
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

            <label className="text-black">Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 w-full rounded text-black"
            />

            {(imagePreview || article.image) && (
                <div className="mt-2">
                    <img
                        src={imagePreview || article.image}
                        alt="Aperçu"
                        className="max-w-xs rounded"
                    />
                </div>
            )}

            <label className="text-black">Description de l&#39;image</label>
            <input
                type="text"
                placeholder="Description de l'image"
                value={article.imageAlt}
                onChange={(e) => handleInputChange('imageAlt', e.target.value)}
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
                            setSelectedFile(null);
                            setImagePreview("");
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