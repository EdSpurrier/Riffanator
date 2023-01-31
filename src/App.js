import React from 'react';
import { theme } from './theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Layout from './Layout';
import { WebMidi } from "webmidi";
import EventBus from './common/systems/EventBus';
import { config } from './common/utils/config';
import useEventListener from './common/hooks/useEventListener';


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
    initialized: false,
    updateMidiFrame: null
  },
  instruments: [],
  midiCore: {
    initialized: false,
    midiClock: null,
  }
}


window.guitars = [
  {
    rootOctave: config.guitarMachine.machines[0].rootOctave,
    groove: [],
    midi: {
      output: {
        name: config.guitarMachine.machines[0].midi.output.name,
        id: config.guitarMachine.machines[0].midi.output.id
      },
    }
  },
  {
    rootOctave: config.guitarMachine.machines[1].rootOctave,
    groove: [],
    midi: {
      output: {
        name: config.guitarMachine.machines[1].midi.output.name,
        id: config.guitarMachine.machines[1].midi.output.id
      },
    }
  }
]



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



  useEventListener('keyup', (evt) => {
    console.log(evt.code);
    if (evt.code === 'Escape') {
      alert('escape');
    }
  });


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Layout />



    </ThemeProvider>
  );

}

export default App;