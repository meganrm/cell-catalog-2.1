import React, { useState } from "react";
import { Button, Descriptions, Flex, Modal } from "antd";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";
import { DescriptionsItemType } from "antd/es/descriptions";
import { modal } from "./modal.module.css";

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
    return (
        <>
            <Button onClick={showModal}>{props.cellLineId}</Button>
            <Modal
                title={`Parental Line ${props.cellLineId} cl. ${props.cloneNumber} `}
                open={isModalOpen}
                onCancel={handleCancel}
                width={544}
                centered={true}
                className={modal}
                footer={
                    <div style={{ textAlign: "center" }}>
                        <Button
                            style={{ width: 480 }}
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
                        style={{
                            margin: "auto",
                        }}
                        colon={false}
                        labelStyle={{
                            height: "48px",
                            alignItems: "center",
                            width: "142px",
                        }}
                        contentStyle={{
                            height: "48px",
                            alignItems: "center",
                        }}
                    />
                </Flex>
            </Modal>
        </>
    );
};

export default ParentalLineModal;
