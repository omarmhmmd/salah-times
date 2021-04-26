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
  prayTimes.method = "ISNA";

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
        arabic: "  ",
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
		let fajrValue;
    if (prayer == "Fajr") {
      newValue= moment(value + " AM", ["h:mm A"]);
    } else newValue = moment(value + " PM", ["h:mm A"]);
    const momentObj = moment(newValue, ["h:mm A"]);
		// console.log(momentObj.format("HH:mm"));
    if (rowOriginalDay === date) {
			if (time24 > momentObj.format("HH:mm")) {
				return true;
			}
      else if (momentObj.format("HH:mm") > time24) {
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
    @media print {
      font-size: 22px;
    }
    /* border: 1px solid #eeeeee; */
  `;

  const SalahHeader = styled.thead`
    color: white;
    width: 100%;
    text-align: center;
    .monthHeader {
      span {
        display: none;
        @media (max-width: 1024px) {
          display: inline;
          font-family: helvetica;
          font-weight: lighter;
          font-size: 14px;
        }
        @media print {
          display: none;
        }
      }
    }
    th {
      background-color: green;
      padding: 8px;
			@media print {
      font-size: 18px;
			
    }
      /* color: black; */
      position: sticky;
      top: 0;

      /* border: 1px solid #eeeeee; */
      h1 {
      }
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
		@media print {
      font-size: 14px;
			padding: 6px;
    }
    font-family: helvetica;
    font-weight: lighter;
    border-radius: 10px;
  `;

  const activeRow = css`
    background: lightgreen;
    color: black;
		@media print {
     
			background: none;
		
    }
  `;

  const activeCell = css`
    background: green;
    font-size: 24px;
		@media print {
      font-size: 14px;
			font-family: helvetica;
			font-weight: lighter;
			background: none;
			color: black;
    }
    color: white;
    font-family: "Zeyn";
  `;

  const timeBtn = css`
    @media print {
      display: none;
    }
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 24px;
    font-size: 18px;
    font-family: Helvetica, sans-serif;
    font-weight: lighter;
    background-color: lightgreen;
    color: black;
    padding: 24px;
    border-top-left-radius: 100vw;
    border-top-right-radius: 100vw;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(41, 98, 24, 0.25),
      0 4px 10px rgba(0, 0, 0, 0.25);
  `;

  /**
   * HTML
   */
  return (
    <>
      <Link
        className={timeBtn}
        to="selectedRow"
        smooth={true}
        offset={-50}
        duration={500}
      >
        {/* {monthFullName(month)} {date} */}
        Today
      </Link>
      <SalahTable {...getTableProps()}>
        <SalahHeader>
          {headerGroups.map((headerGroup) => (
            <SalahRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                if (column.Header == monthFullName(month)) {
                  return (
                    <th className="monthHeader" {...column.getHeaderProps()}>
                      <span>Month</span> {column.render("Header")}
                    </th>
                  );
                }
                return (
                  <th {...column.getHeaderProps()}>
                    {column.render("arabic")} {column.render("Header")}
                  </th>
                );
              })}
            </SalahRow>
          ))}
        </SalahHeader>
        <SalahBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            let selected;
            if (row.original.day === date) {
              selected = "selectedRow";
            } else selected = "";

            return (
              <SalahRow
                name={selected}
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
