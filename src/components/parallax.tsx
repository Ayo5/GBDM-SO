interface ParallaxProps {
    image: string;
}

export const ParallaxSection: React.FC<ParallaxProps> = ({ image }) => {
    return (
        <div
            className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-fixed bg-center bg-cover"
            style={{ backgroundImage: `url('/uploads/webp/${image}.webp')`, backgroundAttachment: "fixed" }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
    );
};