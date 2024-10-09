import { Card } from 'antd';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

const { container, card, caption } = require("../style/images-and-videos.module.css");

interface ImagesAndVideosProps {
    images: any;
    videos?: any;
}

const ImagesAndVideos: React.FC<ImagesAndVideosProps> = ({ images }) => {
    console.log(images);
    const mainImage = images[0];
    return (
        <div className= {container}>
            <h2>title</h2>
            {images.map((img:any, index:number) => {
                    const image = getImage(img.image.childImageSharp.gatsbyImageData);
            return (
                <Card key={index} className={card} style={{ width: "100%" }}>
                    {image && <GatsbyImage image={image} alt={img.caption}></GatsbyImage>}
                    <p className={caption}>{img.caption}</p>
                </Card>
            );
})}
        </div>
    );
};

export default ImagesAndVideos;