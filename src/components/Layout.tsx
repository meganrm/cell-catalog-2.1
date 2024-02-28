import * as React from "react";
import { Helmet } from "react-helmet";
import { ConfigProvider, Layout as AntLayout } from "antd";
import { withPrefix } from "gatsby";
const { Content } = AntLayout;

import Navbar from "./Navbar";
import "../style/bulma-style.sass";
import useSiteMetadata from "./SiteMetadata";
import { body } from "./layout.module.css";

const GRAY = "#F2F2F2";
const DARK_BLUE = "#00215F";
const WHITE = "#FFFFFF";
const LIGHT_BLUE = "#E5E9F1";
const DARK_GRAY = "#CBCBCC";
const LIGHT_GRAY = "#323233";


const TemplateWrapper = ({ children }: React.PropsWithChildren) => {
    const { title, description } = useSiteMetadata();
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: DARK_BLUE,
                    colorBgContainer: WHITE,
                },
                components: {
                    Layout: {
                        bodyBg: GRAY,
                    },
                    Modal: {
                        contentBg: LIGHT_BLUE,
                        headerBg: LIGHT_BLUE,
                        footerBg: LIGHT_BLUE,
                        titleColor: DARK_BLUE,
                    },
                    Button: {
                        defaultColor: DARK_BLUE,
                        defaultBg: DARK_GRAY,
                        defaultBorderColor: DARK_BLUE,
                        defaultHoverBg: DARK_GRAY,
                        colorPrimary: GRAY,
                        colorPrimaryBgHover: GRAY,
                        primaryColor: DARK_BLUE,
                        colorPrimaryBorder: DARK_BLUE,
                        primaryShadow: "none",
                    },
                    Table: {
                        headerColor: LIGHT_GRAY,
                        borderColor: DARK_GRAY,
                        headerBg: WHITE,
                    },
                    Descriptions: {
                        itemPaddingBottom: 0,
                    },
                },
            }}
        >
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={`${withPrefix("/")}img/apple-touch-icon.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix("/")}img/favicon-32x32.png`}
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix("/")}img/favicon-16x16.png`}
                    sizes="16x16"
                />

                <link
                    rel="mask-icon"
                    href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
                    color="#ff4400"
                />
                <meta name="theme-color" content="#fff" />

                <meta property="og:type" content="business.business" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content="/" />
                <meta
                    property="og:image"
                    content={`${withPrefix("/")}img/og-image.jpg`}
                />
            </Helmet>
            <AntLayout className={body}>
                <Navbar />
                <Content>{children}</Content>
            </AntLayout>
        </ConfigProvider>
    );
};

export default TemplateWrapper;
