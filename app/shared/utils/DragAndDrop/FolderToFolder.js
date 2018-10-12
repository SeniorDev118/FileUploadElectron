export const FOLDER_TO_FOLDER = 'FolderToFolder'

export const folderToFolderSource = {
  beginDrag(props) {
    return { id: props.id }
  },

  canDrag(props) {
    return props.id !== 'bucket'
  }
}

export const folderToFolderTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().id
    const targetIndex = props.id

    if (dragIndex === targetIndex) {
      return
    }

    if (props.moveItem) {
      props.moveItem(dragIndex, targetIndex)
    }
  }
}

export const folderToFolderDropTarget = (connect, monitor) => ({
  folderToFolderDrop: connect.dropTarget(),
  folderToFolderIsOver: monitor.isOver()
})

export const folderToFolderDragSource = (connect, monitor) => ({
  folderToFolderDrag: connect.dragSource(),
  folderToFolderDragPreview: connect.dragPreview(),
  folderToFolderIsDragging: monitor.isDragging()
})
