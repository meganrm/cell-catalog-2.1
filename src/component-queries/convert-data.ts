import {
    DiseaseCellLineNode,
    NormalCellLineNode,
    UnpackedDiseaseCellLine,
    UnpackedNormalCellLine,
} from "./types";

export const convertFrontmatterToDiseaseCellLine = (
    cellLineNode: DiseaseCellLineNode
): UnpackedDiseaseCellLine => {
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
        diseaseStatus: diseaseData.status,
        mutatedGene: {
            name: diseaseData.gene.frontmatter.name,
            symbol: diseaseData.gene.frontmatter.symbol,
        },
        path: cellLineNode.fields.slug,
        parentalLine: {
            thumbnailImage:
                cellLineNode.frontmatter.parental_line.frontmatter
                    .thumbnail_image,
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
        key: cellLineNode.id,
    };
};

export const convertFrontmatterToNormalCellLines = ({
    node: cellLineNode,
}: {
    node: NormalCellLineNode;
}): UnpackedNormalCellLine => {
    return {
        path: cellLineNode.fields.slug,
        cellLineId: cellLineNode.frontmatter.cell_line_id,
        cloneNumber: cellLineNode.frontmatter.clone_number,
        alleleCount: cellLineNode.frontmatter.allele_count,
        fluorescentTag: cellLineNode.frontmatter.fluorescent_tag,
        tagLocation: cellLineNode.frontmatter.tag_location,
        parentalLine: cellLineNode.frontmatter.parental_line.frontmatter.name,
        protein: cellLineNode.frontmatter.gene.frontmatter.protein,
        taggedGene: {
            name: cellLineNode.frontmatter.gene.frontmatter.name,
            symbol: cellLineNode.frontmatter.gene.frontmatter.symbol,
        },
        structure: cellLineNode.frontmatter.gene.frontmatter.structure,
        status: cellLineNode.frontmatter.status,
        certificateOfAnalysis: "",
        hPSCregCertificateLink: "",
        orderLink: cellLineNode.frontmatter.order_link,
    };
};
