import React from "react";
import { graphql, StaticQuery } from "gatsby";

import { UnpackedDisease } from "./Diseases";
import { DiseaseCellLineEdge, UnpackedDiseaseCellLine } from "./types";
import { convertFrontmatterToDiseaseCellLine } from "./convert-data";
import CellLineTable from "../components/CellLineTable";
import { TableType } from "../components/CellLineTable/types";
import { getDiseaseTableColumns } from "../components/CellLineTable/DiseaseTableColumns";
import { getDiseaseTableMobileConfig } from "../components/CellLineTable/MobileView";
import { MOBILE_BREAKPOINT } from "../constants";
import useWindowWidth from "../hooks/useWindowWidth";

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
        const diseaseName = disease.frontmatter.name;
        const cellLineData: UnpackedDiseaseCellLine =
            convertFrontmatterToDiseaseCellLine(cellLine.node);
        acc[diseaseName].push(cellLineData);
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
        const inProgress = disease.status?.toLowerCase() === "coming soon";
        const width = useWindowWidth();
        const isMobile = width < MOBILE_BREAKPOINT;

        return (
            <div key={disease.name}>
                <CellLineTable
                    tableName={disease.name}
                    cellLines={groupedCellLines[disease.name]}
                    footerContents={disease.acknowledgements}
                    status={disease.status}
                    tableType={TableType.Disease}
                    columns={getDiseaseTableColumns(inProgress)}
                    mobileConfig={getDiseaseTableMobileConfig(isMobile)}
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
                                status: { ne: "in progress" }
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
                                                        placeholder: BLURRED
                                                        layout: FIXED
                                                        width: 192
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
                                    disease {
                                        frontmatter {
                                            name
                                            gene {
                                                frontmatter {
                                                    symbol
                                                    name
                                                }
                                            }
                                        }
                                    }
                                    clones {
                                        type
                                    }
                                    snp
                                    certificate_of_analysis
                                    order_link
                                    status
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
