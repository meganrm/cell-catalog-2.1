import {
    DiseaseFrontmatter,
    DiseaseCellLineNode,
    UnpackedDiseaseCellLine,
} from "./types";

export const convertFrontmatterToDiseaseCellLine = (
    cellLineNode: DiseaseCellLineNode
): UnpackedDiseaseCellLine => {
    console.log(cellLineNode.frontmatter.disease);
    const diseaseData = cellLineNode.frontmatter.disease.frontmatter;
    return {
        cellLineId: cellLineNode.frontmatter.cell_line_id,
        certificateOfAnalysis: cellLineNode.frontmatter.certificate_of_analysis,
        hPSCregCertificateLink:
            cellLineNode.frontmatter.hPSCreg_certificate_link,
        snp: cellLineNode.frontmatter.snp,
        status: cellLineNode.frontmatter.status,
        clones: cellLineNode.frontmatter.clones,
        orderLink: cellLineNode.frontmatter.order_link,
        mutatedGene: {
            name: diseaseData.gene.frontmatter.name,
            symbol: diseaseData.gene.frontmatter.symbol,
        },
        path: cellLineNode.fields.slug,
        parentalLine: {
            cellLineId:
                cellLineNode.frontmatter.parental_line.frontmatter.cell_line_id,
            cloneNumber:
                cellLineNode.frontmatter.parental_line.frontmatter.clone_number,
            tagLocation:
                cellLineNode.frontmatter.parental_line.frontmatter.tag_location,
            fluorescentTag:
                cellLineNode.frontmatter.parental_line.frontmatter
                    .fluorescent_tag,
            taggedGene: {
                name: cellLineNode.frontmatter.parental_line.frontmatter.gene
                    .frontmatter.name,
                symbol: cellLineNode.frontmatter.parental_line.frontmatter.gene
                    .frontmatter.symbol,
            },
        },
        diseaseGeneComponent: null,
        parentalLineComponent: null,
        key: cellLineNode.id,
    };
};
