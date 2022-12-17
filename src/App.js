import React from 'react';
import { Layout } from 'antd';
import Dashboard from './common/modules/Dashboard';
import { theme } from './theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import SideBarLeft from './common/modules/SideBarLeft';
import SideBarRight from './common/modules/SideBarRight';
import FileSelector from './common/modules/FileSelector';

const GlobalStyles = createGlobalStyle`
  html, body {
 
  }
`;


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <SideBarLeft />
        <Layout>
          <Dashboard />
        </Layout>
        <FileSelector>
          hideFileSelector
        </FileSelector>
        <SideBarRight />
      </Layout>
      
    </ThemeProvider>
  );
}

export default App;