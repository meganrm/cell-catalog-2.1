import React from "react";
import { graphql } from "gatsby";
import { Button, Card, Descriptions, Divider, Flex } from "antd";

import Layout from "../components/Layout";
import {
    Clone,
    DiseaseCellLineFrontmatter,
    GeneFrontMatter,
} from "../component-queries/types";
import { formatCellLineId, getCloneSummary } from "../utils";
import CloneTable from "../components/CloneTable";
import Icon from "@ant-design/icons";

const { container, title } = require("../style/main-card.module.css");
const Share = require("../img/share-icon.svg");

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
    healthCertificate: string;
}
// eslint-disable-next-line
export const DiseaseCellLineTemplate = ({
    cellLineId,
    parentLineGene,
    geneName,
    geneSymbol,
    clones,
    snp,
    orderLink,
    certificateOfAnalysis,
    parentalLine,
    healthCertificate,
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

    const titleContents = (
        <Flex justify="space-between" align="center">
            <div className={title}>{formatCellLineId(cellLineId)}</div>
            <Button ghost href={orderLink}>
                Share
                <Icon
                    component={Share}
                    style={{
                        color: "transparent",
                        fontSize: "18px",
                    }}
                />
            </Button>
        </Flex>
    );

    const cloneSummary = getCloneSummary(clones);
    return (
        <Card
            title={titleContents}
            bordered={false}
            style={{ width: 590 }}
            className={container}
        >
            <Descriptions
                items={tableData}
                column={1}
                layout="horizontal"
                colon={false}
                bordered
                labelStyle={{
                    alignItems: "center",
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
                type="default"
                ghost
                style={{
                    padding: "7.5px 15px",
                    width: "100%",
                    height: 40,
                    border: "2px solid #003075",
                }}
                href={certificateOfAnalysis}
                target="_blank"
                rel="noreferrer"
            >
                Certificate of Analysis
            </Button>
            <Button
                type="default"
                ghost
                style={{
                    padding: "7.5px 15px",
                    width: "100%",
                    height: 40,
                    border: "2px solid #003075",
                }}
                href={healthCertificate}
                target="_blank"
                rel="noreferrer"
            >
                hPSCreg Certificate
            </Button>
            <Button
                type="primary"
                style={{
                    width: "100%",
                    height: 102,
                    border: "2px solid #003075",
                }}
                href={healthCertificate}
                target="_blank"
                rel="noreferrer"
            >
                <h2>Obtain {formatCellLineId(cellLineId)}</h2>
                <>
                    <span>{cloneSummary.numMutants}</span> mutant clones
                    <Divider type="vertical" />
                    <span>{cloneSummary.numIsogenics}</span> isogenic controls
                </>
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
                healthCertificate={
                    cellLine.frontmatter.hPSCreg_certificate_link
                }
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
