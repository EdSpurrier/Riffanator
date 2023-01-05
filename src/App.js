import React from 'react';
import { theme } from './theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import FileSelector from './common/modules/FileSelector';
import Layout from './Layout';
import { WebMidi } from "webmidi";
import EventBus from './common/systems/EventBus';


const GlobalStyles = createGlobalStyle`
  html, body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    user-select: none;
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;

window.midi = {
  webMidi: null,
  inputs: [],
  outputs: [],
  grooveSkeleton: {
    initialized : false,
    updateMidiFrame: null
  },
  instruments: [],
  midiCore: {
    initialized : false,
    midiClock : null,
  }
}


WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));


function onEnabled() {
/* 
  // Inputs
  WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));

  // Outputs
  WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));
 */

  window.midi.webMidi = WebMidi;

  window.midi.inputs = WebMidi.inputs;
  window.midi.outputs = WebMidi.outputs;
  


  EventBus.dispatch("Update System", {
    label: "Midi Initialized",
    data: {}
  });
}



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