import Image from 'next/image';

interface CardProps {
    imageUrl: string;
    altText: string;
    href: string;
    width?: number;
    height?: number;

}

const Card: React.FC<CardProps> = ({ imageUrl, altText, href , width, height}) => {
    return (
        <div className="max-w-md rounded-3xl border-2 border-white/10 overflow-hidden shadow-md hover:shadow-white/20 transition-shadow duration-300">
            <a href={href}>
                <Image
                    className="w-auto h-auto"
                    src={imageUrl}
                    alt={altText}
                    width={width}
                    height={height}
                    objectFit="cover"
                    quality={100}
                />
            </a>
        </div>
    );
};

export default Card;