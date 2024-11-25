import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

const {
    thumbnail,
    selectedThumbnail,
    notSelectedThumbnail,
} = require("../style/thumbnail.module.css");

interface ThumbnailProps {
    image: IGatsbyImageData;
    isSelected: boolean;
    onClick: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
    image,
    isSelected,
    onClick,
}) => {
    const thumbnailClassName = isSelected
        ? selectedThumbnail
        : notSelectedThumbnail;

    return (
        <div
            onClick={onClick}
            className={`${thumbnail} ${thumbnailClassName}`}
            role="button"
        >
            <GatsbyImage image={image} alt="thumbnail image" />
        </div>
    );
};

export default Thumbnail;
