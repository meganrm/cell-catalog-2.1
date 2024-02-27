import React from "react";
import Table from "./Table";
import Content from "./Content";
import { UnpackedDiseaseCellLine } from "../component-queries/DiseaseCellLines";

interface DiseaseTableProps {
    diseaseName: string;
    diseaseCellLines: UnpackedDiseaseCellLine[];
    acknowledgements: string;
}

const DiseaseTable = ({
    diseaseName,
    diseaseCellLines,
    acknowledgements,
}: DiseaseTableProps) => {
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
                    { displayName: "Parental Line", key: "parentalLine" },
                    { displayName: "Clones", key: "clones" },
                    { displayName: "", key: "order_link" },
                    { displayName: "", key: "certificate_of_analysis" },
                ]}
                data={diseaseCellLines}
            />
            <div>
                <Content content={acknowledgements} />
            </div>
        </>
    );
};

export default DiseaseTable;
