export interface GeneFrontMatter {
    name: string;
    symbol: string;
    structure?: string;
    protein?: string;
}

export interface ParentalLineFrontmatter {
    cell_line_id: string;
    clone_number: number;
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
    cell_line_id: string;
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
}

export interface DiseaseCellLineEdge {
    node: {
        id: string;
        fields: {
            slug: string;
        };
        frontmatter: DiseaseCellLineFrontmatter;
    };
}

export interface DiseaseFrontmatter {
    name: string;
    gene: {
        frontmatter: GeneFrontMatter;
    };
    status: string;
    acknowledgements: { html: string };
}
