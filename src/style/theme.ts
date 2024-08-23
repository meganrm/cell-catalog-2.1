export const OFF_WHITE = "#F2F2F2";
export const DARK_BLUE = "#00215F";
export const WHITE = "#FFFFFF";
export const LIGHT_BLUE = "#E5E9F1";
export const DARK_GRAY = "#CBCBCC";
export const LIGHT_GRAY = "#323233";

export default {
    token: {
        colorPrimary: DARK_BLUE,
        colorBgContainer: WHITE,
        colorLink: DARK_BLUE,
        colorLinkActive: DARK_BLUE,
        colorLinkHover: DARK_BLUE,
        borderRadius: 4,
        colorBorder: DARK_GRAY,
        fontFamily: "Open Sans",
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
            contentFontSize: 16,
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
};
