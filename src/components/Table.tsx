import React from 'react';

interface TableProps {
  columns: Array<{ displayName: string; key: string }>;
  data: Array<{ [key: string]: any }>;
}

const Table = ({ columns, data }: TableProps) => {
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
                            <td key={columnIndex}>
                                {rowData[column.key] || ""}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
