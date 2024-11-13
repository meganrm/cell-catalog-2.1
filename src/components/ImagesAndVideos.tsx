import { Card, Flex } from "antd";
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
    mainImageContainer,
    thumbnailContainer,
    thumbnail,
    selectedThumbnail,
    notSelectedThumbnail,
    primaryImageOnly,
    primaryImageWithThumbnail,
    primaryImageContainer,
} = require("../style/images-and-videos.module.css");

interface ImagesAndVideosProps {
    images?: any[];
    cellLineId: string;
    parentalLine: ParentalLineFrontmatter;
    videos?: any;
    geneSymbol: string;
    snp: string;
    fluorescentTag: string;
    parentalGeneSymbol: string;
    alleleTag: string;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({
    images = [],
    cellLineId,
    fluorescentTag,
    parentalGeneSymbol,
    alleleTag,
    geneSymbol,
}) => {
    const [mainImage, setMainImage] = useState(images[0]);
    const hasMultipleImages = images.length > 1;
    const thumbnails = images.map((image) => {
        const renderImage = getImage(image.image);
        const isSelected = mainImage === image;
        const thumbnailClassName = isSelected
            ? selectedThumbnail
            : notSelectedThumbnail;
        if (renderImage) {
            return (
                <div
                    onClick={() => setMainImage(image)}
                    className={`${thumbnail} ${thumbnailClassName}`}
                >
                    <GatsbyImage
                        image={renderImage}
                        alt="thumbnail image"
                    ></GatsbyImage>
                </div>
            );
        }
    });
    const primaryImageClassName = hasMultipleImages
        ? primaryImageWithThumbnail
        : primaryImageOnly;

    const imageData = getImage(mainImage.image);
    if (!imageData) {
        return null;
    }

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

    return (
        <Card className={container} title={title}>
            <Flex
                vertical
                justify="space-between"
                align="center"
                className={imageSection}
            >
                <Flex className={imageContainer} align="center">
                    <Flex className={mainImageContainer} align="center" vertical justify="space-between">
                        <Flex className={primaryImageContainer} align="center" vertical justify="center">
                            <GatsbyImage
                                className={primaryImageClassName}
                                image={imageData}
                                alt="main image"
                            ></GatsbyImage>
                        </Flex>
                        {mainImage.caption && (
                            <p className={caption}>{mainImage.caption}</p>
                        )}
                    </Flex>
                    {hasMultipleImages && (
                        <div className={thumbnailContainer}>
                            {thumbnails}
                        </div>
                    )}
                </Flex>
            </Flex>
        </Card>
    );
};

export default ImagesAndVideos;
