import React, { memo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EventBus from '../../../systems/EventBus';
import { WebMidi } from 'webmidi';
import { config } from '../../../utils/config';
import ToggleButton from '../../Buttons/ToggleButton';
import UnmuteIcon from '../../Icons/UnmuteIcon';
import MuteIcon from '../../Icons/MuteIcon';
import GuitarTabIcon from '../../Icons/GuitarTabIcon';
import CloneIcon from '../../Icons/CloneIcon';



const Container = styled.div`
    height: ${({ theme }) => theme.sizes.machine.controlBar.height};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.sizes.machine.controlBar.marginBottom};

    font-size: ${({ theme }) => theme.fontSizes.machine.controlBar};
    color: ${({ theme }) => theme.colors.machine.controlBar.text};

    select {
        font-size: ${({ theme }) => theme.fontSizes.machine.controlBar};
        color: ${({ theme }) => theme.colors.machine.controlBar.text};
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        cursor: pointer;
        outline: none;
        option {
            background: ${({ theme }) => theme.colors.machine.controlBar.background};
        }
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




const GuitarMachineTrackControlBar = memo(({ children, machineId, updateControl=null }) => {

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

        window.guitars[machineId].midi.output = newMidiOutput;
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

        //console.log('muteState:', muteState);

    }, [muteState]);

    const toggleMute = () => {
        //console.log('toggleMute()');
        setMuteState(!muteState);
    }




    const [showFretBoard, setShowFretBoard] = useState(true);


    useEffect(() => {

        //console.log('showFretBoard:', showFretBoard);
        updateControl('showFretBoard', showFretBoard);

    }, [showFretBoard]);


    const toggleFretBoard = () => {
        //console.log('toggleFretBoard()');
        setShowFretBoard(!showFretBoard);
    }


    const cloneGrooveSkeleton = () => {
        //console.log('cloneGrooveSkeleton()');

        updateControl('selectedNote', -1);

        EventBus.dispatch("Update GuitarMachine", {
            label: "Clone GrooveSkeleton",
            data: machineId
        });
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
                <ToggleButton 
                    iconActive={<GuitarTabIcon size={'1em'} />}
                    iconInactive={<GuitarTabIcon size={'1em'}/>}
                    onClickAction={toggleFretBoard}
                    toggleState={showFretBoard}
                />
                <ToggleButton 
                    iconActive={<CloneIcon size={'1em'} />}
                    iconInactive={<CloneIcon size={'1em'}/>}
                    onClickAction={cloneGrooveSkeleton}
                    toggleState={true}
                />
            </Control>

            <Control>
                Guitar #{machineId+1}
            </Control>

            <Control>
                <MidiOutputSelector
                    ref={midiOutputRef}
                    onChange={(event) => changeMidiOutput(event.target.value)}
                    defaultValue={currentMidiOutput}
                >
                    {renderMidiOutputOptions(window?.midi?.outputs || [])}
                </MidiOutputSelector>
            </Control>

        </Container>
    );
});

GuitarMachineTrackControlBar.displayName = 'GuitarMachineTrackControlBar';

export default GuitarMachineTrackControlBar;