
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Navber1 from '../Components/Navber1';

const MainLayout = () => {

  
    return (
        <div>
            <Navber1></Navber1>
            <Outlet>
                
            </Outlet>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;