export default function Footer({ content }: { content: any }) {
    return (
        <footer>
            <p><strong>Sous-titre :</strong> {content?.subtitle}</p>
            <p><strong>Accroche :</strong> {content?.catchphrase}</p>
        </footer>
    );
}
