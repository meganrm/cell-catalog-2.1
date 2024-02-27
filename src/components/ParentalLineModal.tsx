import React, { useState } from "react";
import { Button, Modal } from "antd";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { formatCellLineId } from "../utils";

export interface ParentalLineData {
    cell_line_id: string;
    clone_number: string;
    tag_location: string;
    fluorescent_tag: string;
    thumbnail_image: any;
    gene: {
        name: string;
        symbol: string;
    };
}

const ParentalLineModal = (parentalLineData: ParentalLineData) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const image = getImage(parentalLineData.thumbnail_image)
    console.log(parentalLineData.thumbnail_image);
    return (
        <>
            <Button onClick={showModal}>
                {formatCellLineId(parentalLineData.cell_line_id)}
            </Button>
            <Modal
                title={`Parental Line ${formatCellLineId(
                    parentalLineData.cell_line_id
                )} cl. ${parentalLineData.clone_number} `}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {image && <GatsbyImage
                    alt={`${parentalLineData.cell_line_id} thumbnail image`}
                    image={image}
                />}
                <p>Gene Symbol: {parentalLineData.gene.symbol}</p>
                <p>Gene Name: {parentalLineData.gene.name}</p>
                <p>Fluorescent Tag: {parentalLineData.fluorescent_tag}</p>
                <p>Tag Location: {parentalLineData.tag_location}</p>
            </Modal>
        </>
    );
};

export default ParentalLineModal;