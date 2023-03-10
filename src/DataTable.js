import "./DataTable.css";
import usersData from "./users.json";
import * as React from "react";
import { useTable } from "react-table";
import Button from "./components/Button";
import {FaFileDownload} from "react-icons/fa";
import {CSVLink} from 'react-csv';

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType })

  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

const exportToJson = (e) => {
  e.preventDefault()
  downloadFile({
    data: JSON.stringify(usersData),
    fileName: 'users.json',
    fileType: 'text/json',
  })
}

const exportToCsv = e => {
  e.preventDefault()

  // Headers for each column
  let headers = ['Name,Roll,Address,Institute,Course']

  // Convert users data to a csv
  let usersCsv = usersData.reduce((acc, user) => {
    const { name, roll, address, institute, course } = user
    acc.push([name, roll, address, institute, course].join(','))
    return acc
  }, [])

  downloadFile({
    data: [...headers, ...usersCsv].join('\n'),
    fileName: 'student.csv',
    fileType: 'text/csv',
  })
}

function DataTable() {
  const data = React.useMemo(() => usersData, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Roll",
        accessor: "roll",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Institute",
        accessor: "institute",
      },
      {
        Header: "Course",
        accessor: "course",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="App">
      
      <div className="container">
        <div className="header">
        <h2>Students</h2>
        <button className="btn1" onClick={exportToJson}>Import Students</button>
        <button className="btn2" onClick={exportToCsv}><FaFileDownload/>Export as CSV</button>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;