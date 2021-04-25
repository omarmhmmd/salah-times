import * as React from "react";
import styled from "@emotion/styled";

const Header = (props) => {
  return (
    <HeaderGrid>
      <div>{props.city}</div>
      <div>Essay</div>
      <div className="middle">
        <h1>
          Salaat
          <br></br>
          سلاة
        </h1>
      </div>
      <div>Credits</div>
      <div>Print</div>
    </HeaderGrid>
  );
};

const HeaderGrid = styled.div`
  width: var(--width);
  height: 25vh;
  color: white;
  display: grid;
  border-bottom: 1px solid #eeeeee;
  font-family: "Zeyn";
  text-transform: uppercase;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  align-items: flex-end;

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
  }

  .middle {
    /* height: 200px; */
    font-family: "Zeyn";
    font-size: 48px;
    height: 100%;
    border-top-left-radius: 100vw;
    border-top-right-radius: 100vw;

    h1 {
      padding-top: 5%;
    }
  }
`;

export default Header;
