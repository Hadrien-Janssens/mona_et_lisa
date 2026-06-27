type ButtonProps = {
    children: string;
};
export default function Button({ children }: ButtonProps) {
    return (
        <button className="rounded-2xl rounded-tr-4xl rounded-bl-4xl border-3 border-primary bg-secondary px-3 py-2 text-secondary-foreground shadow">
            {children}
        </button>
    );
}
