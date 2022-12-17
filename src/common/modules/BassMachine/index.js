import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`


const BassMachine = memo(({ name, show }) => {

    return (
        show ? (
            <Container>
                { name } : BassMachine
            </Container>
        ) : <></>
    );
    
});

BassMachine.displayName = 'BassMachine';

export default BassMachine;
