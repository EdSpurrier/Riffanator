import React, { memo, useState } from 'react';
import EventBus from '../../systems/EventBus';
import { Layout, Menu } from 'antd';

import {
  AppstoreAddOutlined,
} from '@ant-design/icons';


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
  getItem('File Selector', 'File Selector', <AppstoreAddOutlined />),
];

const SideBarRight = memo((props) => {
  const [current, setCurrent] = useState([]);

  const onClick = (e) => {
    console.log('click ', e, items);

  };


  const onSelect = (e) => {
    //console.log('onSelect ', e);
    //console.log(current, e);
    setCurrent(e.key);

    if (e.key === 'File Selector') {
      EventBus.dispatch("FileSelector", { message: 'open' });
    }

  };

  const onDeselect = (e) => {
    //console.log('onDeselect ', e);

    if (e.key === 'File Selector') {
      EventBus.dispatch("FileSelector", { message: 'close' });
    }

    setCurrent([]);
  };

  return (
    <>
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
            selectedKeys={[current]}
            multiple={true}
            theme="dark" 
            defaultSelectedKeys={[]} 
            mode="inline" 
            items={items} 
            />

        
      </Sider>
    </>
  );  
});

SideBarRight.displayName = 'SideBarRight';

export default SideBarRight;

