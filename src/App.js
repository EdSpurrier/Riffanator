import React from 'react';
import { theme } from './theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import FileSelector from './common/modules/FileSelector';
import Layout from './common/components/Layout';
import EventConsole from './common/systems/EventConsole';


const GlobalStyles = createGlobalStyle`
  html, body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

        <Layout />
          
        <EventConsole />
        
        <FileSelector>
          hideFileSelector
        </FileSelector>


    </ThemeProvider>
  );
}

export default App;