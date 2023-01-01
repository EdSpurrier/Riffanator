import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import GrooveSkeletonTrack from '../../components/GrooveSkeletonTrack';

const Container = styled.div`
    background: ${({ theme }) => theme.colors.instrumentTrack.background};
    width: 100%;
    padding-bottom      : ${({ theme }) => theme.sizes.guitarInstrumentTrack.paddingVertical};
`


const GrooveSkeleton = memo(({ name, show }) => {
    return (
        show ? (
            <Container>
                {name} : GrooveSkeleton
                <GrooveSkeletonTrack />
            </Container>
        ) : <></>
    );

});

GrooveSkeleton.displayName = 'GrooveSkeleton';

export default GrooveSkeleton;
