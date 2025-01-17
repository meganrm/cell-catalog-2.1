export interface GeneFrontMatter {
    name: string;
    symbol: string;
    structure?: string;
    protein?: string;
}

export interface ParentalLineFrontmatter {
    cell_line_id: number;
    clone_number: number;
    allele_count: string;
    tag_location: string;
    fluorescent_tag: string;
    thumbnail_image: any;
    gene: {
        frontmatter: GeneFrontMatter;
    };
}

export enum CellLineStatus {
    DataComplete = "data complete",
    Released = "released",
    InProgress = "in progress",
}

// NOTE: Temporarily optional fields, but
// once the data has been updated by gene editing
// these fields will be required
export interface Clone {
    type: string;
    clone_number?: number;
    genotype?: string;
    transfection_replicate?: string;
}

export interface DiseaseCellLineFrontmatter {
    templateKey: string;
    cell_line_id: number;
    parental_line: { frontmatter: ParentalLineFrontmatter };
    disease: {
        frontmatter: DiseaseFrontmatter;
    };
    snp: string;
    clones: Clone[];
    certificate_of_analysis: string;
    order_link: string;
    status: CellLineStatus;
    hPSCreg_certificate_link: string;
    images_and_videos: {
        images: {
            image: any;
            caption: string;
        }[];
        videos: {
            video: any;
            caption: string;
        }[];
    };
}

export interface DiseaseCellLineNode {
    id: string;
    fields: {
        slug: string;
    };
    frontmatter: DiseaseCellLineFrontmatter;
}

export interface DiseaseCellLineEdge {
    node: DiseaseCellLineNode;
}

export interface DiseaseFrontmatter {
    name: string;
    gene: {
        frontmatter: GeneFrontMatter;
    };
    status: string;
    acknowledgements: { html: string };
}

export interface UnpackedGene {
    name: string;
    symbol: string;
    structure?: string;
    protein?: string;
}

export interface UnpackedCellLineMainInfo {
    path: string;
    cellLineId: number;
    status: CellLineStatus;
    certificateOfAnalysis: string;
    hPSCregCertificateLink: string;
    orderLink: string;
    thumbnailImage?: any;
}
export interface UnpackedNormalCellLine extends UnpackedCellLineMainInfo {
    cloneNumber: number;
    tagLocation: string;
    fluorescentTag: string;
    taggedGene: UnpackedGene;
}

export type ParentLine = Partial<UnpackedNormalCellLine>;

export interface UnpackedDiseaseCellLine extends UnpackedCellLineMainInfo {
    diseaseStatus: string;
    path: string;
    key: string;
    snp: string;
    clones: Clone[];
    parentalLine: ParentLine;
    mutatedGene: UnpackedGene;
}
