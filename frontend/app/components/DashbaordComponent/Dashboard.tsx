"use client";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  interface Project {
    id: string;
    title: string;
    description: string;
    created_at: string;
    files?: { file: string }[];
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const BASE_URL = "http://localhost:3000/pages";
  const handleButton = useCallback(
    (route: string) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10000);
      const fullUrl = `${BASE_URL}/${route}`;
      router.push(fullUrl);
    },
    [router]
  );


  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Get token from local storage
        const response = await axios.get(
          "http://localhost:8000/project/user-projects/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.projects) {
          setProjects(response.data.projects);
        }
        setLoading(false);
      } catch {
        router.push("/auth/login");
        setLoading(false);
      }
    };

    fetchUserProjects();
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
            <Spinner/>
        </div>
    );
  }


  if (projects.length === 0) {
    return (
      <div className="hidden flex-col md:flex bg-black h-[95vh] border-t dark:border-white/[0.2] border-transparent ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h2>
            <div className="flex items-center space-x-2"></div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4 text-white">
            <TabsList>
              <TabsTrigger
                value="overview"
                onClick={() => handleButton("dashboard")}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="contribute"
                className="cursor-pointer"
                onClick={() => handleButton("projectlist")}
              >
                Contribute
              </TabsTrigger>
              {loading && (
                <div className="h-screen w-full">
                  <Spinner/>
                </div>
              )}
              <TabsTrigger
                value="publish"
                onClick={() => handleButton("project")}
                className="cursor-pointer"
              >
                Publish
              </TabsTrigger>
              {loading && (
                <div className="h-screen w-full">
                  <Spinner/>
                </div>
              )}
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
                    <div className="text-2xl font-bold">0</div>
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
                    <div className="text-2xl font-bold">0</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 dark:border-white/[0.2] border-transparent border h-96 overflow-y-auto">
                  <CardHeader>
                    <CardTitle>Contributing Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-x-6 mt-10">
                      {/* Image stays on the left */}
                      <Image src="/Notfound1.png" alt="Notfound" width={200} height={50} className="w-50 h-30" />

                      {/* Text and button centered */}
                      <div className="flex flex-col items-center flex-1">
                        <h1 className="text-white font-sans mb-3 text-center font-bold">See Various Projects to Contribute</h1>
                        <Button label="Contribute" onClick={() => handleButton("projectlist")} />
                        {loading && (
                        <div className="h-screen w-full">
                          <Spinner/>
                        </div>
                      )}
                    </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-3 dark:border-white/[0.2] border-transparent border">
                <CardHeader className="flex items-center gap-x-6">
                    {/* Image on the left */}
                    <Image
                      src="/Notfound2.png"
                      alt="Notfound"
                      width={200}
                      height={50}
                      className="w-50 h-30"
                    />

                    {/* Centered text and button */}
                    <div className="flex flex-col items-center flex-1">
                      <h1 className="text-white font-sans mb-2 text-center font-bold">
                        Publish Your Projects
                      </h1>
                      <Button label="Publish" onClick={() => handleButton("project")} />
                    </div>
                    {loading && (
                      <div className="h-screen w-full">
                        <Spinner/>
                      </div>
                    )}
                  </CardHeader>


                  <CardContent>
                    <ul className="space-y-2">
                      {projects.map((project) => (
                        <li
                          key={project.id}
                          className="flex items-start space-x-2"
                        >
                          <span className="text-white mt-2">
                            <GoDotFill />
                          </span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center flex-1">
                              <span className="font-medium">
                                {project.title}
                              </span>
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
                            <p className="text-sm text-gray-400 mt-1">
                              {project.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden flex-col md:flex bg-black h-[95vh] border-t dark:border-white/[0.2] border-transparent ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h2>
            <div className="flex items-center space-x-2"></div>
          </div>
          <Tabs defaultValue="contribute" className="space-y-4 text-white">
            <TabsList>
              <TabsTrigger
                value="contribute"
                className="cursor-pointer font-bold"
                onClick={() => handleButton("projectlist")}
              >
                Contribute
              </TabsTrigger>
              <TabsTrigger
                value="publish"
                onClick={() => handleButton("project")}
                className="cursor-pointer font-bold"
              >
                Publish
              </TabsTrigger>
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
                    <div className="text-2xl font-bold">0</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 dark:border-white/[0.2] border-transparent border h-[calc(70vh-100px)]  overflow-y-auto">
                  <CardHeader>
                    <CardTitle>Contributing Projects</CardTitle>
                  </CardHeader>

                </Card>
                <Card className="col-span-3 dark:border-white/[0.2] border-transparent border h-[calc(70vh-100px)] overflow-y-auto">
                  <CardHeader>
                    <CardTitle>Published Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>

              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
