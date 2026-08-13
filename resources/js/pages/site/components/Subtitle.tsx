type SubtitleProps = {
    children: string;
};
export default function Subtitle({ children }: SubtitleProps) {
    return <h2 className="font-titre-lemon text-5xl">{children}</h2>;
}
