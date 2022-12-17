import React, { Component } from "react";
import styled from 'styled-components'
import EventBus from '../../systems/EventBus';
import BassMachine from "../BassMachine";
import DrumMachine from "../DrumMachine";
import GuitarMachine from "../GuitarMachine";
import VocalMachine from "../VocalMachine";



const Container = styled.div`
  text-align: center;
  height: 100vh;
`


class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedInstruments: new Array(),
      };
    }
  
    componentDidMount() {
      EventBus.on("Update Selected Instruments", (data) => {
        this.setState({ selectedInstruments: data.message })
      });
    }
  
    componentWillUnmount() {
      EventBus.remove("Update Selected Instruments");
    }
  
    render() {
        return (
            <Container>
                <GuitarMachine 
                  name="Guitar [One]"
                  show={this.state.selectedInstruments.includes("Guitar [One]")}
                />
                <GuitarMachine 
                  name="Guitar [Two]"
                  show={this.state.selectedInstruments.includes("Guitar [Two]")}
                />
                <BassMachine 
                  name="Bass"
                  show={this.state.selectedInstruments.includes("Bass")}
                />
                <DrumMachine 
                  name="Drums"
                  show={this.state.selectedInstruments.includes("Drums")}
                />
                <VocalMachine 
                  name="Vocals"
                  show={this.state.selectedInstruments.includes("Vocals")}
                />
            </Container>
        );
    }
  }

  


Dashboard.displayName = 'Dashboard';

export default Dashboard;
