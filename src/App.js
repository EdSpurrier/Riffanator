import React from 'react';
import { theme } from './theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import FileSelector from './common/modules/FileSelector';
import Layout from './Layout';

const GlobalStyles = createGlobalStyle`
  html, body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    user-select: none;
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;


function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

        <Layout />
          
        
        
        <FileSelector>
          hideFileSelector
        </FileSelector>


    </ThemeProvider>
  );
}

export default App;