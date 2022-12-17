import React, { memo } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

const Container = styled.div`
    height: ${props => props.width || "50px"};
    width: ${props => props.width || "50px"};
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.sideBar.button.unselected};

    transition: color ${({ theme }) => theme.animation.fast};
    transition: border-left ${({ theme }) => theme.animation.med};


    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;

    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;

    svg g, svg {
        fill: ${({ theme }) => theme.colors.sideBar.button.unselected};
        transition: fill ${({ theme }) => theme.animation.fast};
    }



    &:hover {
        color: ${({ theme }) => theme.colors.sideBar.button.hover};

        svg g, svg {
            fill: ${({ theme }) => theme.colors.sideBar.button.hover};
        }
    }

    &.selected {
        color: ${({ theme }) => theme.colors.sideBar.button.selected};

        svg g, svg {
            fill: ${({ theme }) => theme.colors.sideBar.button.selected};
        }
    }

    &.left.selected {
        border-left: 2px solid ${({ theme }) => theme.colors.sideBar.button.selected};
    }

    &.right.selected {
        border-right: 2px solid ${({ theme }) => theme.colors.sideBar.button.selected};
    }

    &.top.selected {
        border-top: 2px solid ${({ theme }) => theme.colors.sideBar.button.selected};
    }

    &.bottom.selected {
        border-bottom: 2px solid ${({ theme }) => theme.colors.sideBar.button.selected};
    }
`



const SideBarButton = memo(({ children, selected = false, onClick = null, side, label, keyId }) => {

    const TriggerClick = (e) => {
        if (onClick) {
            onClick(keyId);
        } else {
            alert('No onClick Hooked Up....');
        }
    }

    return (
        <Container className={clsx({selected:selected}, side)} onClick={TriggerClick}>
           { children }
        </Container>
    );
});

SideBarButton.displayName = 'SideBarButton';

export default SideBarButton;
