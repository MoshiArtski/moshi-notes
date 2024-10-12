import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, FolderPlus, FolderMinus } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd'; // Drag and drop
import { Menu, MenuItem, ContextMenuTrigger, ContextMenu } from 'react-contextmenu'; // Context Menu

const ItemTypes = {
  NOTE: 'note',
  FOLDER: 'folder',
};

const NoteTree = ({
  notes,
  folders,
  onNoteSelect,
  onMoveNote,
  onMoveFolder,
  onCreateFolder,
  onRenameItem,
  onDeleteItem
}) => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [contextMenuTarget, setContextMenuTarget] = useState(null);

  // Toggle folder open/close
  const toggleFolder = (folderId) => {
    setExpandedFolders((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId],
    }));
  };

  // Drag and drop logic for folders and notes
  const [, dragNoteRef] = useDrag({
    type: ItemTypes.NOTE,
    item: (note) => ({ id: note.id }),
  });

  const [, dragFolderRef] = useDrag({
    type: ItemTypes.FOLDER,
    item: (folder) => ({ id: folder.id }),
  });

  const [, dropFolderRef] = useDrop({
    accept: [ItemTypes.NOTE, ItemTypes.FOLDER],
    drop: (draggedItem, monitor) => {
      const droppedFolderId = contextMenuTarget.id;

      if (monitor.getItemType() === ItemTypes.NOTE) {
        onMoveNote(draggedItem.id, droppedFolderId); // Move note to the folder
      } else if (monitor.getItemType() === ItemTypes.FOLDER) {
        onMoveFolder(draggedItem.id, droppedFolderId); // Make a folder a subfolder
      }
    },
  });

  const renderTree = (parentId = null, depth = 0) => {
    const childFolders = folders.filter((folder) => folder.parent_id === parentId);
    const childNotes = notes.filter((note) => note.folder_id === parentId);

    return (
      <>
        {childFolders.map((folder) => {
          const isExpanded = expandedFolders[folder.id];

          return (
            <ContextMenuTrigger id={`folder-${folder.id}`} key={folder.id}>
              <div
                ref={(node) => {
                  dragFolderRef(node);
                  dropFolderRef(node); // Allow folders and notes to be dropped here
                }}
                style={{ marginLeft: `${depth * 16}px` }}
                className="folder-item flex items-center cursor-pointer p-2 hover:bg-gray-700 rounded"
                onClick={() => toggleFolder(folder.id)}
                onContextMenu={(e) => setContextMenuTarget({ ...folder, type: 'folder' })}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <FolderMinus size={16} className="mr-2 text-blue-400" />
                <span className="text-sm font-medium text-white">{folder.name}</span>
              </div>
              {isExpanded && renderTree(folder.id, depth + 1)}
            </ContextMenuTrigger>
          );
        })}

        {childNotes.map((note) => (
          <ContextMenuTrigger id={`note-${note.id}`} key={note.id}>
            <div
              ref={dragNoteRef}
              style={{ marginLeft: `${depth * 16}px` }}
              className="note-item flex items-center cursor-pointer p-2 hover:bg-gray-700 rounded"
              onClick={() => onNoteSelect(note)}
              onContextMenu={(e) => setContextMenuTarget({ ...note, type: 'note' })}
            >
              <File size={16} className="mr-2 text-gray-400" />
              <span className="text-sm text-gray-300">{note.title}</span>
            </div>
          </ContextMenuTrigger>
        ))}
      </>
    );
  };

  const handleCreateFolder = (parentId) => {
    const newFolderName = prompt('Enter folder name:');
    if (newFolderName && newFolderName.trim()) {
      onCreateFolder(newFolderName, parentId);
    }
  };

  const handleRename = () => {
    const newName = prompt('Enter new name:');
    if (newName && newName.trim()) {
      onRenameItem(contextMenuTarget.id, newName, contextMenuTarget.type);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDeleteItem(contextMenuTarget.id, contextMenuTarget.type);
    }
  };

  return (
    <div className="note-tree bg-gray-800 text-white rounded-lg p-4 overflow-y-auto h-full">
      <button
        onClick={() => handleCreateFolder(null)}
        className="bg-blue-500 text-white py-1 px-3 mb-2 rounded hover:bg-blue-600"
      >
        + New Folder
      </button>
      {renderTree()}

      {/* Context Menu for Folders */}
      <ContextMenu id={`folder-${contextMenuTarget?.id}`} className="bg-gray-900 text-white">
        <MenuItem onClick={() => handleCreateFolder(contextMenuTarget?.id)}>Create Subfolder</MenuItem>
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </ContextMenu>

      {/* Context Menu for Notes */}
      <ContextMenu id={`note-${contextMenuTarget?.id}`} className="bg-gray-900 text-white">
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </ContextMenu>
    </div>
  );
};

export default NoteTree;
