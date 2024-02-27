import React from 'react'
import { IndexPageTemplate } from '../../templates/index-page'
import { TemplateProps } from './types';

const IndexPagePreview = ({ entry }: TemplateProps) => {
    const data = entry.getIn(["data"]).toJS();

    if (data) {
        return (
            <IndexPageTemplate
                mainPitch={data.mainpitch || {}}
                products={data.products || []}
            />
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default IndexPagePreview
