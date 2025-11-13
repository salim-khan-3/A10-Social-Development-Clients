import Banner from '../../Components/Banner/Banner';
import Gallery from '../../Components/Gallery/Gallery';
import Newsletter from '../../Components/Newsletter/Newsletter';
import Features from '../../Components/Features/Features';

const Home = () => {
    return (
        <div className='bg-white dark:text-black'>
            <Banner></Banner>
            <Features></Features>
            <Gallery></Gallery>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;