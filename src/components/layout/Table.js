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
  let thisMonthTimes = prayTimes.getMonthTimes(
    [new Date().getFullYear(), new Date().getMonth()],
    [props.lat, props.lon],
    "auto",
    "auto",
    "24h"
  );

  // create object with monthly prayer times
  const data = React.useMemo(() => [], []);
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
        accessor: "day", // accessor is the "key" in the data
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
    getTrProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  // console.log(rows[11]);

  const values = [];
  const timeCheck = (rowOriginalDay, value) => {
    if (rowOriginalDay == date) {
      if (value > time24) {
        return true;
      }
    }
  };

  /**
   * HTML
   */
  return (
		
    <>
      <p>
        {props.lat}, {props.lon}
      </p>
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
                className={cx({ [activeRow]: row.original.day == date })}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
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

/**
 * CSS
 */
const SalahTable = styled.table``;

const SalahHeader = styled.thead``;

const SalahBody = styled.tbody``;

const SalahRow = styled.tr``;

const SalahData = styled.td``;

const activeRow = css`
  background: green;
`;

const activeCell = css`
  background: yellow;
`;

export default Table;