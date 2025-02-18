"use client";
import { useSearchParams } from "next/navigation";
import ContactListComponent from "@/app/components/ContactListComponent/Contactlist";
import { Suspense } from "react";

const ContactListContent = () => {
  const searchParams = useSearchParams();
  const projectTitle = searchParams.get("project_title");

  if (!projectTitle) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-white">Project title is missing!</p>
      </div>
    );
  }

  return (
    <div>
      <ContactListComponent projectTitle={projectTitle} />
    </div>
  );
};

const ContactList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactListContent />
    </Suspense>
  );
};

export default ContactList;