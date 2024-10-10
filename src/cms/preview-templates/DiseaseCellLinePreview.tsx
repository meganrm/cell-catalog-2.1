import React from "react";

import { TemplateProps } from "./types";
import InfoPanel from "../../components/shared/InfoPanel";
import { formatCellLineId } from "../../utils";
import CloneTable from "../../components/CloneTable";
import { Clone } from "../../component-queries/types";
import PreviewCompatibleImage from "../../components/PreviewCompatibleImage";
import ProgressPreview from "./ProgressPreview";

const DiseaseCellLinePreview = ({ entry, getAsset }: TemplateProps) => {
    const parental_line_id = entry.getIn(["data", "parental_line"]);

    const data = [
        {
            key: "cell_line_id",
            label: "Cell Line ID: ",
            children: formatCellLineId(entry.getIn(["data", "cell_line_id"])),
        },
        {
            key: "parental_line",
            label: "Parental Line: ",
            children: formatCellLineId(parental_line_id),
        },
        {
            key: "snp",
            label: "SNP: ",
            children: entry.getIn(["data", "snp"]),
        },
        {
            key: "order_link",
            label: "",
            children: (
                <a href={entry.getIn(["data", "order_link"])}>Order Link</a>
            ),
        },
        {
            key: "certificate_of_analysis",
            label: "",
            children: (
                <a href={entry.getIn(["data", "certificate_of_analysis"])}>
                    Certificate of Analysis
                </a>
            ),
        },

        {
            key: "health_certificate",
            label: "Health Certificate",
            children: entry.getIn(["data", "health_certificate"]),
        },
    ];
    const status = entry.getIn(["data", "status"]);
    const clones = entry.getIn(["data", "clones"]);
    const cloneData = [] as Clone[];
    clones.forEach((clone: any) => {
        const data = {
            clone_number: clone.get("clone_number"),
            type: clone.get("type"),
            transfection_replicate: clone.get("transfection_replicate"),
            genotype: clone.get("genotype"),
        };
        cloneData.push(data);
    });

    const imageArray = entry.getIn(["data", "images_and_videos", "images"]);
    const images = [] as any[];
    if (imageArray !== undefined) {
        imageArray.forEach((imageObj: any) => {
            const image = getAsset(imageObj.get("image"));
            const data = {
                image: image,
                caption: imageObj.get("caption"),
            };
            images.push(data);
        });
    }
    console.log(status);
    return (
        <>
            <ProgressPreview status={status} />
            <InfoPanel data={data} />
            <CloneTable dataSource={cloneData} />

            {images.map((data: any) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "10px",
                    }}
                >
                    <PreviewCompatibleImage
                        imageStyle={{ width: "50%" }}
                        imageInfo={{ image: data.image.url }}
                    />
                    <small>{data.caption}</small>
                </div>
            ))}
        </>
    );
};

export default DiseaseCellLinePreview;
