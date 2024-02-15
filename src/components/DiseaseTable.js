import React from "react";
import { map } from "lodash";

const renderRows = (cellLines) => {
    return cellLines.map((cellLine) => {
        return <div key={cellLine.cell_line_id}>{cellLine.cell_line_id}</div>;
    });
};

const renderTable = (groupedCellLines) => {
    return map(groupedCellLines, (cellLines, parentLine) => {
        return (
            <>
                <div>
                    <h4 key={parentLine}>{parentLine}</h4>
                </div>
                {renderRows(cellLines)}
            </>
        );
    });
};

const DiseaseTable = ({ diseaseName, groupedCellLines }) => {
    return (
        <>
            <h4>{diseaseName}</h4>
            {renderTable(groupedCellLines)}
        </>
    );
};

export default DiseaseTable;
