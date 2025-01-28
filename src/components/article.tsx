import React from 'react';
import Image from "next/image";

interface Section {
    image?: string;
    imageAlt?: string;
    title?: string;
    width?: number;
    height?: number;
    content: string;
}

const Article = ({ sections }: { sections: Section[] }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full px-4 py-8">
            <div className="w-full max-w-5xl space-y-16 mt-16 mb-16">
                {sections.map((section: Section, index: number) => (
                    <div
                        key={index}
                        className={`
                            flex flex-col gap-8
                            ${section.image
                            ? 'md:flex-row md:items-center md:gap-12'
                            : 'items-center justify-center'
                        }
                            ${index % 2 === 1 && section.image ? 'md:flex-row-reverse' : ''}
                        `}
                    >
                        {section.image && (
                            <div className="w-full md:w-1/2 flex justify-center">
                                <Image
                                    src={section.image}
                                    alt={section.imageAlt || 'Article image'}
                                    width={section.width || 600}
                                    height={section.height || 400}
                                    objectFit="cover"
                                    quality={100}
                                    className="rounded-lg shadow-2xl"
                                />
                            </div>
                        )}

                        <div className={`
                            ${section.image
                            ? 'w-full md:w-1/2'
                            : 'max-w-2xl text-center px-4'
                        }
                            space-y-4
                        `}>
                            {section.title && (
                                <h2 className="text-2xl font-semibold text-gray-700">
                                    {section.title}
                                </h2>
                            )}
                            <p className="text-gray-700 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Article;