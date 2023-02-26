import React, { memo } from 'react';
import styled from 'styled-components';
import SideBarLeft from '../Sections/SideBarLeft';
import SideBarRight from '../Sections/SideBarRight';
import Dashboard from '../common/modules/Dashboard';
import Transport from '../common/modules/Transport';
import EventConsole from '../common/systems/EventConsole';
import GeneratorSettings from '../common/modules/GeneratorSettings';
import SystemSettings from '../common/modules/SystemSettings';
import FileManager from '../common/modules/FileManager';


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
    padding: 0 50px 50px;
`


const Layout = memo(({props}) => {

    return (
        <>

            <FullScreen>
                <MainWorkspace>
                    <SideBarLeft />
                    <Dashboard />
                    <SideBarRight />
                </MainWorkspace>
                <Transport />
            </FullScreen>

            <EventConsole />
            <FileManager />
            <GeneratorSettings />
            <SystemSettings />

        </>
        
    );

});

Layout.displayName = 'Layout';

export default Layout;
