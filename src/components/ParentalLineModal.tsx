import React, { useState } from "react";
import { Button, Descriptions, Divider, Flex, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";
import { DescriptionsItemType } from "antd/es/descriptions";
import { modal, title, header, subTitle, clone } from "../style/modal.module.css";

interface ParentalLineModalProps {
    displayItems: DescriptionsItemType[];
    image: FileNode;
    cellLineId: string;
    cloneNumber: number;
}
const ParentalLineModal = (props: ParentalLineModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
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
            <Button onClick={showModal} >
                {props.cellLineId} {<InfoCircleOutlined />}
            </Button>
            <Modal
                title={headerElement}
                open={isModalOpen}
                onCancel={handleCancel}
                width={544}
                centered={true}
                className={modal}
                footer={
                    <div style={{ textAlign: "center" }}>
                        <Button
                            type="primary"
                            style={{ width: 480, border: "2px solid #003075" }}
                            href="https://www.allencell.org/cell-catalog.html"
                            target="_blank"
                        >
                            More information
                        </Button>
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
                        }}
                        contentStyle={{
                            alignItems: "center",
                        }}
                    />
                </Flex>
            </Modal>
        </>
    );
};

export default ParentalLineModal;
