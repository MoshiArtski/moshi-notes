'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const NoteEditor = ({ user, initialNote, onNoteUpdated }) => {
  const [title, setTitle] = useState(initialNote ? initialNote.title : '');
  const [content, setContent] = useState(initialNote ? initialNote.content : '');
  const [tags, setTags] = useState(initialNote ? initialNote.tags?.join(', ') : '');
  const [date, setDate] = useState(initialNote ? initialNote.date : '');
  const [comments, setComments] = useState(initialNote ? initialNote.comments?.join('\n') : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
      setTags(initialNote.tags ? initialNote.tags.join(', ') : '');
      setDate(initialNote.date || '');
      setComments(initialNote.comments ? initialNote.comments.join('\n') : '');
    } else {
      setTitle('');
      setContent('');
      setTags('');
      setDate('');
      setComments('');
    }
  }, [initialNote]);

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      const noteData = {
        id: initialNote ? initialNote.id : undefined,
        title,
        content,
        user_id: user.id,
        tags: tags.split(',').map(tag => tag.trim()),
        date,
        comments: comments.split('\n'),
        parent_id: initialNote ? initialNote.parent_id : null,
      };

      const response = await fetch('/api/notes', {
        method: initialNote ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return;
      }

      setError('');
      setSuccess(true);

      const updatedNote = await response.json();
      onNoteUpdated(updatedNote);
    } catch (error) {
      setError('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-800 text-gray-100 border border-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Markdown Editor */}
      <MdEditor
        value={content}
        onChange={handleEditorChange}
        style={{ height: 'calc(100vh - 400px)', backgroundColor: '#1E1E1E', color: '#D4D4D4' }}
        renderHTML={(text) => text}
        config={{
          view: {
            menu: true,
            md: true,
            html: false,
          },
        }}
        className="flex-1 bg-gray-800 text-gray-100 border border-gray-700 rounded overflow-hidden"
      />

      {/* Tags */}
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="bg-gray-800 text-gray-100 border border-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Reminder/Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-gray-800 text-gray-100 border border-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Comments */}
      <textarea
        placeholder="Comments (one per line)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="bg-gray-800 text-gray-100 border border-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Note saved successfully!</p>}

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
        {initialNote ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteEditor;
