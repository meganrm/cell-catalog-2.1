import { Card, Flex, Modal } from "antd";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { ParentalLineFrontmatter } from "../component-queries/types";
import { formatCellLineId } from "../utils";
const {
    container,
    header,
    titleSection,
    mainTitle,
    subtitle,
    rightTitle,
    imageSection,
    caption,
    imageContainer,
    modal,
    modalContent,
} = require("../style/images-and-videos.module.css");

interface ImagesAndVideosProps {
    images?: any[];
    cellLineId: string;
    parentalLine: ParentalLineFrontmatter;
    videos?: any;
    geneSymbol: string;
    snp: string;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({
    images = [],
    cellLineId,
    parentalLine,
    geneSymbol,
}) => {
    const mainImage = images.length > 0 ? images[0] : null;
    const imageData = mainImage ? getImage(mainImage.image) : null;
    const fluorescentTag = parentalLine.fluorescent_tag;
    const parentalGeneSymbol = parentalLine.gene.frontmatter.symbol;
    const alleleTag = parentalLine.allele_count;
    const title = (
        <Flex
            justify="space-between"
            style={{ paddingTop: 24 }}
            className={header}
        >
            <div className={titleSection}>
                <h3 className={mainTitle}>{formatCellLineId(cellLineId)}</h3>
                <span className={subtitle}>
                    {geneSymbol}-(placeholder) in WTC-{fluorescentTag}-
                    {parentalGeneSymbol}({alleleTag}-allelic tag)
                </span>
            </div>
            <span className={rightTitle}>
                Representative images for all clones
            </span>
        </Flex>
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };
    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    return (
        <Card className={container} title={title} style={{ width: "100%" }}>
            <Flex
                vertical
                justify="space-between"
                align="center"
                className={imageSection}
            >
                {imageData && (
                    <div className={imageContainer} onClick={showModal}>
                        <GatsbyImage
                            image={imageData}
                            alt="main image"
                        ></GatsbyImage>
                    </div>
                )}
                {mainImage?.caption && (
                    <p className={caption}>{mainImage.caption}</p>
                )}
            </Flex>
            {imageData && (
                <Modal 
                    open={isModalOpen}
                    className={modal} 
                    onCancel={(e) => handleCancel(e)}
                    centered={true}
                    footer={null}
                >
                    <GatsbyImage className={modalContent} image={imageData} alt="full image"></GatsbyImage>
                </Modal>
            )}
        </Card>
    );
};

export default ImagesAndVideos;
