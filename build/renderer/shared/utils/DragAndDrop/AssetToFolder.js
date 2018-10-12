'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const ASSET_TO_FOLDER = exports.ASSET_TO_FOLDER = 'AssetToFolder';

const assetToFolderSource = exports.assetToFolderSource = {
  beginDrag(props) {
    return props.asset;
  }
};

const assetToFolderTarget = exports.assetToFolderTarget = {
  drop(props, monitor /* , component */) {
    const dragIndex = monitor.getItem();
    const targetIndex = props.id;

    props.addAsset(dragIndex, targetIndex);
  }
};

const assetToFolderDropTarget = exports.assetToFolderDropTarget = (connect, monitor) => ({
  assetToFolderDrop: connect.dropTarget(),
  assetToFolderIsOver: monitor.isOver()
});

const assetToFolderDragSource = exports.assetToFolderDragSource = (connect, monitor) => ({
  assetToFolderDrag: connect.dragSource(),
  assetToFolderDragPreview: connect.dragPreview(),
  assetToFolderIsDragging: monitor.isDragging()
});
//# sourceMappingURL=AssetToFolder.js.map