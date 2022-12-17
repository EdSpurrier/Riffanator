import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBarButton from '../SideBar/SideBarButton';
import EventBus from '../../systems/EventBus';
import SetupIcon from '../Icons/SetupIcon';

const Container = styled.div`
    display             : flex;
    align-items         : center;
    justify-content     : center;
    flex-direction      : row;
    text-align          : center;
`


function getItem(label, keyId, icon, toggle = false) {
    return {
        label,
        keyId,
        icon,
        toggle
    };
}

const items = [
    getItem('Setup', 'Setup', <SetupIcon size={'1.25em'} />),
];



const InstrumentControls = memo((props) => {

    const [current, setCurrent] = useState([]);

    useEffect(() => {

        EventBus.dispatch("Update Instrument", {
            label: props.instrumentName,
            data: current
        });

    }, [current]);


    const onClick = (keyId) => {

        if (current.includes(keyId)) {
            deselectItem(keyId);
        } else {
            selectItem(keyId);
        }
    };


    const deselectItem = (keyId) => {
        setCurrent((current) => current.filter(thisKeyId => thisKeyId !== keyId));
    }

    const selectItem = (keyId) => {
        setCurrent((current) => [...current, keyId]);
    }


    const renderMenuButtons = (menuItems) => {
        return menuItems.map((menuItem, key) =>
            <SideBarButton key={key} onClick={onClick} side={'top'} selected={current.includes(menuItem.keyId) && menuItem.toggle} label={menuItem.label} keyId={menuItem.keyId}>
                {menuItem.icon}
            </SideBarButton>
        )
    }

    return (
        <Container>
           {renderMenuButtons(items)}
        </Container>
    );
});

InstrumentControls.displayName = 'InstrumentControls';

export default InstrumentControls;
