import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface QueryResult {
    data: {
        markdownRemark: {
            frontmatter: {
                cell_line_id: string;
                clone_number: number;
                gene: string;
                tag_location: string;
                status: string;
                thumbnail_image: any;
            };
        };
    };
}

interface CellLineProps {
    cellLineId: string;
    cloneNumber: number;
    gene: string;
    tagLocation: string;
    status: string;
    thumbnail: any;
}

// eslint-disable-next-line
export const CellLineTemplate = ({
    cellLineId,
    cloneNumber,
    gene,
    tagLocation,
    status,
    thumbnail,
}: CellLineProps) => {
    const image = getImage(thumbnail);
    return (
        <section className="section">
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            AICS-{cellLineId}
                        </h1>
                        <p>Clone Number: {cloneNumber}</p>
                        <p>Gene: {gene}</p>
                        <p>Tag: {tagLocation}</p>
                        <p>Status: {status}</p>
                        {image && (
                            <GatsbyImage
                                image={image}
                                alt="Cell Line Thumbnail"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CellLine = ({ data }: QueryResult) => {
    const { markdownRemark: cellLine } = data;
    return (
        <Layout>
            <CellLineTemplate
                cellLineId={cellLine.frontmatter.cell_line_id}
                cloneNumber={cellLine.frontmatter.clone_number}
                gene={cellLine.frontmatter.gene}
                tagLocation={cellLine.frontmatter.tag_location}
                status={cellLine.frontmatter.status}
                thumbnail={cellLine.frontmatter.thumbnail_image}
            />
        </Layout>
    );
};

export default CellLine;

export const pageQuery = graphql`
    query CellLineByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                cell_line_id
                clone_number
                tag_location
                status
                thumbnail_image {
                    childImageSharp {
                        gatsbyImageData(width: 200, placeholder: BLURRED)
                    }
                }
            }
        }
    }
`;
