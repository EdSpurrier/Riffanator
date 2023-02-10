import React, { memo, useCallback, useEffect, useState } from 'react';
import EventBus from '../../common/systems/EventBus';
import SideBar from '../../common/components/SideBar';
import SideBarButton from '../../common/components/SideBar/SideBarButton';
import GuitarIcon from '../../common/components/Icons/GuitarIcon';
import DrumkitIcon from '../../common/components/Icons/DrumkitIcon';
import BassIcon from '../../common/components/Icons/BassIcon';
import MicrophoneIcon from '../../common/components/Icons/MicrophoneIcon';
import SkeletonIcon from '../../common/components/Icons/SkeletonIcon';
import RiffSettingsIcon from '../../common/components/Icons/RiffSettingsIcon';
import GeneratorIcon from '../../common/components/Icons/GeneratorIcon';

function getItem(label, keyId, icon) {
    return {
        label,
        keyId,
        icon
    };
}

const items = [
    getItem('Generator', 'Generator', <GeneratorIcon size={'1.8em'} />),
    getItem('Riff Settings', 'Riff Settings', <RiffSettingsIcon size={'1.8em'} />),
    getItem('Groove Skeleton', 'Groove Skeleton', <SkeletonIcon size={'1.8em'} />),
    getItem('Guitar [One]', 'Guitar [One]', <GuitarIcon size={'1.8em'} />),
    getItem('Guitar [Two]', 'Guitar [Two]', <GuitarIcon size={'1.8em'} />),
    getItem('Drums', 'Drums', <DrumkitIcon size={'1.5em'} />),
    getItem('Bass', 'Bass', <BassIcon size={'1.75em'} />),
    getItem('Vocals', 'Vocals', <MicrophoneIcon size={'1.8em'} />),
];


const SideBarLeft = memo(() => {

    const [current, setCurrent] = useState([]);


    const keyDownActions = useCallback(e => {

        if (e.charCode === 103 || e.charCode === 71) {
          onClick('Groove Skeleton');
        } else if (e.charCode === 115 || e.charCode === 83) {
            onClick('Riff Settings');
        }

    }, [current])


    useEffect(() => {
        window.addEventListener('keypress', keyDownActions);
        return () => window.removeEventListener("keypress", keyDownActions)
    }, [current]);




    useEffect(() => {

        EventBus.dispatch("Update Dashboard", {
            label: "Update Selected Instruments",
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
            <SideBarButton key={key} side={'left'} onClick={onClick} selected={current.includes(menuItem.keyId)} label={menuItem.label} keyId={menuItem.keyId}>
                {menuItem.icon}
            </SideBarButton>
        )
    }


    return (
        <SideBar>
            {renderMenuButtons(items)}
        </SideBar>
    );
});

SideBarLeft.displayName = 'SideBarLeft';

export default SideBarLeft;
