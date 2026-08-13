import { usePage } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';
import About from './partials/About';
import Contact from './partials/Contact';
import Header from './partials/Header';
import ScheduleAndPlan from './partials/ScheduleAndPlan';
import Workshop from './partials/Workshop';

const App = ({ workshops }: { workshops: any[] }) => {
    const { siteContents } = usePage<any>().props;

    return (
        <>
            <Header content={siteContents?.header} />
            <About content={siteContents?.about} />
            <Workshop workshops={workshops} content={siteContents?.workshop} />
            <ScheduleAndPlan content={siteContents?.schedule} />
            <Contact content={siteContents?.contact} />
        </>
    );
};

App.layout = (page: React.ReactNode) => <SiteLayout>{page}</SiteLayout>;

export default App;
