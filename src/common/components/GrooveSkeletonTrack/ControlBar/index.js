import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import EventBus from '../../../systems/EventBus';
import ResolutionIcon from '../../Icons/ResolutionIcon';
import theme from '../../../../theme/theme';
import Midi from '../../../utils/Midi';


const Container = styled.div`
    height: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.height};
    background: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.marginBottom};

    font-size: ${({ theme }) => theme.fontSizes.grooveSkeleton.controlBar};
    color: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.text};

    select {
        font-size: ${({ theme }) => theme.fontSizes.grooveSkeleton.controlBar};
        color: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.text};
        background: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.background}; 
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        cursor: pointer;
        outline: none;
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



window.grooveSkeleton = {
    resolution  : 32,
    groove      : [
        
    ],
    midi        : {
        output      : {
            name : ''
        },
    }
};


const GrooveSkeletonTrackControlBar = memo(({ children }) => {

    const [midiOutputs, setMidiOutputs] = useState([]);
    const [currentMidiOutput, setCurrentMidiOutput] = useState(window.grooveSkeleton.midi.output)

    useEffect(() => {
      EventBus.on("Update System", (event) => {
        if (event.label === "Midi Initialized") {
            setMidiOutputs(window?.midi?.outputs);
            if (currentMidiOutput.name === '') {
                changeMidiOutput(window?.midi?.outputs?.[0]);
            }
        }
      });


      
  
      return () => {
        EventBus.remove("Update System");
      };
    }, []);
  

    useEffect(() => {

        //console.log('midiOutputs:', midiOutputs);
        
    }, [midiOutputs]);


    const changeMidiOutput = (newMidiOutput) => {
        setCurrentMidiOutput(newMidiOutput);
        window.grooveSkeleton.midi.output = newMidiOutput;
    }


    useEffect(() => {

        EventBus.dispatch("Update GrooveSkeleton", {
            label: "Update Midi Output",
            data: currentMidiOutput.name
        });
        
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
            <option key={key} value={outputDevice}>{outputDevice.name}</option>
        )
    }

    return (
        <Container>
            <Control>
                <ResolutionIcon size={theme.fontSizes.grooveSkeleton.controlBar} />
                <ResolutionSelector
                    onChange={(event) => changeResolution(event.target.value)}
                    value={currentResolution}
                >
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                </ResolutionSelector>


            </Control>
            <Control>
                <MidiOutputSelector
                    onChange={(event) => changeMidiOutput(event.target.value)}
                    value={currentMidiOutput.name}
                >
                    {renderMidiOutputOptions(window?.midi?.outputs || [])}
                </MidiOutputSelector>
            </Control>
        </Container>
    );
});

GrooveSkeletonTrackControlBar.displayName = 'GrooveSkeletonTrackControlBar';

export default GrooveSkeletonTrackControlBar;