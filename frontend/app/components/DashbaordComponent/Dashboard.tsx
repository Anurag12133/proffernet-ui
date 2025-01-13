"use client";
import { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaProjectDiagram } from "react-icons/fa";
import Overview from "../DashbaordComponent/Overview";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  const router = useRouter();
  const BASE_URL = "http://localhost:3000/pages";
  const handleButton = useCallback(
    (route: string) => {
      const fullUrl = `${BASE_URL}/${route}`;
      router.push(fullUrl);
    },
    [router]
  );
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
              <TabsTrigger
                value="publish"
                onClick={() => handleButton("project")}
                className="cursor-pointer"
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
                    <div className="text-2xl font-bold">$45,231.89</div>
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
                    <div className="text-2xl font-bold">+2350</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 dark:border-white/[0.2] border-transparent border h-96 overflow-y-auto">
                  <CardHeader>
                    <CardTitle>Contributing Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3 dark:border-white/[0.2] border-transparent border">
                  <CardHeader>
                    <CardTitle>Published Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {" "}
                    <Overview />
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
