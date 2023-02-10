import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';


const Button = styled.button`
    transition: ${({ theme }) => theme.animation.fast};
    cursor: pointer;

    color: ${({ theme }) => theme.colors.controlBar.button.unselected};



    &.selected {
        
        color: ${({ theme }) => theme.colors.controlBar.button.selected};

        svg g, svg {
            fill: ${({ theme }) => theme.colors.controlBar.button.selected};
        }
    }

    &:hover {
        color: ${({ theme }) => theme.colors.controlBar.button.hover};

        svg g, svg {
            fill: ${({ theme }) => theme.colors.controlBar.button.hover};
        }
    }

    svg g, svg {
        fill: ${({ theme }) => theme.colors.controlBar.button.unselected};
        transition: fill ${({ theme }) => theme.animation.fast};
    }
    
`;






const ToggleButton = memo(({ 
    iconActive, 
    iconInactive, 
    classNames, 
    onClickAction, 
    toggleState
}) => {

    const onClickToggle = (event) => {
        
        //console.log(event);

        if (!onClickAction) {
            alert('No Action Connected....');
            return;
        };

        onClickAction();

    }

    return (
        <Button onClick={onClickToggle} className={clsx(classNames, (toggleState?'selected':''))}>
            {(toggleState?iconActive:iconInactive)}
        </Button>
    );

});

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;