import React from "react";
import { Card } from "antd";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Diseases from "../component-queries/Diseases";
import Content, { HTMLContent } from "../components/Content";

interface DiseaseCatalogTemplateProps {
    title: string;
    content: string;
    contentComponent?: JSX.ElementType;
    footerText: string;
    main: {
        heading: string;
        description: string;
        subheading: string;
    };
}
// eslint-disable-next-line
export const DiseaseCatalogTemplate = ({
    title,
    content,
    contentComponent,
    footerText,
    main
}: DiseaseCatalogTemplateProps) => {
    const PageContent = contentComponent || Content;
    return (
        <section className="section section--gradient">
            <h1 className="">{title}</h1>
            <PageContent className="content" content={content} />
            <h2>{main.heading}</h2>
            <Card className={"banner"} bordered={true}>
                <h4>{main.subheading}</h4>
                <PageContent className="banner-content" content={main.description} />
            </Card>
            <Diseases />
            <div>{footerText}</div>
        </section>
    );
};

interface QueryResult {
    data: {
        markdownRemark: {
            html: string;
            frontmatter: {
                title: string;
                footer_text: string;
                main: {
                    heading: string;
                    subheading: string;
                    description: string;
                };
            };
        };
    };
}

const DiseaseCatalog = ({ data }: QueryResult) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <DiseaseCatalogTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.html}
                footerText={post.frontmatter.footer_text}
                main={post.frontmatter.main}
            />
        </Layout>
    );
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
                    subheading
                    description
                }
            }
        }
    }
`;
