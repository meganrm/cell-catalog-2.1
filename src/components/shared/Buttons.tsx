import React from "react";
import { Button as AntdButton } from "antd";

const {
    defaultButton,
    darkThemeGhostButton,
} = require("../../style/buttons.module.css");

interface ButtonProps extends React.ComponentProps<typeof AntdButton> {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const DefaultButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton {...props} type="default" className={defaultButton} />;
};

export const DarkThemeGhostButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton {...props} ghost className={darkThemeGhostButton} />;
};
