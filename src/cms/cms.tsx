import CMS from 'decap-cms-app'
import uploadcare from 'decap-cms-media-library-uploadcare'
import cloudinary from 'decap-cms-media-library-cloudinary'

import DiseaseCatalogPreview from "./preview-templates/DiseaseCatalogPreview";
import IndexPagePreview from './preview-templates/IndexPagePreview'
import CellLinePreview from './preview-templates/CellLinePreview'
import GeneNamePreview from "./preview-templates/GeneNamePreview";

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate("about", DiseaseCatalogPreview);
CMS.registerPreviewTemplate('cell-line', CellLinePreview)
CMS.registerPreviewTemplate("gene-name", GeneNamePreview);
