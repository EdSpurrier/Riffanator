import React, { memo } from 'react';
import styled from 'styled-components';
import SideBarLeft from '../../../Sections/SideBarLeft';
import SideBarRight from '../../../Sections/SideBarRight';
import Dashboard from '../../modules/Dashboard';
import Transport from '../../modules/Transport';



const FullScreen = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    height: 100vh;
    flex-direction: column;
`

const MainWorkspace = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-direction: row;
    flex-grow: 1;
`


const Layout = memo(({props}) => {

    return (
        <FullScreen>
            <MainWorkspace>
                <SideBarLeft />
                <Dashboard />
                <SideBarRight />
            </MainWorkspace>
            <Transport />
        </FullScreen>
    );

});

Layout.displayName = 'Layout';

export default Layout;
