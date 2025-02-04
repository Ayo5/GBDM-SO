export const ParallaxSection = () => {
    return (
        <div
            className="relative w-full h-[400px] bg-fixed bg-center bg-cover"
            style={{ backgroundImage: "url('/uploads/webp/DSC03697.webp')", backgroundAttachment: "fixed" }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
    );
};