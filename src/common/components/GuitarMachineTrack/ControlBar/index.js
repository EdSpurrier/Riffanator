import React, { memo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EventBus from '../../../systems/EventBus';
import { WebMidi } from 'webmidi';
import { config } from '../../../utils/config';
import ToggleButton from '../../Buttons/ToggleButton';
import UnmuteIcon from '../../Icons/UnmuteIcon';
import MuteIcon from '../../Icons/MuteIcon';

const Container = styled.div`
    height: ${({ theme }) => theme.sizes.machine.controlBar.height};
    background: ${({ theme }) => theme.colors.machine.controlBar.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.sizes.machine.controlBar.marginBottom};

    font-size: ${({ theme }) => theme.fontSizes.machine.controlBar};
    color: ${({ theme }) => theme.colors.machine.controlBar.text};

    select {
        font-size: ${({ theme }) => theme.fontSizes.machine.controlBar};
        color: ${({ theme }) => theme.colors.machine.controlBar.text};
        background: ${({ theme }) => theme.colors.machine.controlBar.background}; 
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        cursor: pointer;
        outline: none;
    }

    svg g, svg {
        fill: ${({ theme }) => theme.colors.machine.controlBar.icon};
        margin-right: ${({ theme }) => theme.sizes.machine.controlBar.iconSpacingHorizontal};
    }

`;

const Control = styled.div`
    margin-right: ${({ theme }) => theme.sizes.machine.controlBar.controlSpacingHorizontal};
    display: flex;
    align-items: center;
`




const MidiOutputSelector = styled.select`

`;




const GuitarMachineTrackControlBar = memo(({ children, machineId }) => {

    const [midiOutputs, setMidiOutputs] = useState([]);
    const [currentMidiOutput, setCurrentMidiOutput] = useState(config.guitarMachine.machines[machineId].midi.output)
    const midiOutputRef = useRef(null);


    useEffect(() => {
      EventBus.on("Update System", (event) => {
        if (event.label === "Midi Initialized") {
            setMidiOutputs(window?.midi?.outputs);
            
            const presetOutput = WebMidi.getOutputByName(config.guitarMachine.machines[machineId].midi.output.name);
            let midiOutputId = 0;

            //console.log(config.guitarMachine.machines[machineId].midi.output.name, presetOutput);

            if (presetOutput) {
                midiOutputId = WebMidi.outputs.indexOf(presetOutput);
            }

            changeMidiOutput(midiOutputId);

        }
      });

  
      return () => {
        EventBus.remove("Update System");
      };
    }, []);
  

    useEffect(() => {

        //console.log('midiOutputs:', midiOutputs);
        
    }, [midiOutputs]);


    const changeMidiOutput = (newMidiOutputId) => {

        let newMidiOutput = {
            name: WebMidi.outputs[newMidiOutputId].name,
            id: newMidiOutputId
        };

        setCurrentMidiOutput(newMidiOutput);

        config.guitarMachine.machines[machineId].midi.output = newMidiOutput;
    }


    useEffect(() => {

        EventBus.dispatch("Update machine", {
            label: "Update Midi Output",
            data: currentMidiOutput
        });
        
        midiOutputRef.current.value = currentMidiOutput.id;

    }, [currentMidiOutput]);





    const [muteState, setMuteState] = useState(true);


    useEffect(() => {

        console.log('muteState:', muteState);

    }, [muteState]);

    const toggleMute = () => {
        console.log('toggleMute()');
        setMuteState(!muteState);
    }


    const renderMidiOutputOptions = (midiOutputDevices) => {
        return midiOutputDevices.map((outputDevice, key) =>
            <option key={key} value={key}>{outputDevice.name}</option>
        )
    }

    return (
        <Container>
            <Control>
                <ToggleButton 
                    iconActive={<UnmuteIcon size={'1em'} />}
                    iconInactive={<MuteIcon size={'1em'} />}
                    onClickAction={toggleMute}
                    toggleState={muteState}
                />
            </Control>

            <Control>
                <MidiOutputSelector
                    ref={midiOutputRef}
                    onChange={(event) => changeMidiOutput(event.target.value)}
                >
                    {renderMidiOutputOptions(window?.midi?.outputs || [])}
                </MidiOutputSelector>
            </Control>

        </Container>
    );
});

GuitarMachineTrackControlBar.displayName = 'GuitarMachineTrackControlBar';

export default GuitarMachineTrackControlBar;