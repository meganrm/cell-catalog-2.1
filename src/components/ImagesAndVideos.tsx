import { Card, Flex } from "antd";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { GeneFrontMatter } from "../component-queries/types";
import { formatCellLineId } from "../utils";
const { container } = require("../style/images-and-videos.module.css");

interface ImagesAndVideosProps {
    images: any;
    cellLineId: string;
    parentLineGene: GeneFrontMatter;
    videos?: any;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({
    images,
    cellLineId,
}) => {
    const mainImage = images[0];
    const imageData = getImage(mainImage.image);
    const title = (
        <Flex justify="space-between" style={{ paddingTop: 24 }}>
            <div>
                <h3 style={{ fontWeight: 400 }}>{formatCellLineId(cellLineId)}</h3>
                <span style={{ fontWeight: 400, fontSize: 16 }}>
                    here is the subtitle
                </span>
            </div>
            <span
                style={{
                    fontWeight: 600,
                    fontSize: 12,
                    fontStyle: "italic",
                    marginTop: "auto",
                }}
            >
                Representative images for all clones
            </span>
        </Flex>
    );

    return (
        <div>
            <Card className={container} title={title} style={{ width: "100%" }}>
                <Flex justify="center">
                    {imageData && (
                        <GatsbyImage image={imageData} alt="main image"></GatsbyImage>
                    )}
                </Flex>
                <p style={{ fontWeight: 400, fontSize: 12, padding: "8px 80px" }}>
                    {mainImage.caption}
                </p>
            </Card>
        </div>
    );
};

export default ImagesAndVideos;
