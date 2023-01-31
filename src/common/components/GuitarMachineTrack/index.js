import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import GuitarMachineTrackControlBar from './ControlBar';
import FretBoard from './FretBoard';
import Guitar from './Guitar';
import GuitarTablatureTrack from './GuitarTablatureTrack';


const Container = styled.div`
    background: ${({ theme }) => theme.colors.machine.background};
    padding: 0 ${({ theme }) => theme.sizes.machine.paddingHorizontal};
`;



/*
    window.guitars = [
        {
            rootOctave    : config.guitarMachine.machines[0].rootOctave,
            groove          : [],
            midi            : {
                output          : {
                    name    : config.guitarMachine.machines[0].midi.output.name,
                    id      : config.guitarMachine.machines[0].midi.output.id
                },
            },
            guitar          : null,
            tablature       : [
            
            ],
        },
        {
            rootOctave    : config.guitarMachine.machines[1].rootOctave,
            groove          : [],
            midi            : {
                output          : {
                    name    : config.guitarMachine.machines[1].midi.output.name,
                    id      : config.guitarMachine.machines[1].midi.output.id
                },
            },
            guitar          : null,
            tablature       : [
            
            ],
        }
    ]
*/
const GuitarMachineTrack = memo(({ children, machineId }) => {

    const [guitar, setGuitar] = useState(new Guitar());

    const [controlStates, setControlStates] = useState({
        showFretBoard       : true,
        selectedNote        : -1
    });

    const updateControlStates = (controlStateName, state) => {
        console.log(controlStateName, state);
        if(controlStateName === 'showFretBoard') {
            setControlStates(prevState => ({...prevState,  
                showFretBoard   : state
            }));
        } else if (controlStateName === 'selectedNote') {
            setControlStates(prevState => ({...prevState,  
                selectedNote  : state
            }));
        };
       
    }


    useEffect(() => {
        console.log('controlStates update:', controlStates);
    }, [controlStates]);



    useEffect(() => {
        console.log('guitar update:', guitar);

        window.guitars[machineId].guitar = guitar;
    }, [guitar]);


    return (
        <Container>

            <GuitarMachineTrackControlBar
                machineId={machineId}
                updateControl={updateControlStates}
            />

            <GuitarTablatureTrack
                guitar={guitar}
                machineId={machineId}
                updateControl={updateControlStates}
            />

            <FretBoard
                guitar={guitar}
                machineId={machineId}
                showFretBoard={controlStates.showFretBoard}
                selectedNote={controlStates.selectedNote}
                updateControl={updateControlStates}
            />

        </Container>
    );

});

GuitarMachineTrack.displayName = 'GuitarMachineTrack';

export default GuitarMachineTrack;