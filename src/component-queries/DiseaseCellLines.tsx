import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Tag } from "antd";

import DiseaseTable from "../components/DiseaseTable";
import { UnpackedDisease } from "./Diseases";
import ParentalLineModal, {
    ParentalLineData,
} from "../components/ParentalLineModal";

interface DiseaseCellLineEdge {
    node: {
        id: string;
        fields: {
            slug: string;
        };
        frontmatter: DiseaseCellLineFrontmatter;
    };
}

interface DiseaseCellLineFrontmatter {
    templateKey: string;
    cell_line_id: string;
    parental_line: {frontmatter: ParentalLineData};
    disease: string;
    snp: string;
    clones: string;
    certificate_of_analysis: string;
    order_link: string;
}

export interface UnpackedDiseaseCellLine extends DiseaseCellLineFrontmatter {
    diseaseGene: JSX.Element | null;
    parentalLine: JSX.Element | null;
}

const groupLines = (
    diseases: UnpackedDisease[],
    cellLines: DiseaseCellLineEdge[]
) => {
    if (!diseases) {
        return {};
    }

    const initObject: { [key: string]: UnpackedDiseaseCellLine[] } = {};

    const diseaseObj = diseases.reduce((acc, cur) => {
        acc[cur.name] = [];
        return acc;
    }, initObject);
    return cellLines.reduce((acc, cellLine) => {
        const { disease } = cellLine.node.frontmatter;
        const cellLineData: UnpackedDiseaseCellLine = {
            ...cellLine.node.frontmatter,
            diseaseGene: null,
            parentalLine: null,
        };
        const diseaseData = diseases.find((d) => d.name === disease);
        if (!diseaseData) {
            return acc;
        }
        cellLineData.diseaseGene = (
            <>
                <Tag>{diseaseData.geneSymbol}</Tag>
                <div>{diseaseData.geneName}</div>
            </>
        );
        const parentalLine = cellLineData.parental_line.frontmatter;
        console.log("Parental line data", parentalLine)
        cellLineData.parentalLine = <ParentalLineModal {...parentalLine} />;
        acc[disease].push(cellLineData);
        return acc;
    }, diseaseObj);
};

interface QueryResult {
    data: {
        allMarkdownRemark: {
            edges: DiseaseCellLineEdge[];
        };
    };
}

interface DiseaseCellLineTemplateProps extends QueryResult {
    diseases: UnpackedDisease[];
}

const DiseaseCellLineTemplate = (props: DiseaseCellLineTemplateProps) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    const { diseases } = props;
    const groupedCellLines = groupLines(diseases, cellLines);
    return diseases.map((disease) => {
        if (!groupedCellLines[disease.name].length) {
            return null;
        }
        return (
            <div key={disease.name}>
                <DiseaseTable
                    diseaseName={disease.name}
                    diseaseCellLines={groupedCellLines[disease.name]}
                    acknowledgements={disease.acknowledgements}
                />
            </div>
        );
    });
};

export default function DiseaseCellLineQuery(props: {
    diseases: UnpackedDisease[];
}) {
    return (
        <StaticQuery
            query={graphql`
                query DiseaseCellLineQuery {
                    allMarkdownRemark(
                        sort: { frontmatter: { cell_line_id: ASC } }
                        filter: {
                            frontmatter: {
                                templateKey: { eq: "disease-cell-line" }
                            }
                        }
                    ) {
                        edges {
                            node {
                                id
                                fields {
                                    slug
                                }
                                frontmatter {
                                    templateKey
                                    cell_line_id
                                    parental_line {
                                        frontmatter {
                                            cell_line_id
                                            clone_number
                                            tag_location
                                            fluorescent_tag
                                            thumbnail_image {
                                                childImageSharp {
                                                    gatsbyImageData(
                                                        width: 200
                                                        placeholder: BLURRED
                                                    )
                                                }
                                            }
                                            gene {
                                                frontmatter {
                                                    symbol
                                                    name
                                                }
                                            }
                                        }
                                        
                                    }
                                    disease
                                    snp
                                    clones
                                    certificate_of_analysis
                                    order_link
                                }
                            }
                        }
                    }
                }
            `}
            render={(data) => (
                <DiseaseCellLineTemplate
                    data={data}
                    diseases={props.diseases}
                />
            )}
        />
    );
}
