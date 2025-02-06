"use client";

import React, { useState, useEffect } from "react";

interface Slide {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface Carousel {
    _id: string;
    slides: Slide[];
    isActive: boolean;
    order: number;
}

export default function CarouselManagement() {
    const [carousels, setCarousels] = useState<Carousel[]>([]);
    const [newCarousel, setNewCarousel] = useState<Omit<Carousel, '_id'>>({
        slides: Array(10).fill({ src: '', alt: '', width: 100, height: 100 }),
        isActive: true,
        order: 0
    });
    const [editingCarousel, setEditingCarousel] = useState<Carousel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Charger les carousels existants
    useEffect(() => {
        fetchCarousels();
    }, []);

    const fetchCarousels = async () => {
        try {
            const response = await fetch('/api/carousel');
            if (!response.ok) throw new Error('Erreur lors du chargement des carousels');
            const data = await response.json();
            setCarousels(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSlideChange = (index: number, file: File, target: 'new' | 'edit') => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newSlide = {
                src: e.target?.result as string,
                alt: `Image ${index + 1}`,
                width: 100,
                height: 100
            };

            if (target === 'new') {
                const newSlides = [...newCarousel.slides];
                newSlides[index] = newSlide;
                setNewCarousel({ ...newCarousel, slides: newSlides });
            } else if (editingCarousel) {
                const editSlides = [...editingCarousel.slides];
                editSlides[index] = newSlide;
                setEditingCarousel({ ...editingCarousel, slides: editSlides });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleAddCarousel = async () => {
        try {
            const response = await fetch('/api/carousel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCarousel)
            });

            if (!response.ok) throw new Error('Erreur lors de la création du carousel');

            await fetchCarousels();
            setNewCarousel({
                slides: Array(5).fill({ src: '', alt: '', width: 100, height: 100 }),
                isActive: true,
                order: 0
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        }
    };

    const handleUpdateCarousel = async () => {
        if (!editingCarousel) return;

        try {
            const response = await fetch('/api/carousel', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingCarousel)
            });

            if (!response.ok) throw new Error('Erreur lors de la mise à jour du carousel');

            await fetchCarousels();
            setEditingCarousel(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        }
    };

    const handleDeleteCarousel = async (id: string) => {
        try {
            const response = await fetch('/api/carousel', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression du carousel');

            await fetchCarousels();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        </div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestion des Carousels</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau carousel</h2>
                <div className="grid grid-cols-5 gap-4 mb-4">
                    {newCarousel.slides.map((_, index) => (
                        <div key={index} className="space-y-2">
                            <input
                                type="file"
                                onChange={(e) => e.target.files && handleSlideChange(index, e.target.files[0], 'new')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <input
                                type="text"
                                placeholder={`Alt texte ${index + 1}`}
                                value={newCarousel.slides[index].alt}
                                onChange={(e) => {
                                    const newSlides = [...newCarousel.slides];
                                    newSlides[index] = { ...newSlides[index], alt: e.target.value };
                                    setNewCarousel({ ...newCarousel, slides: newSlides });
                                }}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleAddCarousel}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Ajouter le Carousel
                </button>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Carousels existants</h2>
                {carousels.map((carousel) => (
                    <div key={carousel._id} className="border p-4 rounded-lg bg-white">
                        <div className="grid grid-cols-5 gap-4 mb-4">
                            {carousel.slides.map((slide, index) => (
                                <div key={index} className="space-y-2">
                                    <img
                                        src={slide.src}
                                        alt={slide.alt}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                    <p className="text-sm text-gray-600 truncate">{slide.alt}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setEditingCarousel(carousel)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDeleteCarousel(carousel._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editingCarousel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Modifier le carousel</h2>
                        <div className="grid grid-cols-5 gap-4 mb-4">
                            {editingCarousel.slides.map((slide, index) => (
                                <div key={index} className="space-y-2">
                                    <input
                                        type="file"
                                        onChange={(e) => e.target.files && handleSlideChange(index, e.target.files[0], 'edit')}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    <input
                                        type="text"
                                        value={slide.alt}
                                        onChange={(e) => {
                                            const newSlides = [...editingCarousel.slides];
                                            newSlides[index] = { ...newSlides[index], alt: e.target.value };
                                            setEditingCarousel({ ...editingCarousel, slides: newSlides });
                                        }}
                                        className="w-full p-2 border rounded"
                                    />
                                    <img
                                        src={slide.src}
                                        alt={slide.alt}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleUpdateCarousel}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Enregistrer
                            </button>
                            <button
                                onClick={() => setEditingCarousel(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}