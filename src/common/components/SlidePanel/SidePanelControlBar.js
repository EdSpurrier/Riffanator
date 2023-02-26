import clsx from 'clsx';
import React, { memo } from 'react';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    align-items: center;
    &.hidden {
        display: none;
    }
    margin-bottom: 5px;
`


const SidePanelControlBar = memo(({ children, hidden=false, classNames}) => {

    return (
        <Container className={clsx(classNames, hidden ? 'hidden' : '')}>
            { children }
        </Container>
    );

});

SidePanelControlBar.displayName = 'SidePanelControlBar';

export default SidePanelControlBar;
