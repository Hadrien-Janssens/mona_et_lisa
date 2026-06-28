import Subtitle from '../components/Subtitle';
import Subtitle2 from '../components/Subtitle2';

export default function Contact({ content }: { content: any }) {
    return (
        <div className="relative overflow-hidden">
            <div className="mx-auto w-full max-w-250 py-20">
                <Subtitle>{content?.title || 'Contact Title'}</Subtitle>
                <Subtitle2>{content?.subtitle}</Subtitle2>

                <p>
                    <strong>Email :</strong> {content?.email}
                </p>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    <strong>Adresse :</strong> {content?.address}
                </p>

                <div>
                    <strong>Téléphones :</strong>
                    <ul>
                        {content?.phones?.map((phone: string, idx: number) => (
                            <li key={idx}>{phone}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
