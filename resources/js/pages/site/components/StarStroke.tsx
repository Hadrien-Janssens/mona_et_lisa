export default function StarStroke({ className = '' }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M27.2857 1L31.8857 16.1143L47 20.7143L33.8571 30.5714L40.4286 47L25.3143 37.1429L7.57143 43.7143L14.1429 27.2857L1 14.1429L18.7429 12.1714L27.2857 1Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
