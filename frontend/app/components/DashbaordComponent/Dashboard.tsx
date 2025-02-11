"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaProjectDiagram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { useCallback, useEffect, useState } from "react";
import Spinner from "@/app/components/SpinnerComponent/Spinner";
import Image from "next/image";
import axios from "axios";
import Button from "../Buttons/Button";

export default function DashboardPage() {
  interface Project {
    id: string;
    title: string;
    description: string;
    files?: { file: string }[];
  }

  interface Contribution {
    project_details: Project;
    id: string;
    project: Project;
    contribution_type: string[];
    contributed_at: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleButton = useCallback(
    (route: string) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10000);
      const fullUrl = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/pages/${route}`;
      router.push(fullUrl);
    },
    [router]
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Fetch user projects
        const projectsResponse = await axios.get(
          "http://127.0.0.1:8000/project/user-projects/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch user contributions
        const contributionsResponse = await axios.get(
          "http://127.0.0.1:8000/project/contributions/user/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (projectsResponse.data.projects) {
          setProjects(projectsResponse.data.projects);
        }

        if (contributionsResponse.data) {
          setContributions(contributionsResponse.data);
        }

        setLoading(false);
      } catch  {
        router.push("/login");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getFirstImageUrl = (files: { file: string }[] | string[]) => {
    if (!files || files.length === 0) return null;

    const file = files[0];
    if (typeof file === "object" && file?.file) {
      return `http://127.0.0.1:8000${
        file.file.startsWith("/") ? file.file : `/${file.file}`
      }`;
    } else if (typeof file === "string") {
      return `http://127.0.0.1:8000${file.startsWith("/") ? file : `/${file}`}`;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-black">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="hidden flex-col md:flex bg-black h-[95vh] border-t dark:border-white/[0.2] border-transparent ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4 text-white">
          <TabsList>
            <TabsTrigger value="contribute" onClick={() => handleButton("projectlist")}>Contribute</TabsTrigger>
            <TabsTrigger value="publish" onClick={() => handleButton("project")}>Publish</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="dark:border-white/[0.2] border-transparent border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Published Projects
                  </CardTitle>
                  <FaProjectDiagram className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                </CardContent>
              </Card>
              <Card className="dark:border-white/[0.2] border-transparent border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Contributing Projects
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contributions.length}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 dark:border-white/[0.2] border-transparent border h-[calc(70vh-100px)] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Contributing Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {contributions.length === 0 ? (
                    <div className="flex items-center gap-x-6 mt-10">
                      <Image src="/Notfound1.png" alt="Notfound" width={200} height={50} className="w-50 h-30" />
                      <div className="flex flex-col items-center flex-1">
                        <h1 className="text-white font-sans mb-3 text-center font-bold">See Various Projects to Contribute</h1>
                        <Button label="Contribute" onClick={() => handleButton("projeclist")} />
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {contributions.map((contribution) => {
                        return (
                          <li key={contribution.id} className="flex items-start space-x-2">
                            <span className="text-white mt-2">
                              <GoDotFill />
                            </span>
                            <div className="flex-1">
                              <div className="flex justify-between items-center flex-1">
                                <span className="font-medium">
                                  {contribution.project_details?.title || "Untitled Project"} {/* Display project title */}
                                </span>
                                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gray-200">
                                  {contribution.project_details?.files && contribution.project_details.files.length > 0 ? (
                                    <Image
                                      src={contribution.project_details.files[0].file} // Use the first file as the image
                                      alt={contribution.project_details.title || "Project Image"}
                                      layout="fill"
                                      objectFit="cover"
                                      className="rounded-full"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-sm">
                                      {contribution.project_details?.title?.charAt(0)?.toUpperCase() || "N/A"} {/* Fallback for missing files */}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-400 mt-1">
                                Contribution Types: {contribution.contribution_type?.join(", ") || "No types specified"}
                              </p>
                              <p className="text-sm text-gray-400 mt-1">
                                Contributed At: {new Date(contribution.contributed_at).toLocaleDateString() || "Unknown date"}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </CardContent>
              </Card>
              <Card className="col-span-3 dark:border-white/[0.2] border-transparent border h-[calc(70vh-100px)] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Published Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <div className="flex items-center gap-x-6 mt-10">
                      <Image src="/Notfound2.png" alt="Notfound" width={200} height={50} className="w-50 h-30" />
                      <div className="flex flex-col items-center flex-1">
                        <h1 className="text-white font-sans mb-3 text-center font-bold">No Published Projects Found</h1>
                        <Button label="Publish Project" onClick={() => handleButton("project")} />
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {projects.map((project) => (
                        <li key={project.id} className="flex items-start space-x-2">
                          <span className="text-white mt-2">
                            <GoDotFill />
                          </span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center flex-1">
                              <span className="font-medium">{project.title}</span>
                              <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gray-200">
                                {project.files && project.files.length > 0 ? (
                                  <Image
                                    src={getFirstImageUrl(project.files) || ""}
                                    alt={project.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-sm">
                                    {project.title.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}