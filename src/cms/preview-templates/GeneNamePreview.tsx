import React from "react";
import { GeneNameTemplate } from "../../templates/gene-name";
import { TemplateProps } from "./types";
import { Isoform } from "../../component-queries/types";

const GeneNamePreview = ({ entry, widgetFor }: TemplateProps) => {
    const isoforms = [] as Isoform[];
    const isoformData = entry.getIn(["data", "isoforms"]);
    if (isoformData) {
        isoformData.forEach((isoform: any) => {
            const idsData = isoform.get("ids");
            const ids = [] as string[];
            if (idsData?.size) {
                idsData.forEach((id: any) => {
                    ids.push(id);
                });
            }
            isoforms.push({
                name: isoform.get("name"),
                ids: ids,
            });
        });
    }
    return (
        <GeneNameTemplate
            symbol={entry.getIn(["data", "symbol"])}
            name={entry.getIn(["data", "name"])}
            protein={entry.getIn(["data", "protein"])}
            structure={entry.getIn(["data", "structure"])}
            isoforms={isoforms}
        />
    );
};

export default GeneNamePreview;
