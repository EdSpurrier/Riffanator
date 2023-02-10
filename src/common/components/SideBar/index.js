import React, { memo } from 'react';
import styled from 'styled-components';


const Container = styled.div`
    background: ${({ theme }) => theme.colors.sideBar.background};
    width: ${props => props.width || "50px"};
    display: flex;
    flex-direction: column;
    z-index: ${({ theme }) => theme.heirarchy.sideBar};
`



const SideBar = memo(({ children, width }) => {
    
    return (
        <Container width={width}>
           { children }
        </Container>
    );
    
});

SideBar.displayName = 'SideBar';

export default SideBar;
