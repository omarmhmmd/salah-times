import * as React from "react";
import styled from "@emotion/styled";
import Table from "../components/layout/Table.js";

class TableTest extends React.Component {
  state = {
    lat: null,
    lon: null,
  };

  componentDidMount() {
    fetch(`http://ip-api.com/json/`)
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
				this.setState((state) => ({ lat: resultData.lat }));
				this.setState((state) => ({ lon: resultData.lon }));
      }); // set data for the number of stars
  }

  render() {
    return (
      <>
        <Table lat={this.state.lat} lon={this.state.lon} />
      </>
    );
  }
}

export default TableTest;
