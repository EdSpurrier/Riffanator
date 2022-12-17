import React, { memo, useEffect } from 'react';
import styled from 'styled-components';


const Container = styled.div`
    position: fixed;
    width: 600px;
    right: -650px;
    
    background-color: ${({ theme }) => theme.colors.dark.background};
    color: ${({ theme }) => theme.colors.dark.text};

    top: 0;
    bottom: 0;
    
    border-left: 1px solid ${({ theme }) => theme.colors.dark.border};
    padding: 0 20px;
    transition: right  ${({ theme }) => theme.animation.med_slow};
    &.active {
        right: 50px;
    }
`


const SlideDrawer = memo(({children, openState}) => {

    useEffect(() => {}, [openState]);

    return (
        <Container className={openState?'active':''}>
            {children}
        </Container>
    );
});

SlideDrawer.displayName = 'SlideDrawer';

export default SlideDrawer;
