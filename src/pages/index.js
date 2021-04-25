import * as React from "react";
import styled from "@emotion/styled";
import Table from "../components/layout/Table.js";
import Header from "../components/blocks/Header.js"

const Loader = () => <div></div>;

class TableTest extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    loading: true,
  };

  componentDidMount() {
    fetch(`http://ip-api.com/json/`)
      .then((response) => response.json())
      .then((resultData) => {
        this.setState((state) => ({
          lat: resultData.lat,
          lon: resultData.lon,
          city: resultData.city,
          loading: false,
        }));
      });
  }

  render() {
    return (
      <Container>
        <Header city={this.state.city}></Header>
        {this.state.loading ? (
          <Loader />
        ) : (
          <Table
            city={this.state.city}
            lat={this.state.lat}
            lon={this.state.lon}
          />
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  /* height: 100vh; */
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
`;


export default TableTest;
