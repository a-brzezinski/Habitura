import { NoteViewDialog } from "@/components/dialogs/notes/NoteViewDialog";
import { InlineMessage } from "@/components/shared/InlineMessage";
import { getUserNotes } from "@/lib/prisma/notes";

export const NotesList = async () => {
  try {
    const notes = await getUserNotes();
    if (notes.length === 0) {
      return <InlineMessage variant="info">No notes found.</InlineMessage>;
    }
    return (
      <ul className="mt-10 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {notes.map(note => (
          <li key={note.id}>
            <NoteViewDialog note={note} />
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    const err = error as Error;
    return <InlineMessage variant="error">{err.message}</InlineMessage>;
  }
};
