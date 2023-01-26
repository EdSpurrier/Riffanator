import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import LoopIcon from '../../components/Icons/LoopIcon';
import MetronomeIcon from '../../components/Icons/MetronomeIcon';
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
    getItem('Metronome', 'Metronome', <MetronomeIcon size={'1.25em'} />),
    /* getItem('Loop', 'Loop', <LoopIcon size={'1em'} />), */
];



const PlayControls = memo((props) => {

    const [current, setCurrent] = useState([]);

    const keyDownActions = useCallback(e => {

        if (e.charCode === 32) {
          onClick('Play');
        }

    }, [current])


    useEffect(() => {
        window.addEventListener('keypress', keyDownActions);
        return () => window.removeEventListener("keypress", keyDownActions)
    }, [current]);




    useEffect(() => {


        EventBus.dispatch("Update Transport", {
            label: "Update Transport",
            data: {
                action: current
            }
        });

        return () => {
            EventBus.remove("Update System");
        };
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
        if (keyId === "Play") {
            EventBus.dispatch("Update Transport", {
                label: "Stop",
                data: {
                    action: current
                }
            });
        } else if (keyId === "Metronome") {
            EventBus.dispatch("Update Transport", {
                label: "Metronome Off",
                data: {
                    action: current
                }
            });
        }

        setCurrent((current) => current.filter(thisKeyId => thisKeyId !== keyId));
    }

    const selectItem = (keyId) => {
        if (keyId === "Play") {
            EventBus.dispatch("Update Transport", {
                label: "Play",
                data: {
                    action: current
                }
            });
        } else if (keyId === "Metronome") {
            EventBus.dispatch("Update Transport", {
                label: "Metronome On",
                data: {
                    action: current
                }
            });
        }


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
