export default function About({ content }: { content: any }) {
    return (
        <div>
            <h2>{content?.title || 'About Title'}</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{content?.description}</p>
            
            <div>
                <p>Images par défaut :</p>
                {content?.default_images?.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt={`Default ${idx}`} width="100" />
                ))}
                
                <p>Images au survol :</p>
                {content?.hover_images?.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt={`Hover ${idx}`} width="100" />
                ))}
            </div>
        </div>
    );
}
