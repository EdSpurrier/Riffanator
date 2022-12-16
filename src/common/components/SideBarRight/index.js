import React, { memo, useState } from 'react';
import { Layout, Menu } from 'antd';

import {
  FolderOpenFilled,
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
  getItem('File Browser', '1', <FolderOpenFilled />),
];

const SideBarRight = memo((props) => {
  const [current, setCurrent] = useState(new Array());

  const onClick = (e) => {
    //console.log('click ', e);

  };

  const onSelect = (e) => {
    //console.log('onSelect ', e);
    console.log(current, e.key);
    setCurrent(e.key);
  };

  const onDeselect = (e) => {
    console.log('onDeselect ', e);
    setCurrent(new Array());
  };

  return (
    <Sider
      style={{
          overflow: 'auto',
          minHeight: '100vh',
        }}
      collapsed={true}
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
  );  
});

SideBarRight.displayName = 'SideBarRight';

export default SideBarRight;

