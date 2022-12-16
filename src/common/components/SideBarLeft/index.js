import React, { memo } from 'react';
import EventBus from '../../systems/EventBus';
import { Layout, Menu } from 'antd';

import GuitarIcon from '../../icons/GuitarIcon';
import DrumIcon from '../../icons/DrumIcon';
import BassIcon from '../../icons/BassIcon';
import MicrophoneIcon from '../../icons/MicrophoneIcon';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Guitar [One]', 'Guitar [One]', <GuitarIcon />),
  getItem('Guitar [Two]', 'Guitar [Two]', <GuitarIcon />),
  getItem('Drums', 'Drums', <DrumIcon />),
  getItem('Bass', 'Bass', <BassIcon />),
  getItem('Vocals', 'Vocals', <MicrophoneIcon />), 
];

const SideBarLeft = memo((props) => {

  const onClick = (e) => {
    //console.log('click ', e);
  };

  const onSelect = (e) => {
    //console.log(current, e);
    EventBus.dispatch("Update Selected Instruments", { message: e.selectedKeys });
  };

  const onDeselect = (e) => {
    //console.log('onDeselect ', e);
    EventBus.dispatch("Update Selected Instruments", { message: e.selectedKeys });
  };

  return (
    <Sider
      style={{
          overflow: 'auto',
          minHeight: '100vh',
        }}
      collapsed={true}
      collapsedWidth={50}
      >

        <Menu 
          onClick={onClick} 
          onSelect={onSelect} 
          onDeselect={onDeselect} 
          multiple={true}
          theme="dark" 
          defaultSelectedKeys={[]} 
          mode="inline" 
          items={items} 
          />

      
    </Sider>
  );  
});

SideBarLeft.displayName = 'SideBarLeft';

export default SideBarLeft;

