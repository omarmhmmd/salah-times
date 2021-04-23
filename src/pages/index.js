import * as React from "react";
import styled from "@emotion/styled";
import Table from "../components/layout/Table.js";

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
        <HeaderGrid>
          <div>{this.state.city}</div>
          <div>Essay</div>
          <div class = "middle">SalaatTimes</div>
          <div>Credits</div>
          <div>Print</div>
        </HeaderGrid>
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
  height: 100vh;
`;

const HeaderGrid = styled.div`
  width: 100vw;
	height: 100px;
	color: white;
  display: grid;
	border-bottom: 1px solid #eeeeee;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
	align-items: flex-end;

  div {
    text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
    background-color: green;
    padding: 8px;
		height: 20%;
  }
	
	.middle {
		/* height: 200px; */
		height: 100%;
	}
`;

export default TableTest;
