import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import InstrumentTrack from '../../components/InstrumentTrack';
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

    const [instrumentData, setInstrumentData] = useState({
        meta: {
            instrumentName  : '',
            setup           : false
        },
        tuning: [],
        strings: [],
        style: [],
    });

    useEffect(() => {

        EventBus.on("Update Instrument", (event) => {
            if (name === event.label) {

                if(event.data.includes('Setup')) {
                    
                    var answer = window.confirm("This Will Wipe All Data?");
                    if (answer) {
                        guitar.Setup({
                            instrumentName : name,
                            guitarTuning : 'Drop-B',
                            numberOfStrings : 6,
                            barCount : 4,
                            totalFrets : 24
                        });
                        
                        setInstrumentData(guitar.GetAllData());
                    }
                    else {
                        
                    }

                    
                };
                
            }
        });


        return () => {
            EventBus.remove("Update Instrument");
        };
    }, []);


    
    useEffect(() => {
        if (instrumentData === null) {
            return;
        }
        console.log("instrumentData Updated....", instrumentData);
        
    }, [instrumentData]);

    
    const renderTuning = (tuning) => {
        return tuning.map((stringTuning, key) =>
            <div key={key}> |{key}-{stringTuning} </div>
        )
    }



    return (
        <Container className={clsx(show?'active':'')}>
            
            <GuitarInstrumentTrack instrumentData={instrumentData} guitar={guitar}>
                { name } : {renderTuning(instrumentData['tuning'])}
                <InstrumentControls instrumentName={name} />
            </GuitarInstrumentTrack>
        </Container>
    );
    
});

GuitarMachine.displayName = 'GuitarMachine';

export default GuitarMachine;
