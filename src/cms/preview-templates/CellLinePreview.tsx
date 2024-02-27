import React from 'react'
import { CellLineTemplate } from '../../templates/cell-line'
import { TemplateProps } from './types';

const CellLinePreview = ({ entry }: TemplateProps) => {
    return (
        <CellLineTemplate
            cellLineId={entry.getIn(["data", "cell_line_id"])}
            cloneNumber={entry.getIn(["data", "clone_number"])}
            gene={entry.getIn(["data", "gene"])}
            tagLocation={entry.getIn(["data", "tag_location"])}
            status={entry.getIn(["data", "status"])}
        />
    );
};

export default CellLinePreview
