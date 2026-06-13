import Footer from './components/Footer';
import Nav from './components/Nav';
import About from './partials/About';
import Contact from './partials/Contact';
import Header from './partials/Header';
import ScheduleAndPlan from './partials/ScheduleAndPlan';
import Workshop from './partials/Workshop';

const app = () => {
    return (
        <div>
            <Nav />
            <Header />
            <About />
            <Workshop />
            <ScheduleAndPlan />
            <Contact />
            <Footer />
        </div>
    );
};

export default app;
