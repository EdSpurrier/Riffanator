import React, { memo, useEffect, useState } from 'react';
import EventBus from '../../common/systems/EventBus';
import LevelsIcon from '../../common/components/Icons/LevelsIcon';
import SettingsIcon from '../../common/components/Icons/SettingsIcon';
import SideBar from '../../common/components/SideBar';
import SideBarButton from '../../common/components/SideBar/SideBarButton';
import ConsoleIcon from '../../common/components/Icons/ConsoleIcon';
import SaveIcon from '../../common/components/Icons/SaveIcon';


function getItem(label, keyId, icon) {
    return {
        label,
        keyId,
        icon
    };
}

const items = [
    getItem('File Manager', 'File Manager', <SaveIcon size={'1.25em'} />),
    getItem('Generator Settings', 'Generator Settings', <LevelsIcon size={'1.25em'} />),
    getItem('System Settings', 'System Settings', <SettingsIcon size={'1.25em'} />),
    getItem('Event Console', 'Event Console', <ConsoleIcon size={'1.25em'} />),
];


const SideBarRight = memo(() => {

    const [current, setCurrent] = useState([]);

    useEffect(() => {

        EventBus.dispatch("Update SidePanels", {
            label: "Update Active States",
            data: current
        });

    }, [current]);


    const onClick = (keyId) => {

        if (current.includes(keyId)) {
            deselectItem(keyId);
        } else {
            if (current.length > 0) {
                deselectItem(current[0]);
            }
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
            <SideBarButton key={key} onClick={onClick} side={'right'} selected={current.includes(menuItem.keyId)} label={menuItem.label} keyId={menuItem.keyId}>
                {menuItem.icon}
            </SideBarButton>
        )
    }


    return (
        <SideBar side={'right'}>
            {renderMenuButtons(items)}
        </SideBar>
    );
});

SideBarRight.displayName = 'SideBarRight';

export default SideBarRight;
