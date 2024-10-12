import { createClient } from '@/utils/supabase/server';

// Create a new Supabase client instance
const supabase = createClient();

export async function POST(req) {
  const { name, user_id, parent_id } = await req.json();

  // Insert new folder into the database
  const { data, error } = await supabase
    .from('folders')
    .insert([{ name, user_id, parent_id }]);

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
  const { id, name, parent_id } = await req.json();

  // Update the folder's name or parent folder
  const { data, error } = await supabase
    .from('folders')
    .update({ name, parent_id })
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

  // Delete the folder from the database
  const { error } = await supabase
    .from('folders')
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
