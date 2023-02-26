import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';


const Button = styled.button`
    transition: ${({ theme }) => theme.animation.fast};
    cursor: pointer;

    colour: ${({ theme }) => theme.colors.controlBar.button.unselected};
    border-radius: 3px;

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

    &.standard {

        padding: ${({ theme }) => theme.sizes.button.standard.padding};
        background: ${({ theme }) => theme.colors.button.background};
        color: ${({ theme }) => theme.colors.button.text};
        font-size : ${({ theme }) => theme.fontSizes.button};

        svg g, svg {
            fill: ${({ theme }) => theme.colors.button.text};
        }


        &.selected {
            background: ${({ theme }) => theme.colors.button.selected.background};
            color: ${({ theme }) => theme.colors.button.selected.text};
            svg g, svg {
                fill: ${({ theme }) => theme.colors.button.selected.text};
            }
        }

        &:hover {
            background: ${({ theme }) => theme.colors.button.hover.background};
            color: ${({ theme }) => theme.colors.button.hover.text};
            svg g, svg {
                fill: ${({ theme }) => theme.colors.button.hover.text};
            }
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
    onClickAction,
    buttonStyle
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
        <Button onClick={onButtonClick} className={clsx(classNames, buttonStyle==='standard'?'standard':'')}>
            {icon}{text}
        </Button>
    );

});

SingleButton.displayName = 'SingleButton';

export default SingleButton;