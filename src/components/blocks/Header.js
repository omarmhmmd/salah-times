import * as React from "react";
import styled from "@emotion/styled";

var adhan = require("adhan");

const Header = (props) => {
  var date = new Date();
  var coordinates = new adhan.Coordinates(props.lat, props.lon);
  var params = adhan.CalculationMethod.NorthAmerica();
  params.madhab = adhan.Madhab.Shafi;
  var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
  // console.log(prayerTimes);
  var current = prayerTimes.currentPrayer();
  var next = prayerTimes.nextPrayer();
  // console.log(next);

  return (
    <HeaderGrid>
      <div id="city">
        <h1 className="city">
          {props.city}
          {/* {props.region} */}
        </h1>
      </div>
      <div id="essay">Essay</div>
      <div id="middle" className="middle">
        <h1>Salaat سلاة</h1>
        <section>
          <h3>Currently </h3>
          <h2>{current}</h2>
          {props.time}
        </section>
      </div>
      <div id="credits">Credits</div>
      <div id="print">Print</div>
    </HeaderGrid>
  );
};

const HeaderGrid = styled.div`
  width: var(--width);
  height: 25vh;
  color: white;
  display: grid;
  /* border-bottom: 1px solid #eeeeee; */
  font-family: "Zeyn";
  text-transform: uppercase;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
  align-items: flex-end;

  #city,
  #print {
    @media (max-width: 1024px) {
      display: none;
    }
  }

  div {
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: DarkGreen;
    padding: 8px;
    padding-top: 10%;
    height: 50%;
    border-top-left-radius: 100vw;
    border-top-right-radius: 100vw;
    @media (max-width: 1024px) {
      outline: 1px solid white;
    }
  }
  .city {
    padding: 12px;
    font-size: 18px;
    font-family: helvetica;
    font-weight: lighter;
    text-transform: uppercase;
    color: white;
    background-color: green;
    border-radius: 10px;
    /* border: 1px solid white; */
  }

  .middle {
    /* height: 200px; */
    font-family: "Zeyn";
    height: 75%;
    /* @media (max-width: 1024px) {
      height: 50%;
    } */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-top-left-radius: 100vw;
    border-top-right-radius: 100vw;

    h1 {
      font-size: 48px;
    }
    section {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 55%;
      font-size: 14px;
      font-weight: lighter;
      font-family: helvetica;
      @media (max-width: 1024px) {
        display: none;
      }
    }
    h2 {
      padding: 12px;
      font-size: 18px;
      font-family: helvetica;
      font-weight: lighter;
      text-transform: uppercase;
      color: white;
      background-color: green;
      border-radius: 10px;
      /* border: 1px solid white; */
    }

    h3 {
      padding-bottom: 4px;
      text-transform: none;
      font-size: 14px;
      font-family: helvetica;
      font-weight: lighter;
      color: white;
    }
  }
`;

export default Header;
