import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import LoopIcon from '../../components/Icons/LoopIcon';
import PlayIcon from '../../components/Icons/PlayIcon';
import SideBarButton from '../../components/SideBar/SideBarButton';
import EventBus from '../../systems/EventBus';

const Container = styled.div`
    display             : flex;
    align-items         : center;
    justify-content     : center;
    flex-direction      : row;
    text-align          : center;
`


function getItem(label, keyId, icon) {
    return {
        label,
        keyId,
        icon
    };
}

const items = [
    getItem('Play', 'Play', <PlayIcon size={'1em'} />),
    getItem('Loop', 'Loop', <LoopIcon size={'1em'} />),
];



const PlayControls = memo((props) => {

    const [current, setCurrent] = useState([]);

    useEffect(() => {


        EventBus.dispatch("Update Transport", {
            label: "Update Transport",
            data: {
                action: current
            }
        });


    }, [current]);


    
    
    useEffect(() => {
        
        EventBus.on("Update System", (event) => {
            
            if (event.label === "Update MidiClock") {
                //console.log("Update MidiClock", event.data.action, current);
                if (event.data.action === "Stop") {
                    deselectItem("Play");
                }
            }
        });

        return () => {
            EventBus.remove("Update System");
        };
    }, []);




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
            <SideBarButton key={key} onClick={onClick} side={'bottom'} selected={current.includes(menuItem.keyId)} label={menuItem.label} keyId={menuItem.keyId}>
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

PlayControls.displayName = 'PlayControls';

export default PlayControls;
