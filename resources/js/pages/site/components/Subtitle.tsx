type SubtitleProps = {
    children: string;
    className?: string;
};
export default function Subtitle({ children, className }: SubtitleProps) {
    return (
        <h2 className={`font-titre-lemon text-5xl ${className}`}>{children}</h2>
    );
}
