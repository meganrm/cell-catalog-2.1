// GRAYS
export const WHITE = "#FFFFFF";
export const SOFT_WHITE = "#F2F2F2";
export const RAIN_SHADOW = "#CBCBCC";
export const SERIOUS_GRAY = "#323233";

export const ALLEN_LIGHT_10 = "#DFE5EA";
export const ALLEN_LIGHT_30 = "#9FB1C0";
export const ALLEN_BLUE = "#003057";

export default {
    token: {
        colorPrimary: ALLEN_BLUE,
        colorBgContainer: WHITE,
        colorLink: ALLEN_BLUE,
        colorLinkActive: ALLEN_BLUE,
        colorLinkHover: ALLEN_BLUE,
        borderRadius: 4,
        colorBorder: RAIN_SHADOW,
        fontFamily: "Open Sans",
    },
    components: {
        Layout: {
            bodyBg: SOFT_WHITE,
        },
        Modal: {
            motionDurationMid: "0.1s",
            contentBg: ALLEN_LIGHT_10,
            headerBg: ALLEN_LIGHT_10,
            footerBg: ALLEN_LIGHT_10,
            titleColor: ALLEN_BLUE,
        },
        Button: {
            defaultColor: ALLEN_BLUE,
            defaultBg: SOFT_WHITE,
            defaultBorderColor: ALLEN_BLUE,
            defaultHoverBg: SOFT_WHITE,
            colorPrimary: SOFT_WHITE,
            colorPrimaryBgHover: SOFT_WHITE,
            primaryColor: ALLEN_BLUE,
            colorPrimaryBorder: ALLEN_BLUE,
            primaryShadow: "none",
            defaultGhostColor: ALLEN_BLUE,
            defaultHoverBorderColor: ALLEN_BLUE,
            contentFontSize: 16,
        },
        Table: {
            headerColor: SERIOUS_GRAY,
            borderColor: RAIN_SHADOW,
            headerBg: WHITE,
            cellFontSize: 16,
            borderRadius: 4,
            rowHoverBg: WHITE,
        },
        Descriptions: {
            itemPaddingBottom: 0,
        },
        Tag: {
            defaultColor: ALLEN_BLUE,
        },
        Card: {
            colorBorder: RAIN_SHADOW,
            lineWidth: 1.5,
        },
    },
};
