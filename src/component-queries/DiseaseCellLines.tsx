import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Flex, Tag } from "antd";

import DiseaseTable from "../components/DiseaseTable";
import { UnpackedDisease } from "./Diseases";
import {
    DiseaseCellLineEdge,
    DiseaseCellLineFrontmatter,
    ParentalLineFrontmatter,
} from "./types";
import ParentalLineModal from "../components/ParentalLineModal";
import { formatCellLineId } from "../utils";

export interface UnpackedDiseaseCellLine extends DiseaseCellLineFrontmatter {
    diseaseGene: JSX.Element | null;
    parentalLine: JSX.Element | null;
}

const getParentalLineItems = (parentalLine: ParentalLineFrontmatter) => {
    const { symbol, name } = parentalLine.gene.frontmatter;
    const { fluorescent_tag, tag_location } = parentalLine;
    return [
        {
            key: "1",
            label: "Gene Symbol",
            children: symbol,
        },
        {
            key: "2",
            label: "Gene Name",
            children: name,
        },
        {
            key: "3",
            label: "Fluorescent Tag",
            children: fluorescent_tag,
        },
        {
            key: "4",
            label: "Tag Location",
            children: tag_location,
        },
    ];
};

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
            <Flex wrap="wrap">
                <Tag bordered={false} color="#F2F2F2">{diseaseData.geneSymbol}</Tag>
                <div>{diseaseData.geneName}</div>
            </Flex>
        );
        const parentalLine = cellLineData.parental_line.frontmatter;
        const parentalLineItems = getParentalLineItems(parentalLine);
        if (diseaseData.status?.toLowerCase() === "coming soon") {
            cellLineData.parentalLine = <>{formatCellLineId(parentalLine.cell_line_id)}</>;
        } else {
            cellLineData.parentalLine = (
                <ParentalLineModal
                    key={parentalLine.cell_line_id}
                    cellLineId={formatCellLineId(parentalLine.cell_line_id)}
                    cloneNumber={parentalLine.clone_number}
                    displayItems={parentalLineItems}
                    image={parentalLine.thumbnail_image}
                />
            );
        }

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
    return diseases
 
        .map((disease) => {
            if (!groupedCellLines[disease.name].length) {
                return null;
            }
            return (
                <div key={disease.name}>
                    <DiseaseTable
                        diseaseName={disease.name}
                        diseaseCellLines={groupedCellLines[disease.name]}
                        acknowledgements={disease.acknowledgements}
                        status={disease.status}
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
                                    disease
                                    snp
                                    clones {
                                        isogenic_controls
                                        mutants
                                    }
                                    certificate_of_analysis {
                                        publicURL
                                    }
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
