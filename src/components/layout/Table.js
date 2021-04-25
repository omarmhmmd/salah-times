import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import moment from "moment";
const { PrayerManager } = require("prayer-times.js");

/**
 * JS
 */

const Table = (props) => {
  // return month full name
  const monthFullName = (month) => {
    var monthName = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    );
    return monthName[month];
  };

  // set all date/times
  const currentDate = new Date();
  const minutes = currentDate.getMinutes();
  const hours = currentDate.getHours();
  const time24 = hours + ":" + minutes;
  // console.log(time24);
  const time12 = hours12() + ":" + minutes;
  // console.log(time12);
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();

  // declare prayer time object and get month times
  let prayTimes = new PrayerManager();
  prayTimes.method = "MWL"; 

  const data = React.useMemo(() => [], []);

  let thisMonthTimes = prayTimes.getMonthTimes(
    [new Date().getFullYear(), new Date().getMonth()],
    [props.lat, props.lon],
    "auto",
    "auto",
    "12hNS"
  );

  [...Array(daysInMonth - 1)].map((e, i) => {
    data.push({
      day: i + 1,
      fajr: thisMonthTimes[i][1].formatted,
      dhuhr: thisMonthTimes[i][3].formatted,
      asr: thisMonthTimes[i][4].formatted,
      maghrib: thisMonthTimes[i][6].formatted,
      isha: thisMonthTimes[i][7].formatted,
    });
  });

  // create object with monthly prayer times

  function hours12() {
    return (currentDate.getHours() + 24) % 12 || 12;
  }

  // logging tests
  // console.log("---------------------------");
  // console.log("Month: " + monthFullName(month));
  // console.log("Day: " + date);
  // console.log("Year:  " + year);
  // console.log("---------------------------");
  // console.log("Days in Month:  " + (daysInMonth - 1));
  // console.log("---------------------------");
  // console.log("Fajr: ", thisMonthTimes[6][1].formatted);
  // console.log("Dhuhr: ", thisMonthTimes[6][3].formatted);
  // console.log("Asr: ", thisMonthTimes[6][4].formatted);
  // console.log("Maghrib: ", thisMonthTimes[6][6].formatted);
  // console.log("Isha: ", thisMonthTimes[6][7].formatted);
  // console.log("---------------------------");

  // create table column headers
  const columns = React.useMemo(
    () => [
      {
        Header: monthFullName(month),
        accessor: "day",
        arabic: "",
      },
      {
        Header: "Fajr",
        accessor: "fajr",
        arabic: "فجر",
      },
      {
        Header: "Dhuhr",
        accessor: "dhuhr",
        arabic: "ظهر",
      },
      {
        Header: "Asr",
        accessor: "asr",
        arabic: "عصر",
      },
      {
        Header: "Mahgrib",
        accessor: "maghrib",
        arabic: "مغرب",
      },
      {
        Header: "Isha",
        accessor: "isha",
        arabic: "عشاء",
      },
    ],
    []
  );

  // console.log(columns);

  // set react table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const timeCheck = (rowOriginalDay, value, prayer) => {
    let newValue;
    if (prayer == "Fajr") {
      newValue = moment(value + " AM", ["h:mm A"]);
    } else newValue = moment(value + " PM", ["h:mm A"]);
    const momentObj = moment(newValue, ["h:mm A"]);
    if (rowOriginalDay === date) {
      if (momentObj.format("HH:mm") > time24) {
        // console.log(momentObj.format("HH:mm"));
        return true;
      }
    }
  };

  const dateCheck = (value) => {
    if (value === date) return true;
  };
  /**
   * CSS
   */
  const SalahTable = styled.table`
    font-family: "Zeyn";
    table-layout: fixed;
    height: 100%;
    width: var(--width);
    font-size: 24px;
    /* border: 1px solid #eeeeee; */
  `;

  const SalahHeader = styled.thead`
    color: white;
    width: 100%;
    text-align: center;
    th {
      background-color: green;
      padding: 8px;
      /* color: black; */
      position: sticky;
      top: 0;
      /* border: 1px solid #eeeeee; */
    }
  `;

  const SalahBody = styled.tbody`
    background-color: white;
  `;

  const SalahRow = styled.tr`
    margin: 10px;
  `;

  const SalahData = styled.td`
    text-align: center;
    border: 1px solid #eeeeee;
    padding: 8px;
    font-size: 18px;
    font-family: helvetica;
    font-weight: lighter;
    border-radius: 10px;
  `;

  const activeRow = css`
    background: lightgreen;
    color: black;
  `;

  const activeCell = css`
    background: green;
    font-size: 24px;
    color: white;
    font-family: "Zeyn";
  `;

  const timeBtn = css`
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 24px;
    padding: 12px;
    background: lightgreen;
    font-size: 18px;
    /* font-size: 24px; */
    border-radius: 10px;
    /* font-family: "zeyn"; */
    font-family: helvetica;
    font-weight: lighter;
    color: black;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  `;

  /**
   * HTML
   */
  return (
    <>
      <Link
        className={timeBtn}
        to="firstInsideContainer"
        smooth={true}
        duration={500}
      >
        {monthFullName(month)} {date}
      </Link>
      <SalahTable {...getTableProps()}>
        <SalahHeader>
          {headerGroups.map((headerGroup) => (
            <SalahRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("arabic")} {column.render("Header")}
                </th>
              ))}
            </SalahRow>
          ))}
        </SalahHeader>
				<Element name="firstInsideContainer">
            first element inside container
          </Element>
        <SalahBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <SalahRow
                className={cx({ [activeRow]: row.original.day === date })}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  if (typeof cell.value == "number") {
                    return (
                      <SalahData
                        className={cx({
                          [activeCell]: dateCheck(row.original.day, cell.value),
                        })}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </SalahData>
                    );
                  }
                  return (
                    <SalahData
                      className={cx({
                        [activeCell]: timeCheck(
                          row.original.day,
                          cell.value,
                          cell.column.Header
                        ),
                      })}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </SalahData>
                  );
                })}
              </SalahRow>
            );
          })}
        </SalahBody>
      </SalahTable>
    </>
  );
};

export default Table;
