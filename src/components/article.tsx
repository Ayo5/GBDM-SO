import React from "react";

interface Section {
    _id: number;
    title: string;
    content: string;
    image?: string;
    imageAlt?: string;
    width?: number;
    height?: number;
}

interface ArticleProps {
    sections?: Section[];
}


const Article: React.FC<ArticleProps> = ({ sections = [] }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-black mb-12">Article</h1>

            <div className="space-y-16 mx-20">
                {sections.map((section, index) => (
                    <div
                        key={section._id}
                        className={`
                            flex flex-col gap-8 my-20
                            ${section.image ? 'md:flex-row md:items-center' : 'items-center'}
                            ${index % 2 === 1 && section.image ? 'md:flex-row-reverse md:gap-24' : 'md:gap-12'}
                            ${index % 2 === 1 ? 'md:ml-22 md:mr-6' : ''}
                        `}
                    >
                        {section.image && (
                            <div className="w-full md:w-1/2">
                                <img
                                    src={section.image}
                                    alt={section.imageAlt || 'Article image'}
                                    width={section.width}
                                    height={section.height}
                                    className="w-auto rounded-lg shadow-lg"
                                    style={{
                                        width: section.width ? `${section.width}px` : 'auto',
                                        height: section.height ? `${section.height}px` : 'auto',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        )}

                        <div className={`
                            ${section.image ? 'w-full md:w-1/2' : 'max-w-3xl'}
                            space-y-4
                        `}>
                            {section.title && (
                                <h2 className="text-2xl font-semibold text-black">
                                    {section.title}
                                </h2>
                            )}
                            <p className="text-black leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Article;;