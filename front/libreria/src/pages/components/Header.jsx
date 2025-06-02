
import Carousel from './Carousel';
import data from "../../data/carouselData.json";

function Header() {


    return(
        <>
            <Carousel data={data.slides}/>
        </>
    )

}

export default Header;