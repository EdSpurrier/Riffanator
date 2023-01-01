import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import EventBus from '../EventBus';

const Container = styled.div`
    position: fixed;
    right: calc(-${({ theme }) => theme.sizes.eventConsole.width} - ${({ theme }) => theme.sizes.sideBar.width});
    top: 0;
    bottom: ${({ theme }) => theme.sizes.transport.height};
    overflow-y: auto;
    width: ${({ theme }) => theme.sizes.eventConsole.width};
    background: ${({ theme }) => theme.colors.eventConsole.background};
    padding: ${({ theme }) => theme.sizes.eventConsole.padding};
    transition: right ${({ theme }) => theme.animation.med_slow};
    z-index: ${({ theme }) => theme.heirarchy.slidePanels};
    &.open {
        right: ${({ theme }) => theme.sizes.sideBar.width};
    }
`


const EventConsole = memo(({ show }) => {

    const [activeState, setActiveState] = useState(false);

    const sidePanelId = "Event Console";

    const [eventLog, setEventLog] = useState([]);


    const updateEventLog = (eventName, event) => {
        setEventLog(eventLog => [...eventLog, eventName + JSON.stringify(event)]);
    }




    const renderEventLog = (eventLogItems) => {

        return (
            eventLogItems.reverse().map((eventLogItem, key) =>
                <div key={key}>
                    {eventLogItem}
                </div>
            )
        )

    }


    useEffect(() => {
        EventBus.on("Update System", (event) => {
            //console.log('Update System', event)
            updateEventLog('Update System', event)
        });

        EventBus.on("Update Transport", (event) => {
            //console.log('Update Transport', event)
            updateEventLog('Update Transport', event)
        });

        EventBus.on("Update Instrument", (event) => {
            updateEventLog("Update Instrument", event)
        });

        EventBus.on("Update Dashboard", (event) => {
            //console.log('Update Dashboard', event)
            updateEventLog('Update Dashboard', event)
        });

        EventBus.on("Update SidePanels", (event) => {

            updateEventLog('Update SidePanels', event)

            //console.log('Update SidePanels', event)
            //console.log(event.label === "Update Active States", event.data.includes(sidePanelId));
            if (event.label === "Update Active States") {
                setActiveState(event.data.includes(sidePanelId));
            };
        });

        EventBus.on("Update GrooveSkeleton", (event) => {
            //console.log('Update GrooveSkeleton', event)
            updateEventLog('Update GrooveSkeleton', event)
        });



        return () => {
            EventBus.remove("Update System");
            EventBus.remove("Update Transport");
            EventBus.remove("Update Instrument");
            EventBus.remove("Update Dashboard");
            EventBus.remove("Update SidePanels");
            EventBus.remove("Update GrooveSkeleton");
        };
    }, []);


    return (
        <Container className={clsx(activeState ? 'open' : '')}>
            {renderEventLog(eventLog)}
        </Container>
    );

});

EventConsole.displayName = 'EventConsole';

export default EventConsole;
