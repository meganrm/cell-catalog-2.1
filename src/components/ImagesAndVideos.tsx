import { Card, Flex } from "antd";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { ParentalLineFrontmatter } from "../component-queries/types";
import { formatCellLineId } from "../utils";
const {
    container,
    titleSection,
    mainTitle,
    subtitle,
    rightTitle,
    imageSection,
    caption,
    imageContainer,
    thumbnail,
    modal,
    modalContent,
    close,
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
    const [isModalOpen, setModalOpen] = useState(false);
    const mainImage = images.length > 0 ? images[0] : null;
    const imageData = mainImage ? getImage(mainImage.image) : null;
    const fluorescentTag = parentalLine.fluorescent_tag;
    const parentalGeneSymbol = parentalLine.gene.frontmatter.symbol;
    const alleicTag = parentalLine.allele_count;
    const title = (
        <Flex
            justify="space-between"
            style={{ paddingTop: 24 }}
            className={titleSection}
        >
            <div>
                <h3 id={mainTitle}>{formatCellLineId(cellLineId)}</h3>
                <span className={subtitle}>
                    {geneSymbol}-(placeholder) in WTC-{fluorescentTag}-{parentalGeneSymbol}
                    ({alleicTag}-allelic tag)
                </span>
            </div>
            <span className={rightTitle}>Representative images for all clones</span>
        </Flex>
    );


    const showModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
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
                    <div className={`${imageContainer} ${thumbnail}`} onClick={showModal}>
                        <GatsbyImage image={imageData} alt="main image"></GatsbyImage>
                    </div>
                )}
                {mainImage?.caption && <p className={caption}>{mainImage.caption}</p>}
            </Flex>

            { isModalOpen && imageData && (
                    <div className={modal} onClick={closeModal}>
                        <span className={close}>&times;</span>
                        <GatsbyImage className={modalContent} image={imageData} alt="full image"></GatsbyImage>
                    </div>
            )}
        </Card>
    );
};

export default ImagesAndVideos;
