import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`


const VocalMachine = memo(({ name, show }) => {

    return (
        show ? (
            <Container>
                { name } : VocalMachine
            </Container>
        ) : <></>
    );
    
});

VocalMachine.displayName = 'VocalMachine';

export default VocalMachine;
