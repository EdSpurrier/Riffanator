import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import EventBus from '../../systems/EventBus';


const Container = styled.div`
    position: fixed;
    right: calc(-${({ theme }) => theme.sizes.slidePanel.width} - ${({ theme }) => theme.sizes.sideBar.width});
    top: 0;
    bottom: ${({ theme }) => theme.sizes.transport.height};
    overflow-y: auto;
    width: ${({ theme }) => theme.sizes.slidePanel.width};
    background: ${({ theme }) => theme.colors.slidePanel.background};
    padding: ${({ theme }) => theme.sizes.slidePanel.padding};
    transition: right ${({ theme }) => theme.animation.med_slow};
    z-index: ${({ theme }) => theme.heirarchy.slidePanels};
    &.open {
        right: ${({ theme }) => theme.sizes.sideBar.width};
    }
`


const SlidePanel = memo(({ children, sidePanelId }) => {

    const [activeState, setActiveState] = useState(false);


    useEffect(() => {
        EventBus.on("Update SidePanels", (event) => {
            if (event.label === "Update Active States") {
                setActiveState(event.data.includes(sidePanelId));
            };
        });

        return () => {
            EventBus.remove("Update SidePanels");
        };
    }, []);


    return (
        <Container className={clsx(activeState ? 'open' : '')}>
            { children }
        </Container>
    );

});

SlidePanel.displayName = 'SlidePanel';

export default SlidePanel;
