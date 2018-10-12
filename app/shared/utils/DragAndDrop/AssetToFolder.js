export const ASSET_TO_FOLDER = 'AssetToFolder'

export const assetToFolderSource = {
  beginDrag(props) {
    return props.asset
  }
}

export const assetToFolderTarget = {
  drop(props, monitor /* , component */) {
    const dragIndex = monitor.getItem()
    const targetIndex = props.id

    props.addAsset(dragIndex, targetIndex)
  }
}

export const assetToFolderDropTarget = (connect, monitor) => ({
  assetToFolderDrop: connect.dropTarget(),
  assetToFolderIsOver: monitor.isOver()
})

export const assetToFolderDragSource = (connect, monitor) => ({
  assetToFolderDrag: connect.dragSource(),
  assetToFolderDragPreview: connect.dragPreview(),
  assetToFolderIsDragging: monitor.isDragging()
})
