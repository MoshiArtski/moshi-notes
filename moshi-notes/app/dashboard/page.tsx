import { createClient } from '@/utils/supabase/server';
import DashboardClient from './DashboardClient';

const DashboardPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return <p className="text-center text-red-500">User not authenticated.</p>;
  }

  const { data: notes, error: notesError } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id);

  const { data: folders, error: foldersError } = await supabase
    .from('folders')
    .select('*')
    .eq('user_id', user.id);

  if (notesError || foldersError) {
    return <p className="text-center text-red-500">Error loading data.</p>;
  }

  return <DashboardClient user={user} initialNotes={notes} initialFolders={folders} />;
};

export default DashboardPage;
