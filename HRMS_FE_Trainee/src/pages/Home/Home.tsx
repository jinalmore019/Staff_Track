import Header from "./Component/Header";
import UseCase from "./Component/UseCase";
import WhyToggl from "./Component/WhyToggl";
import HeroSection from "./Component/HeroSection";
import Section3 from "./Component/Section3";
import Footer from "./Component/Footer";

const Home = () => {
    return (
        <div className="relative">
            <div className="fixed w-full z-30">
                <Header />
            </div>
            <div id="heroSection">
                <HeroSection />
            </div>
            <div id="useCase">
                <UseCase />
            </div>
            <div id="whatNew">
                <Section3 />
            </div>
            <div id="whyUs">
                <WhyToggl />
            </div>
            <div >
                <Footer/>
            </div>
        </div>
    );
};

export default Home;
