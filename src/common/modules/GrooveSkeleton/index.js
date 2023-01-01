import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import GrooveSkeletonTrack from '../../components/GrooveSkeletonTrack';
import clsx from 'clsx';

const Container = styled.div`
    background: ${({ theme }) => theme.colors.grooveSkeleton.background};
    width: 100%;
    padding: ${({ theme }) => theme.sizes.grooveSkeleton.paddingVertical} 0;
    border-width: ${({ theme }) => theme.sizes.grooveSkeleton.border};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.grooveSkeleton.border};

    &.hide {
        display: none;
    }
`


const GrooveSkeleton = memo(({ name, show }) => {
    return (
        <Container className={clsx(show?'active':'hide')}>
            <GrooveSkeletonTrack />
        </Container>
    );

});

GrooveSkeleton.displayName = 'GrooveSkeleton';

export default GrooveSkeleton;
