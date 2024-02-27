import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

interface GeneNameTemplateProps {
    name: string;
    symbol: string;
    protein: string;
}

export const GeneNameTemplate = ({
    name,
    symbol,
    protein,
}: GeneNameTemplateProps) => {
    return (
        <section className="section">
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {name}
                        </h1>
                        <p>{symbol}</p>
                        <p>{protein}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const GeneName = ({ data }: QueryResult) => {
    const { markdownRemark: geneData } = data;

    return (
        <Layout>
            <GeneNameTemplate
                protein={geneData.frontmatter.protein}
                symbol={geneData.frontmatter.symbol}
                name={geneData.frontmatter.name}
            />
        </Layout>
    );
};

export default GeneName;

interface QueryResult {
    data: {
        markdownRemark: {
            frontmatter: {
                name: string;
                symbol: string;
                protein: string;
            };
        };
    };
}

export const pageQuery = graphql`
    query GeneNameById($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                name
                symbol
                protein
            }
        }
    }
`;
