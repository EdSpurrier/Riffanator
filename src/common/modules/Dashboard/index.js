import React, { memo, useEffect, useState } from "react";
import styled from 'styled-components'
import EventBus from '../../systems/EventBus';
import BassMachine from "../BassMachine";
import DrumMachine from "../DrumMachine";
import GrooveSkeleton from "../GrooveSkeleton";
import GuitarMachine from "../GuitarMachine";
import VocalMachine from "../VocalMachine";

const Container = styled.div`

  background: ${({ theme }) => theme.colors.dashboard.background};
  width: 100%;
`

const Dashboard = memo(() => {

  const [selectedInstruments, setSelectedInstruments] = useState([]);

  useEffect(() => {
    EventBus.on("Update Dashboard", (event) => {
      if (event.label === "Update Selected Instruments") {
        setSelectedInstruments(event.data);
      }
    });

    return () => {
      EventBus.remove("Update Dashboard");
    };
  }, []);


  return (
    <Container>
        <GrooveSkeleton 
          name="Groove Skeleton"
          show={selectedInstruments.includes("Groove Skeleton")}
        />
        <GuitarMachine 
          name="Guitar [One]"
          show={selectedInstruments.includes("Guitar [One]")}
        />
        <GuitarMachine 
          name="Guitar [Two]"
          show={selectedInstruments.includes("Guitar [Two]")}
        />
        <BassMachine 
          name="Bass"
          show={selectedInstruments.includes("Bass")}
        />
        <DrumMachine 
          name="Drums"
          show={selectedInstruments.includes("Drums")}
        />
        <VocalMachine 
          name="Vocals"
          show={selectedInstruments.includes("Vocals")}
        />
    </Container>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;