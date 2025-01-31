"use client";

import React, { useState } from "react";

interface PortfolioItem {
    id: number;
    title: string;
    images: File[];
}

export default function PortfolioManagement() {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [newPortfolioItem, setNewPortfolioItem] = useState({ title: "", images: [null, null, null] });
    const [editPortfolioItem, setEditPortfolioItem] = useState<PortfolioItem | null>(null);

    const handleAddPortfolioItem = () => {
        setPortfolioItems([
            ...portfolioItems,
            { id: Date.now(), title: newPortfolioItem.title, images: newPortfolioItem.images },
        ]);
        setNewPortfolioItem({ title: "", images: [null, null, null] });
    };

    const handleEditPortfolioItem = (id: number) => {
        const item = portfolioItems.find((item) => item.id === id);
        if (item) {
            setEditPortfolioItem(item);
        }
    };

    const handleUpdatePortfolioItem = () => {
        if (editPortfolioItem) {
            setPortfolioItems(
                portfolioItems.map((item) =>
                    item.id === editPortfolioItem.id ? editPortfolioItem : item
                )
            );
            setEditPortfolioItem(null);
        }
    };

    const handleDeletePortfolioItem = (id: number) => {
        setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
    };

    const handleImageChange = (index: number, file: File) => {
        const newImages = [...newPortfolioItem.images];
        newImages[index] = file;
        setNewPortfolioItem({ ...newPortfolioItem, images: newImages });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Portfolio Management</h1>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Add New Portfolio Item</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newPortfolioItem.title}
                    onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                {newPortfolioItem.images.map((image, index) => (
                    <input
                        key={index}
                        type="file"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                        className="border p-2 mb-2 w-full"
                    />
                ))}
                <button onClick={handleAddPortfolioItem} className="bg-blue-500 text-white p-2 rounded">
                    Add Portfolio Item
                </button>
            </div>

            {editPortfolioItem && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Edit Portfolio Item</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editPortfolioItem.title}
                        onChange={(e) => setEditPortfolioItem({ ...editPortfolioItem, title: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    {editPortfolioItem.images.map((image, index) => (
                        <input
                            key={index}
                            type="file"
                            onChange={(e) => {
                                const newImages = [...editPortfolioItem.images];
                                newImages[index] = e.target.files[0];
                                setEditPortfolioItem({ ...editPortfolioItem, images: newImages });
                            }}
                            className="border p-2 mb-2 w-full"
                        />
                    ))}
                    <button onClick={handleUpdatePortfolioItem} className="bg-green-500 text-white p-2 rounded">
                        Update Portfolio Item
                    </button>
                </div>
            )}

            <div>
                <h2 className="text-xl font-semibold">Portfolio Items</h2>
                {portfolioItems.map((item) => (
                    <div key={item.id} className="border p-4 mb-2">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <div className="flex space-x-2">
                            {item.images.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt={`Portfolio ${index + 1}`} className="w-24 h-24 object-cover" />
                            ))}
                        </div>
                        <button
                            onClick={() => handleEditPortfolioItem(item.id)}
                            className="bg-yellow-500 text-white p-2 rounded mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeletePortfolioItem(item.id)}
                            className="bg-red-500 text-white p-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}