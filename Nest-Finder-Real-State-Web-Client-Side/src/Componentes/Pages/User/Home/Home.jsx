import AdvertisementSection from "./AdvertiseSection/AdvertisementSection";
import Banner from "./Banner/Banner";
import ReviewSection from "./Review/ReviewSection";


const Home = () => {
    return (
        <div className="space-y-20">
            <Banner></Banner>
            <div className="lg:mx-32 mx-6 space-y-20">
                <AdvertisementSection></AdvertisementSection>
                <ReviewSection></ReviewSection>
            </div>
        </div>
    );
};

export default Home;