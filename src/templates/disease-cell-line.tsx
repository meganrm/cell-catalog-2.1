import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import { Button, Card, Divider, Flex, Tooltip } from "antd";

import Layout from "../components/Layout";
import {
    Clone,
    DiseaseCellLineFrontmatter,
    GeneFrontMatter,
} from "../component-queries/types";
import { formatCellLineId, getCloneSummary } from "../utils";
import CloneTable from "../components/CloneTable";
import Icon from "@ant-design/icons";
import InfoPanel from "../components/shared/InfoPanel";
import { primaryColor } from "../style/theme";
import {
    DarkThemeGhostButton,
    DefaultButton,
} from "../components/shared/Buttons";

const {
    container,
    title,
    extraLargeButton,
} = require("../style/main-card.module.css");
const Share = require("../img/share-icon.svg");
const Arrow = require("../img/arrow.svg");

interface DiseaseCellLineTemplateProps {
    href: string;
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
    href,
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
    const defaultToolTipText = "Copy cell line link to clipboard";
    const [toolTipText, setToolTipText] = useState(defaultToolTipText);
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
    const urlToCopy = `Check out this cell line from the Allen Cell Collection! ${href}`;

    const titleContents = (
        <Flex justify="space-between" align="center">
            <div className={title}>{formatCellLineId(cellLineId)}</div>
            <Tooltip title={toolTipText} placement="bottom">
                <DarkThemeGhostButton
                    onMouseEnter={() => {
                        if (!toolTipText) {
                            // this way it doesn't go back to default text after being copied
                            setToolTipText(defaultToolTipText);
                        }
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(urlToCopy).then(() => {
                            setToolTipText("Copied!");
                            setTimeout(() => {
                                setToolTipText("");
                            }, 1000);
                        });
                    }}
                >
                    Share
                    <Icon
                        component={Share}
                        style={{
                            fontSize: "18px",
                        }}
                    />
                </DarkThemeGhostButton>
            </Tooltip>
        </Flex>
    );

    const cloneSummary = getCloneSummary(clones);
    return (
        <Flex>
            <Flex
                vertical
                gap={16}
                style={{ maxWidth: 505, width: "40%", minWidth: 460 }}
            >
                <Link to="/disease-catalog">
                    <DefaultButton>
                        <Arrow style={{ marginRight: 8 }} />
                        Return to Cell Catalog
                    </DefaultButton>
                </Link>
                <Card title={titleContents} className={container}>
                    <InfoPanel data={tableData} />
                    <CloneTable dataSource={clones} />
                    <Flex vertical gap={8}>
                        <DefaultButton
                            href={certificateOfAnalysis}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Certificate of Analysis
                        </DefaultButton>
                        <DefaultButton
                            href={healthCertificate}
                            target="_blank"
                            rel="noreferrer"
                        >
                            hPSCreg Certificate
                        </DefaultButton>
                    </Flex>
                    <Button
                        type="primary"
                        className={extraLargeButton}
                        href={orderLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <h2>Obtain {formatCellLineId(cellLineId)}</h2>
                        <>
                            <span style={{ fontWeight: 400 }}>
                                {cloneSummary.numMutants}
                            </span>
                            <span style={{ fontWeight: 300 }}>
                                {" "}
                                mutant clones
                            </span>
                            <Divider
                                type="vertical"
                                style={{ borderColor: primaryColor }}
                            />
                            <span style={{ fontWeight: 400 }}>
                                {cloneSummary.numIsogenics}
                            </span>{" "}
                            <span style={{ fontWeight: 300 }}>
                                isogenic controls
                            </span>
                        </>
                    </Button>
                </Card>
            </Flex>
        </Flex>
    );
};

const CellLine = ({ data, location }: QueryResult) => {
    const { markdownRemark: cellLine } = data;
    const parentalLineData = cellLine.frontmatter.parental_line.frontmatter;
    const { name: geneName, symbol: geneSymbol } =
        cellLine.frontmatter.disease.frontmatter.gene.frontmatter;
    return (
        <Layout>
            <DiseaseCellLineTemplate
                href={location.href || ""}
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
    location: Location;
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
