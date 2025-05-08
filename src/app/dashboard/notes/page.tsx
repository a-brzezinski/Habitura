import { Metadata } from "next";
import { Suspense } from "react";

import { CreateNoteDialog } from "@/components/dialogs/notes/CreateNoteDialog";
import { NotesList } from "@/components/pages/Notes/NotesList";
import { PageHeading } from "@/components/shared/PageHeading";
import { Spinner } from "@/components/shared/Spinner";

export const metadata: Metadata = {
  title: "Notes",
};

export default function Notes() {
  return (
    <>
      <PageHeading>Notes</PageHeading>
      <p className="pt-2 text-sm">Your notes will be displayed here.</p>
      <p className="text-sm">You can create, edit, and delete notes.</p>
      <CreateNoteDialog />
      <Suspense fallback={<Spinner />}>
        <NotesList />
      </Suspense>
    </>
  );
}


