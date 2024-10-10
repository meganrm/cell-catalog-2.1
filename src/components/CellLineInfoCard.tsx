import React, { useState } from "react";
import { Card, Flex, Button, Divider, Tooltip } from "antd";

import { PRIMARY_COLOR } from "../style/theme";
import { formatCellLineId, getCloneSummary } from "../utils";
import CloneTable from "./CloneTable";
import { DarkThemeGhostButton, DefaultButton } from "./shared/Buttons";
import InfoPanel from "./shared/InfoPanel";
import Icon from "@ant-design/icons";
import { title } from "process";
import {
    ParentalLineFrontmatter,
    GeneFrontMatter,
    Clone,
} from "../component-queries/types";
const Share = require("../img/share-icon.svg");
const LinkOut = require("../img/external-link.svg");

const {
    container,
    extraLargeButton,
} = require("../style/cell-line-info-card.module.css");

interface CellLineInfoCardProps {
    href: string;
    cellLineId: string;
    geneName: string;
    geneSymbol: string;
    snp: string;
    orderLink: string;
    certificateOfAnalysis: string;
    parentalLine: ParentalLineFrontmatter;
    parentLineGene: GeneFrontMatter;
    clones: Clone[];
    healthCertificate: string;
}

const CellLineInfoCard = ({
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
}: CellLineInfoCardProps) => {
    const defaultToolTipText = "Copy cell line link to clipboard";
    const [shareTooltipText, setShareTooltipText] = useState(defaultToolTipText);
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
            children: `${formatCellLineId(parentalLine.cell_line_id)} cl. ${parentalLine.clone_number
                } ${parentLineGene.symbol}`,
        },
    ];
    const cloneSummary = getCloneSummary(clones);

    const titleContents = (
        <Flex justify="space-between" align="center">
            <div className={title}>{formatCellLineId(cellLineId)}</div>
            <Tooltip title={shareTooltipText} placement="bottom">
                <DarkThemeGhostButton
                    onMouseEnter={() => {
                        if (!shareTooltipText) {
                            // this way it doesn't go back to default text after being copied
                            setShareTooltipText(defaultToolTipText);
                        }
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(href).then(() => {
                            setShareTooltipText("Copied!");
                            setTimeout(() => {
                                setShareTooltipText("");
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
    return (
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
                <h2>
                    <Flex gap={8} align="center" justify="center">
                        Obtain {formatCellLineId(cellLineId)}
                        <LinkOut />
                    </Flex>
                </h2>
                <>
                    <span style={{ fontWeight: 400 }}>{cloneSummary.numMutants}</span>
                    <span style={{ fontWeight: 300 }}> mutant clones</span>
                    <Divider type="vertical" style={{ borderColor: PRIMARY_COLOR }} />
                    <span style={{ fontWeight: 400 }}>
                        {cloneSummary.numIsogenics}
                    </span>{" "}
                    <span style={{ fontWeight: 300 }}>isogenic controls</span>
                </>
            </Button>
        </Card>
    );
};

export default CellLineInfoCard;
