import Footer from './components/Footer';
import Nav from './components/Nav';
import About from './partials/About';
import Contact from './partials/Contact';
import Header from './partials/Header';
import ScheduleAndPlan from './partials/ScheduleAndPlan';
import Workshop from './partials/Workshop';

const app = ({ workshops, siteContents }: { workshops: any[], siteContents: any }) => {
    return (
        <div>
            <Nav />
            <Header content={siteContents?.header} />
            <About content={siteContents?.about} />
            <Workshop workshops={workshops} content={siteContents?.workshop} />
            <ScheduleAndPlan content={siteContents?.schedule} />
            <Contact content={siteContents?.contact} />
            <Footer content={siteContents?.footer} />
        </div>
    );
};

export default app;
