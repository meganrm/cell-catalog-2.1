import React from 'react'
import PropTypes from 'prop-types'
import { DiseaseCatalogTemplate } from '../../templates/disease-catalog'

const DiseaseCatalogPreview = ({ entry, widgetFor }) => (
    <AboutPageTemplate
        title={entry.getIn(["data", "title"])}
        content={widgetFor("body")}
    />
);

DiseaseCatalogPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
};

export default DiseaseCatalogPreview;
