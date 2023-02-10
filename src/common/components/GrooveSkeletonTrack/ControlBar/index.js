import React, { memo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EventBus from '../../../systems/EventBus';
import ResolutionIcon from '../../Icons/ResolutionIcon';
import theme from '../../../../theme/theme';
import { WebMidi } from 'webmidi';



const Container = styled.div`
    height: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.height};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.marginBottom};

    font-size: ${({ theme }) => theme.fontSizes.grooveSkeleton.controlBar};
    color: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.text};

    select {
        font-size: ${({ theme }) => theme.fontSizes.grooveSkeleton.controlBar};
        color: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.text};
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
        fill: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.icon};
        margin-right: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.iconSpacingHorizontal};
    }

`;

const Control = styled.div`
    margin-right: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.controlSpacingHorizontal};
    display: flex;
    align-items: center;
`


const ResolutionSelector = styled.select`

`;



const MidiOutputSelector = styled.select`

`;


/* window.grooveSkeleton = {
    resolution  : 32,
    groove      : [
        
    ],
    midi        : {
        output      : {
            name : 'Riff Generator',
            id : 0
        },
    }
};
*/

const GrooveSkeletonTrackControlBar = memo(({ children }) => {

    const [midiOutputs, setMidiOutputs] = useState([]);
    const [currentMidiOutput, setCurrentMidiOutput] = useState(window.grooveSkeleton.midi.output)
    const midiOutputRef = useRef(null);


    useEffect(() => {
      EventBus.on("Update System", (event) => {
        if (event.label === "Midi Initialized") {
            setMidiOutputs(window?.midi?.outputs);
            
            const presetOutput = WebMidi.getOutputByName("Riff Generator");
            let midiOutputId = 0;

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

        window.grooveSkeleton.midi.output = newMidiOutput;
    }


    useEffect(() => {

        EventBus.dispatch("Update GrooveSkeleton", {
            label: "Update Midi Output",
            data: currentMidiOutput
        });
        
        midiOutputRef.current.value = currentMidiOutput.id;

    }, [currentMidiOutput]);





    const [currentResolution, setCurrentResolution] = useState(window.grooveSkeleton.resolution)

    const changeResolution = (newResolution) => {
        setCurrentResolution(newResolution);
        window.grooveSkeleton.resolution = newResolution;
    }

    useEffect(() => {

        EventBus.dispatch("Update GrooveSkeleton", {
            label: "Update Resolution",
            data: currentResolution
        });
        
    }, [currentResolution]);



    const renderMidiOutputOptions = (midiOutputDevices) => {
        return midiOutputDevices.map((outputDevice, key) =>
            <option key={key} value={key}>{outputDevice.name}</option>
        )
    }

    return (
        <Container>

            <Control>
                <ResolutionIcon size={theme.fontSizes.grooveSkeleton.controlBar} />
                <ResolutionSelector
                    onChange={(event) => changeResolution(event.target.value)}
                    defaultValue={currentResolution}
                >
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                </ResolutionSelector>
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

GrooveSkeletonTrackControlBar.displayName = 'GrooveSkeletonTrackControlBar';

export default GrooveSkeletonTrackControlBar;