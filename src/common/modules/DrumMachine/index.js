import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`

const DrumMachine = memo(({ name, show }) => {

    return (
        show ? (
            <Container>
                { name } : DrumMachine
            </Container>
        ) : <></>
    );
    
});

DrumMachine.displayName = 'DrumMachine';

export default DrumMachine;
