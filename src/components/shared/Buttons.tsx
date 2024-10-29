import React from "react";
import { Button as AntdButton } from "antd";

const {
    defaultButton,
    darkBlueHoverButton,
    darkThemeGhostButton,
} = require("../../style/buttons.module.css");

interface ButtonProps extends React.ComponentProps<typeof AntdButton> {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const DefaultButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton {...props} type="default" className={defaultButton} />;
};

export const DarkBlueHoverButton: React.FC<ButtonProps> = (props) => {
    return (
        <AntdButton {...props} type="primary" className={darkBlueHoverButton} />
    );
};

export const DarkThemeGhostButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton {...props} ghost className={darkThemeGhostButton} />;
};
