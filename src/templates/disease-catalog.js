import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Diseases from "../component-queries/Diseases";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const DiseaseCatalogTemplate = ({
    title,
    content,
    contentComponent,
    footerText,
}) => {
    const PageContent = contentComponent || Content;

    return (
        <section className="section section--gradient">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="section">
                            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                                {title}
                            </h2>
                            <PageContent
                                className="content"
                                content={content}
                            />
                            <Diseases />
                            <div>{footerText}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

DiseaseCatalogTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
};

const DiseaseCatalog = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <DiseaseCatalogTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.html}
                footerText={post.frontmatter.footer_text}
            />
        </Layout>
    );
};

DiseaseCatalog.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DiseaseCatalog;

export const aboutPageQuery = graphql`
    query DiseaseCatalog($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
                footer_text
                main {
                    heading
                    description
                    
                }
            }
        }
    }
`;
