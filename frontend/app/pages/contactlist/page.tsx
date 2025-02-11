"use client";
import { useSearchParams } from "next/navigation";
import ContactListComponent from "@/app/components/ContactListComponent/Contactlist";

const ContactList = () => {
  const searchParams = useSearchParams();
  const projectTitle = searchParams.get("project_title"); // Get project_title from URL

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

export default ContactList;
