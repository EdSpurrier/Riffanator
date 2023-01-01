import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import GuitarInstrumentTrack from '../../components/InstrumentTrack/GuitarInstrumentTrack';
import InstrumentControls from '../../components/InstrumentTrack/InstrumentControls.js';
import Guitar from '../../music/Guitar';
import EventBus from '../../systems/EventBus';

const Container = styled.div`
    display: none;


    &.active {
        display:block;
    }
`


const GuitarMachine = memo(({ name, show }) => {

    const [guitar, setGuitar] = useState(new Guitar());

    const [slices, setSlices] = useState([]);

    useEffect(() => {

        EventBus.on("Update Instrument", (event) => {
            if (name === event.label) {

                if(event.data.includes('Setup')) {
                    
                    guitar.Setup({
                        instrumentName : name,
                        guitarTuning : 'Drop-B',
                        barCount : 2
                    });
                    

                    setSlices(guitar.GetSlices());
                };
                
            }
        });


        return () => {
            EventBus.remove("Update Instrument");
        };
    }, []);


    return (
        <Container className={clsx(show?'active':'')}>
            
            <GuitarInstrumentTrack slices={slices}>
                { name }
                <InstrumentControls instrumentName={name} />
            </GuitarInstrumentTrack>
            
        </Container>
    );
    
});

GuitarMachine.displayName = 'GuitarMachine';

export default GuitarMachine;
