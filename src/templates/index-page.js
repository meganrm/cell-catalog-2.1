import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Features from "../components/Features";
import CellLineTable from "../components/CellLineTable";
import FullWidthImage from "../components/FullWidthImage";

// eslint-disable-next-line
export const IndexPageTemplate = ({
    title,
    subtitle,
    image,
    mainPitch,
    products
 
}) => {
    const heroImage = getImage(image) || image;
    console.log()
    return (
        <div>
            <FullWidthImage
                img={heroImage}
                title={title}
                subheading={subtitle}
            />
            <section className="section section--gradient">
                <div className="container">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <div className="content">
                                    <div className="content">
                                        <div className="tile">
                                            <h1 className="title">
                                                {mainPitch.title}
                                            </h1>
                                        </div>
                                        <div className="tile">
                                            <h3 className="subtitle">
                                                {mainPitch.description}
                                            </h3>
                                        </div>
                                    </div>
                      
                                    <Features gridItems={products} />
                                    <div className="column is-12">
                                        <h3 className="has-text-weight-semibold is-size-2">
                                            Cell Lines
                                        </h3>
                                        <CellLineTable />
                                        <div className="column is-12 has-text-centered">
                                            <Link
                                                className="btn"
                                                to="/cell-line"
                                            >
                                                Read more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    mainPitch: PropTypes.object,
    products: PropTypes.array,
};

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <IndexPageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                subtitle={frontmatter.subtitle}
                mainPitch={frontmatter.main_pitch}
                products={frontmatter.products}
            />
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
};

export default IndexPage;

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
                title
                subtitle
                image {
                    childImageSharp {
                        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                    }
                }
                main_pitch {
                    title
                    description
                }
                products {
                    text
                    image
                }
            }
        }
    }
`;
