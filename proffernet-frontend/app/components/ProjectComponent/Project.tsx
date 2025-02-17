"use client";
import React, { useCallback } from "react";
import UploadFile from "@/app/components/ProjectComponent/ProjectFile";
import { BackgroundBeams } from "@/app/components/ui/background-beams";
import EditableTitle from "@/app/components/ProjectComponent/ProjectTitle";
import Button from "@/app/components/Buttons/Button";
import ProjectStack from "@/app/components/ProjectComponent/ProjectStack";
import { ProjectProvider, useProjectContext } from "@/contexts/projectcontext";
import ProjectDescription from "@/app/components/ProjectComponent/ProjectDescription";
import { useRouter } from "next/navigation";
import ProjectDropDown from "@/app/components/ProjectComponent/ProjectDropDown";
import { Toaster } from "../ui/toaster";
import { ToastProvider } from "@/app/components/ui/toast";

interface SubmitButtonProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleSubmit = async (
  handleSave: () => Promise<void>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: ReturnType<typeof useRouter>
) => {
  setLoading(true);
  await handleSave()
    .then(() => {
      router.push("/pages/socials");
    })
    .catch((error) => {
      console.error("Error saving project:", error);
    })
    .finally(() => {
      setLoading(false);
    });
};

const SubmitButton = ({ loading, setLoading }: SubmitButtonProps) => {
  const { handleSave } = useProjectContext();
  const router = useRouter();

  const onClick = useCallback(async () => {
    try {
      await handleSubmit(handleSave, setLoading, router);
    } catch  {
      console.error("Error saving project");
    }
  }, [handleSave, setLoading, router]);

  return <Button label={loading ? "Saving..." : "Submit"} onClick={onClick} />;
};

const ProjectPublish = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <ProjectProvider>
      <div className="grid grid-cols-4 h-screen bg-black p-4 relative">
        <BackgroundBeams />

        <div className="col-span-3 flex flex-col rounded-xl p-6 overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <EditableTitle />
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                <div className="loader"></div>
              </div>
            )}
            <SubmitButton loading={loading} setLoading={setLoading} />
          </div>
          <div className="ml-[6rem] m-4">
            <ProjectDropDown />
          </div>

          <div className="rounded-lg p-4 h-full ml-20 text-white">
            <ProjectStack />
            <ProjectDescription />
          </div>
        </div>

        <div className="absolute top -0 bottom-0 left-[74%] w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent z-0" />

        <div
          className="col-span-1 rounded-xl p-4 overflow-y-auto mt-10"
          style={{ maxHeight: "100vh" }}
        >
          <UploadFile />
        </div>
      </div>
      <ToastProvider>
          <Toaster/>
        </ToastProvider>
    </ProjectProvider>
  );
};

export default ProjectPublish;
