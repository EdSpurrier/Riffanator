import React, { memo, useState } from "react";
import styled from 'styled-components'
import EventBus from '../../systems/EventBus';

const onChange = (key) => {
  console.log(key);
};

const Container = styled.div`
  text-align: center;
  height: 100vh;
`

const Dashboard = memo((props) => {
  const [instrumentsActive, setInstrumentsActive] = useState(new Array());


    EventBus.on("Update Selected Instruments", (data) => {
      setInstrumentsActive(data.message)
      console.log("componentDidMount");
    });




  return (
    <Container>
      <div>{instrumentsActive.length}</div>
    </Container>
  );
});




Dashboard.displayName = 'Dashboard';

export default Dashboard;
