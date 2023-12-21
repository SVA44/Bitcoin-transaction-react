import ResponsiveGrid from '../Components/Contents/Grid.js';
import Header from '../Components/UI/Header.js';
import Footer from '../Components/UI/Footer.js';


const Information = ({url}) => {
    return (
        <div>
            <Header />
            <ResponsiveGrid url={url}/>
            <Footer/>
        </div> 
    );
}

export default Information;