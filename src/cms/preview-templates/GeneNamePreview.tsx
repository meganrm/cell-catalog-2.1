import React from 'react'
import { GeneNameTemplate } from '../../templates/gene-name'
import { TemplateProps } from './types';

const GeneNamePreview = ({ entry, widgetFor }: TemplateProps) => {
    return (
        <GeneNameTemplate
            symbol={entry.getIn(["data", "symbol"])}
            name={entry.getIn(["data", "name"])}
            protein={entry.getIn(["data", "protein"])}
        />
    );
};

export default GeneNamePreview;
