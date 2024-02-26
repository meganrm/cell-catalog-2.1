import React from "react";
import Table from "./Table";

const DiseaseTable = ({ diseaseName, diseaseCellLines }) => {
    console.log("DiseaseTable", diseaseName, diseaseCellLines)
    return (
        <>
            <h4>{diseaseName}</h4>

            <Table
                columns={[
                    { displayName: "Cell Line ID", key: "cell_line_id" },
                    { displayName: "SNP", key: "snp" },
                    {
                        displayName: "Gene symbol & name",
                        key: "diseaseGene",
                    },
                    // { displayName: "Parental Line", key: "parental_line" },
                    { displayName: "Clones", key: "clones" },
                ]}
                data={diseaseCellLines}
            />
        </>
    );
};

export default DiseaseTable;
