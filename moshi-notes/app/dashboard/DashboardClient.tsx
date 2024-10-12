'use client';

import React, { useState } from 'react';
import NoteTree from './NoteTree';
import NoteEditor from './NoteEditor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DashboardClient = ({ user, initialNotes, initialFolders }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [folders, setFolders] = useState(initialFolders);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const handleCreateFolder = async (name, parentId) => {
    const tempFolder = {
      id: Date.now(),
      name,
      parent_id: parentId,
      user_id: user.id,
      isTemporary: true,
    };

    setFolders((prevFolders) => [...prevFolders, tempFolder]);

    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, user_id: user.id, parent_id: parentId }),
      });

      const newFolder = await response.json();
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === tempFolder.id ? newFolder : folder
        )
      );
    } catch (error) {
      console.error('Error creating folder:', error);
      setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== tempFolder.id));
    }
  };

  const handleMoveNote = async (noteId, newFolderId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === noteId ? { ...note, folder_id: newFolderId } : note))
    );

    try {
      await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder_id: newFolderId }),
      });
    } catch (error) {
      console.error('Error moving note:', error);
    }
  };

  const handleMoveFolder = async (folderId, newParentFolderId) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId ? { ...folder, parent_id: newParentFolderId } : folder
      )
    );

    try {
      await fetch(`/api/folders/${folderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parent_id: newParentFolderId }),
      });
    } catch (error) {
      console.error('Error moving folder:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-screen bg-dark-gray flex flex-col">
        <header className="flex justify-between items-center py-3 px-4 bg-gray-900 shadow-md w-full">
          <h1 className="text-xl text-white">Dynalist-like Notes with Drag-and-Drop</h1>
          <div className="flex items-center">
            <span className="text-gray-400">Welcome, {user.email}</span>
            <img
              src={`https://www.gravatar.com/avatar/${user.email}?d=identicon`}
              alt="User Avatar"
              className="ml-2 w-8 h-8 rounded-full"
            />
          </div>
        </header>
        <main className="flex flex-1 overflow-hidden">
          <aside className="w-1/4 bg-gray-800 p-3 overflow-y-auto">
            <NoteTree
              notes={notes}
              folders={folders}
              onNoteSelect={handleNoteSelect}
              onCreateFolder={handleCreateFolder}
              onMoveNote={handleMoveNote}
              onMoveFolder={handleMoveFolder}
            />
          </aside>
          <section className="w-3/4 bg-gray-900 p-3 overflow-auto">
            {selectedNote ? (
              <NoteEditor user={user} initialNote={selectedNote} />
            ) : (
              <p className="text-gray-400 text-center">Select a note to view or edit</p>
            )}
          </section>
        </main>
      </div>
    </DndProvider>
  );
};

export default DashboardClient;
