import '../styles/pages/Home.scss'
import HeaderHome from '../components/HeaderHome';
import HomeCarousel from '../components/HomeCarousel';

const Home = ()=>{
    return(
        <div className='home'>
            <HeaderHome className='home__head'/>
            <HomeCarousel/>
        </div>
    )
}

export default Home;