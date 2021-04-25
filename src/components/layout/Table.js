import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import styled from "@emotion/styled";
import { cx, css } from "@emotion/css";
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
  prayTimes.method = "ISNA"; // set the method : ISNA

  const data = React.useMemo(() => [], []);

  let thisMonthTimes = prayTimes.getMonthTimes(
    [new Date().getFullYear(), new Date().getMonth()],
    [props.lat, props.lon],
    "auto",
    "auto",
    "24h"
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
      },
      {
        Header: "Fajr",
        accessor: "fajr",
      },
      {
        Header: "Dhuhr",
        accessor: "dhuhr",
      },
      {
        Header: "Asr",
        accessor: "asr",
      },
      {
        Header: "Mahgrib",
        accessor: "maghrib",
      },
      {
        Header: "Isha",
        accessor: "isha",
      },
    ],
    []
  );

  // set react table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const timeCheck = (rowOriginalDay, value) => {
    if (rowOriginalDay === date) {
      if (value > time24) {
        return true;
      }
    }
  };
	
  const dateCheck = (value) => {
		if (value === date)
		return true;
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
    th {
      text-align: center;
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
  /**
   * HTML
   */
  return (
    <>
      <SalahTable {...getTableProps()}>
        <SalahHeader>
          {headerGroups.map((headerGroup) => (
            <SalahRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </SalahRow>
          ))}
        </SalahHeader>
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
                        [activeCell]: timeCheck(row.original.day, cell.value),
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
