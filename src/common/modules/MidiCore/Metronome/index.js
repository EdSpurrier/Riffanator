import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`

const Metronome = memo(({ name }) => {

    return (
        <Container>
            Metronome
        </Container>
    );
    
});

Metronome.displayName = 'Metronome';

export default Metronome;
