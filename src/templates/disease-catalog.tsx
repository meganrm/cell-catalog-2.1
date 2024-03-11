import React from "react";
import { Card, Divider, Flex } from "antd";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Diseases from "../component-queries/Diseases";
import Content, { HTMLContent } from "../components/Content";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";
import {
    coriellCard,
    banner,
    bannerContent,
    header,
    mainHeading,
} from "../style/disease-catalog.module.css";
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
    coriellImage: FileNode;
    coriellLink: string;
}
// eslint-disable-next-line
export const DiseaseCatalogTemplate = ({
    title,
    content,
    contentComponent,
    footerText,
    main,
    coriellImage,
    coriellLink
}: DiseaseCatalogTemplateProps) => {
    const image = getImage(coriellImage);
    const PageContent = contentComponent || Content;
    return (
        <section>
            <Flex className={header}>
                <div>
                    <h1 className="">{title}</h1>
                    <PageContent className="content" content={content} />
                </div>
                <Divider
                    type="vertical"
                    style={{ height: "initial", marginInline: "20px" }}
                />
                <div>
                    {image && (
                        <a href={coriellLink} target="_blank" rel="noreferrer">
                            <Card
                                bordered={true}
                                className={coriellCard}
                                title="View Allen Cell Collection on"
                                cover={
                                    <GatsbyImage image={image} alt="Coriell" />
                                }
                            ></Card>
                        </a>
                    )}
                </div>
            </Flex>
            <h2 className={mainHeading}>{main.heading}</h2>
            <Card className={banner} bordered={true}>
                <h4>{main.subheading}</h4>
                <PageContent
                    className={bannerContent}
                    content={main.description}
                />
            </Card>
            <Diseases />
            <div className="footer">{footerText}</div>
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
                coriell_image: FileNode;
                coriell_link: string;
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
                coriellImage={post.frontmatter.coriell_image}
                coriellLink={post.frontmatter.coriell_link}
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
                coriell_image {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FIXED
                            width: 309
                        )
                    }
                }
                coriell_link
            }
        }
    }
`;
