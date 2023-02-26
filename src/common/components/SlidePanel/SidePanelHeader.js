import clsx from 'clsx';
import React, { memo } from 'react';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.sidePanel.header};
    &.hidden {
        display: none;
    }
    margin-bottom: 5px;
`


const SidePanelHeader = memo(({ children, hidden=false, classNames}) => {

    return (
        <Container className={clsx(classNames, hidden ? 'hidden' : '')}>
            { children }
        </Container>
    );

});

SidePanelHeader.displayName = 'SidePanelHeader';

export default SidePanelHeader;
