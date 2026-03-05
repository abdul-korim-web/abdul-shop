import React from 'react';
import Herocarocel from './Pages/Herocarocel';

import Sale from './Pages/Sale';
import HomeProducct from './Pages/HomeProducct';

const HomeLayout = () => {
    return (
        <div>
            <Herocarocel/>
            
            <Sale/>
            <HomeProducct/>
        </div>
    );
}

export default HomeLayout;
