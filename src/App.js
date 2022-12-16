import React from 'react';
import { Layout } from 'antd';
import Dashboard from './common/components/Dashboard';
import { theme } from './theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import SideBarLeft from './common/components/SideBarLeft';
import SideBarRight from './common/components/SideBarRight';

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
        <SideBarRight />
      </Layout>
    </ThemeProvider>
  );
}

export default App;