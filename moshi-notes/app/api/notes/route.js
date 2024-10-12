import { createClient } from '@/utils/supabase/server';

// Create a new Supabase client instance
const supabase = createClient();

export async function POST(req) {
  const { title, content, folder_id, user_id } = await req.json();

  // Insert a new note into the database
  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, content, folder_id, user_id }]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data[0]), {
    status: 201,
  });
}

export async function PATCH(req) {
  const { id, title, content, folder_id } = await req.json();

  // Update the note's title, content, or folder
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content, folder_id })
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data[0]), {
    status: 200,
  });
}

export async function DELETE(req) {
  const { id } = await req.json();

  // Delete the note from the database
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
