import * as React from "react";
import styled from "@emotion/styled";
import Table from "../components/layout/Table.js";
import Header from "../components/blocks/Header.js";

const Loader = () => <div></div>;

class TableTest extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    loading: true,
		curTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
  };

  componentDidMount() {
    fetch(`http://api.ipstack.com/check?access_key=2b82842a731fbec1a7b76c49b638d9c7`)
      .then((response) => response.json())
      .then((resultData) => {
        this.setState((state) => ({
          lat: resultData.latitude,
          lon: resultData.longitude,
          city: resultData.city,
          region: resultData.region_code,
          loading: false,
        }));
      });

    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      });
    }, 1000);
  }

  render() {
    return (
      <Container>
        <Header
          lat={this.state.lat}
          lon={this.state.lon}
          city={this.state.city}
          region={this.state.region}
					time = {this.state.curTime}
        ></Header>
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
