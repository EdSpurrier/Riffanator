import React, { memo } from 'react';
import styled from 'styled-components';
import InstrumentTrack from '../../components/InstrumentTrack';

const Container = styled.div`

`


const GuitarMachine = memo(({ name, show }) => {

    return (
        show ? (
            <Container>
                <InstrumentTrack>
                    { name } : GuitarMachine
                </InstrumentTrack>
            </Container>
        ) : <></>
    );
    
});

GuitarMachine.displayName = 'GuitarMachine';

export default GuitarMachine;
