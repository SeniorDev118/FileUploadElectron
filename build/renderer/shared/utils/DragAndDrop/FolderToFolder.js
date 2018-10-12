'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const FOLDER_TO_FOLDER = exports.FOLDER_TO_FOLDER = 'FolderToFolder';

const folderToFolderSource = exports.folderToFolderSource = {
  beginDrag(props) {
    return { id: props.id };
  },

  canDrag(props) {
    return props.id !== 'bucket';
  }
};

const folderToFolderTarget = exports.folderToFolderTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().id;
    const targetIndex = props.id;

    if (dragIndex === targetIndex) {
      return;
    }

    if (props.moveItem) {
      props.moveItem(dragIndex, targetIndex);
    }
  }
};

const folderToFolderDropTarget = exports.folderToFolderDropTarget = (connect, monitor) => ({
  folderToFolderDrop: connect.dropTarget(),
  folderToFolderIsOver: monitor.isOver()
});

const folderToFolderDragSource = exports.folderToFolderDragSource = (connect, monitor) => ({
  folderToFolderDrag: connect.dragSource(),
  folderToFolderDragPreview: connect.dragPreview(),
  folderToFolderIsDragging: monitor.isDragging()
});
//# sourceMappingURL=FolderToFolder.js.map