import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';


const Button = styled.button`
    transition: ${({ theme }) => theme.animation.fast};
    cursor: pointer;

    colour: ${({ theme }) => theme.colors.controlBar.button.unselected};



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






const SingleButton = memo(({ 
    icon, 
    text,
    classNames, 
    onClickAction
}) => {

    const onButtonClick = (event) => {
        
        //console.log(event);

        if (!onClickAction) {
            alert('No Action Connected....');
            return;
        };

        onClickAction();

    }

    return (
        <Button onClick={onButtonClick} className={clsx(classNames)}>
            {icon}{text}
        </Button>
    );

});

SingleButton.displayName = 'SingleButton';

export default SingleButton;