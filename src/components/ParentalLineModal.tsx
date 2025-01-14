import React, { useState } from "react";
import { Descriptions, Divider, Flex, Modal } from "antd";
import Icon, { InfoCircleOutlined } from "@ant-design/icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";
import { DescriptionsItemType } from "antd/es/descriptions";

import { DarkBlueHoverButton } from "./shared/Buttons";

const {
    modal,
    title,
    header,
    subTitle,
    clone,
    actionButton,
} = require("../style/modal.module.css");
const LinkOut = require("../img/external-link.svg");

interface ParentalLineModalProps {
    displayItems: DescriptionsItemType[];
    image: FileNode;
    cellLineId: string;
    cloneNumber: number;
}
const ParentalLineModal = (props: ParentalLineModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };
    const image = getImage(props.image);
    const headerElement = (
        <div className={header}>
            <div className={title}>Parental Line </div>
            <Divider type="vertical" />
            <div className={subTitle}>{props.cellLineId} </div>
            <div className={clone}> cl. {props.cloneNumber}</div>
        </div>
    );
    return (
        <>
            <DarkBlueHoverButton onClick={(e) => showModal(e)}>
                {props.cellLineId} {<InfoCircleOutlined />}
            </DarkBlueHoverButton>
            <Modal
                title={headerElement}
                open={isModalOpen}
                onCancel={(e) => handleCancel(e)}
                width={555}
                centered={true}
                className={modal}
                footer={
                    <div style={{ textAlign: "center" }}>
                        <DarkBlueHoverButton
                            style={{
                                width: 480,
                                borderWidth: "2px",
                                backgroundColor: "white",
                            }}
                            href="https://www.allencell.org/cell-catalog.html"
                            target="_blank"
                            className={actionButton}
                        >
                            <Flex
                                justify="flex-end"
                                gap={110}
                                style={{
                                    width: "100%",
                                    fontWeight: 600,
                                }}
                            >
                                Go to Parental Line
                                <Icon component={LinkOut} />
                            </Flex>
                        </DarkBlueHoverButton>
                    </div>
                }
            >
                <Flex justify="space-between" gap={16}>
                    <div style={{ width: "192px", display: "block" }}>
                        {image && (
                            <GatsbyImage
                                alt={`${props.cellLineId} thumbnail image`}
                                image={image}
                            />
                        )}
                    </div>
                    <Descriptions
                        column={1}
                        items={props.displayItems}
                        layout="horizontal"
                        colon={false}
                        labelStyle={{
                            alignItems: "center",
                            width: "142px",
                            fontSize: "16px",
                        }}
                        contentStyle={{
                            alignItems: "center",
                            fontSize: "18px",
                            fontWeight: "semi-bold",
                        }}
                    />
                </Flex>
            </Modal>
        </>
    );
};

export default ParentalLineModal;
