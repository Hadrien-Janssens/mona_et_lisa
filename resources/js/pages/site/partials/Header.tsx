export default function Header({ content }: { content: any }) {
    return (
        <div className="flex h-screen items-start justify-center gap-10 pt-20">
            {/* LEFT  */}
            <div>
                <h1 className="font-titre-lemon text-6xl">
                    {content?.title || 'Header Title'}
                </h1>
                <p>{content?.subtitle}</p>
                {content?.button1_label && (
                    <button>{content.button1_label}</button>
                )}
                {content?.button2_label && (
                    <button>{content.button2_label}</button>
                )}
            </div>

            {/* RIGHT  */}
            <div className="" style={{ display: 'flex', gap: '10px' }}>
                {content?.images?.map((img: string, idx: number) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Header Image ${idx}`}
                        width="100"
                    />
                ))}
            </div>
        </div>
    );
}
