export default function Contact({ content }: { content: any }) {
    return (
        <div>
            <h2>{content?.title || 'Contact Title'}</h2>
            <h3>{content?.subtitle}</h3>
            
            <p><strong>Email :</strong> {content?.email}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}><strong>Adresse :</strong> {content?.address}</p>
            
            <div>
                <strong>Téléphones :</strong>
                <ul>
                    {content?.phones?.map((phone: string, idx: number) => (
                        <li key={idx}>{phone}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
