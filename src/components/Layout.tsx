import * as React from "react";
import { Helmet } from "react-helmet";
import { ConfigProvider, Layout as AntLayout } from "antd";
import { Script, withPrefix } from "gatsby";
const { Content } = AntLayout;

import Navbar from "./Navbar";
import "../style/index.sass";
import useSiteMetadata from "./SiteMetadata";
const { container } = require("../style/layout.module.css");

const OFF_WHITE = "#F2F2F2";
const DARK_BLUE = "#00215F";
export const WHITE = "#FFFFFF";
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
                    colorLink: DARK_BLUE,
                    colorLinkActive: DARK_BLUE,
                    colorLinkHover: DARK_BLUE,
                    borderRadius: 4,
                    colorBorder: DARK_GRAY,
                },
                components: {
                    Layout: {
                        bodyBg: OFF_WHITE,
                    },
                    Modal: {
                        motionDurationMid: "0.1s",
                        contentBg: LIGHT_BLUE,
                        headerBg: LIGHT_BLUE,
                        footerBg: LIGHT_BLUE,
                        titleColor: DARK_BLUE,
                    },
                    Button: {
                        defaultColor: DARK_BLUE,
                        defaultBg: OFF_WHITE,
                        defaultBorderColor: DARK_BLUE,
                        defaultHoverBg: OFF_WHITE,
                        colorPrimary: OFF_WHITE,
                        colorPrimaryBgHover: OFF_WHITE,
                        primaryColor: DARK_BLUE,
                        colorPrimaryBorder: DARK_BLUE,
                        primaryShadow: "none",
                        defaultGhostColor: DARK_BLUE,
                        defaultHoverBorderColor: DARK_BLUE,
                    },
                    Table: {
                        headerColor: LIGHT_GRAY,
                        borderColor: DARK_GRAY,
                        headerBg: WHITE,
                        cellFontSize: 16,
                        borderRadius: 4,
                        rowHoverBg: WHITE,
                    },
                    Descriptions: {
                        itemPaddingBottom: 0,
                    },
                    Tag: {
                        defaultColor: DARK_BLUE,
                    },
                    Card: {
                        colorBorder: DARK_GRAY,
                        lineWidth: 1.5,
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
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                ></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
                    rel="stylesheet"
                ></link>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                ></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                ></link>
                <meta name="theme-color" content="#fff" />

                <meta property="og:type" content="business.business" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content="/" />
                <meta
                    property="og:image"
                    content={`${withPrefix("/")}img/og-image.jpg`}
                />
            </Helmet>
            <AntLayout className={container}>
                <Navbar />
                <Content>{children}</Content>
            </AntLayout>
            <Script
                type="text/javascript"
                src="iframeResizer.js" />
        </ConfigProvider>
    );
};

export default TemplateWrapper;
