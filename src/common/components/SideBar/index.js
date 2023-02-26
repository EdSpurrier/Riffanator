import React, { memo } from 'react';
import styled from 'styled-components';


const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: ${({ theme }) => theme.sizes.transport.height};
    background: ${({ theme }) => theme.colors.sideBar.background};
    ${props => props.width ?
    `width: ${props.width}` : 
    `width: ${({ theme }) => theme.sizes.sideBar.width}`
    };
    display: flex;
    flex-direction: column;
    z-index: ${({ theme }) => theme.heirarchy.sideBar};
    ${props => props.side === 'left'?
    'left: 0px' : 
    'right: 0px'
    };
`



const SideBar = memo(({ children, width, side = 'left' }) => {
    
    return (
        <Container width={width} side={side}>
           { children }
        </Container>
    );
    
});

SideBar.displayName = 'SideBar';

export default SideBar;
