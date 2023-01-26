import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import GuitarMachineTrackControlBar from './ControlBar';
import FretBoard from './FretBoard';
import Guitar from './Guitar';


const Container = styled.div`
    background: ${({ theme }) => theme.colors.machine.background};

    padding: 0 ${({ theme }) => theme.sizes.machine.paddingHorizontal};
`;






const GuitarMachineTrack = memo(({ children, machineId }) => {

    const [guitar, setGuitar] = useState(new Guitar());

    return (
        <Container>
            <GuitarMachineTrackControlBar 
                machineId={machineId}
            />
            GUITAR id:{machineId} TALBATURE TRACK<br />
            <FretBoard 
                guitar={guitar}
                machineId={machineId}
            />
        </Container>
    );

});

GuitarMachineTrack.displayName = 'GuitarMachineTrack';

export default GuitarMachineTrack;