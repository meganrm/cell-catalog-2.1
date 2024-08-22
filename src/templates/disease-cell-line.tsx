import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import {
    Clone,
    DiseaseCellLineEdge,
    DiseaseCellLineFrontmatter,
    GeneFrontMatter,
    ParentalLineFrontmatter,
} from "../component-queries/types";
import { Button, Card, Descriptions, Flex, Table } from "antd";
import { formatCellLineId } from "../utils";
import Icon from "@ant-design/icons";
import CloneTable from "../components/CloneTable";

interface DiseaseCellLineTemplateProps {
    cellLineId: string;
    geneName: string;
    geneSymbol: string;
    status: string;
    snp: string;
    orderLink: string;
    certificateOfAnalysis: string;
    parentalLine: any;
    parentLineGene: GeneFrontMatter;
    clones: Clone[];
}
// eslint-disable-next-line
export const DiseaseCellLineTemplate = ({
    cellLineId,
    parentLineGene,
    geneName,
    geneSymbol,
    status,
    clones,
    snp,
    orderLink,
    certificateOfAnalysis,
    parentalLine,
}: DiseaseCellLineTemplateProps) => {
    const tableData = [
        {
            key: "1",
            label: "SNP",
            children: snp,
        },
        {
            key: "2",
            label: "Gene Symbol",
            children: geneSymbol,
        },
        {
            key: "3",
            label: "Gene Name",
            children: geneName,
        },
        {
            key: "4",
            label: "Parental Line",
            children: `${formatCellLineId(parentalLine.cell_line_id)} cl. ${
                parentalLine.clone_number
            } ${parentLineGene.symbol}`,
        },
    ];

    const title = (
        <Flex>
            <h2>{formatCellLineId(cellLineId)}</h2>
            <Button href={orderLink}>Share</Button>
        </Flex>
    );

    return (
        <Card title={title} bordered={false} style={{ width: 538 }}>
            <Descriptions
                items={tableData}
                column={1}
                layout="horizontal"
                colon={false}
                bordered
                labelStyle={{
                    alignItems: "center",
                    width: "142px",
                    fontSize: "16px",
                }}
                contentStyle={{
                    alignItems: "center",
                    fontSize: "18px",
                    fontWeight: "semi-bold",
                }}
            />
            <CloneTable dataSource={clones} />
            <Button
                type="primary"
                style={{ width: 480, border: "2px solid #003075" }}
                href={certificateOfAnalysis}
                target="_blank"
                rel="noreferrer"
            >
                QC Data Summary
            </Button>
        </Card>
    );
};

const CellLine = ({ data }: QueryResult) => {
    const { markdownRemark: cellLine } = data;
    const parentalLineData = cellLine.frontmatter.parental_line.frontmatter;
    const { name: geneName, symbol: geneSymbol } =
        cellLine.frontmatter.disease.frontmatter.gene.frontmatter;
    return (
        <Layout>
            <DiseaseCellLineTemplate
                cellLineId={cellLine.frontmatter.cell_line_id}
                snp={cellLine.frontmatter.snp}
                orderLink={cellLine.frontmatter.order_link}
                certificateOfAnalysis={
                    cellLine.frontmatter.certificate_of_analysis
                }
                geneName={geneName}
                geneSymbol={geneSymbol}
                parentalLine={parentalLineData}
                status={cellLine.frontmatter.status}
                parentLineGene={parentalLineData.gene.frontmatter}
                clones={cellLine.frontmatter.clones}
            />
        </Layout>
    );
};

interface QueryResult {
    data: {
        markdownRemark: { frontmatter: DiseaseCellLineFrontmatter };
    };
}

export default CellLine;

export const pageQuery = graphql`
    query DiseaseCellLineByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
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
                snp
                clones {
                    type
                }
                certificate_of_analysis
                order_link
            }
        }
    }
`;
