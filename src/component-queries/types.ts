
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

export interface DiseaseCellLineFrontmatter {
    templateKey: string;
    cell_line_id: string;
    parental_line: { frontmatter: ParentalLineFrontmatter };
    disease: string;
    snp: string;
    clones: {
        isogenic_controls: number;
        mutants: number;
    };
    certificate_of_analysis: string;
    order_link: string;
    status: string;
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
    acknowledgements: string;
}
