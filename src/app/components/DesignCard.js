export default function DesignCard({ title, description, images }) {
    return (
        <div className="border-8 border-[#00ff00] bg-black p-4 rounded-none text-[#00ff00] font-pixel shadow-lg mb-4">
            <h3 className="text-xl text-[#00ff00] mb-2">{title}</h3>
            <p className="text-sm text-white mb-4">{description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`${title} screenshot ${i + 1}`}
                        className="w-auto h-auto p-2 border-2 border-[#00ff00] object-contain max-h-[500px] rounded-sm"
                    />
                ))}
            </div>
        </div>
    );
}