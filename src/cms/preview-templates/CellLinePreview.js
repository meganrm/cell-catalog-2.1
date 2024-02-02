import React from 'react'
import PropTypes from 'prop-types'
import { CellLineTemplate } from '../../templates/cell-line'

const CellLinePreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  return (
      <CellLineTemplate
          content={widgetFor("body")}
          description={entry.getIn(["data", "description"])}
          tags={tags && tags.toJS()}
          title={entry.getIn(["data", "title"])}
      />
  );
}

CellLinePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default CellLinePreview
