export default function ScheduleAndPlan({ content }: { content: any }) {
    return (
        <div>
            <h2>{content?.title || 'Schedule Title'}</h2>
            <h3>{content?.subtitle}</h3>
            {content?.image && <img src={content.image} alt="Schedule" width="200" />}
            
            <ul>
                {content?.schedules?.map((schedule: any, idx: number) => (
                    <li key={idx}>
                        <strong>{schedule.day}</strong> : {schedule.hours}
                    </li>
                ))}
            </ul>

            {content?.button_label && <button>{content.button_label}</button>}
        </div>
    );
}
