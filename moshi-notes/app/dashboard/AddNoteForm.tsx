// src/app/dashboard/AddNoteForm.tsx
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css'; // Import Quill CSS

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddNoteForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, user_id: user.id }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }

      setTitle('');
      setContent('');
      setError('');
      setSuccess(true);
    } catch (error) {
      setError('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <ReactQuill value={content} onChange={setContent} className="border p-2 rounded" />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Note added successfully!</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Note
      </button>
    </form>
  );
};

export default AddNoteForm;
