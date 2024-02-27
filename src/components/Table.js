import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.displayName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, index) => (
          <tr key={index}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{rowData[column.key] || ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
