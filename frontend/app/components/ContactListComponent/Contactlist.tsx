"use client"
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useToast } from "@/lib/use-toast";
import { ToastProvider } from '../ui/toast';
import { Toaster } from '../ui/toaster';

interface SocialLinkProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isButton?: boolean;
}

interface SocialDetails {
  username: string;
  whatsapp_group_url: string;
  linkedin_url: string;
  github_url: string;
  whatsapp_number: string;
}

const ContactListComponent = () => {
  const [socialDetails, setSocialDetails] = useState<SocialDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const {toast} = useToast();

  const handleCopyWhatsApp = async () => {
    if (socialDetails?.whatsapp_number) {
      try {
        await navigator.clipboard.writeText(socialDetails.whatsapp_number);
        toast({
          title: "Copied",
          description: "WhatsApp number copied to clipboard",
          variant:"default"
        });
      } catch {
        toast({
          title: "Failed to copy",
          description: "Could not copy the WhatsApp number to clipboard.",
          variant:"default"
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        
        if (!accessToken) {
          setError("No access token found. Please login.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/app/social-details/get/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
        setSocialDetails(response.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || "Error fetching social details");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-white">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full dark:bg-black to-background dark:bg-grid-small-white/[0.3] bg-grid-small-black/[0.3] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-gray-500/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-gray-600/30 to-transparent rounded-full blur-3xl" />
      <div className="relative z-10">
        <main className="flex justify-center items-center min-h-screen">
          <div className="space-y-12 p-6 mb-[10rem] max-w-xl w-full">
            <h1 className="text-7xl font-sans font-bold text-center mr-[20rem]">
              Socials
            </h1>

            <div className="space-y-6">
              <div className="flex items-center gap-2 justify-center mr-[25rem]">
                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                </div>
                <Link href="/" className='font-bold font-sans'>Proffernet</Link>
              </div>
              <div className="flex items-center gap-4 justify-center mr-[25rem]">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <div>
                  <p className="font-medium">{socialDetails?.username}</p>
                  <p className="text-sm text-gray-400">Proposer</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {socialDetails?.whatsapp_group_url && (
                <SocialLink
                  href={socialDetails.whatsapp_group_url}
                  icon={<FaWhatsapp className="w-6 h-6 text-green-500" />}
                  label="WhatsApp Group"
                />
              )}
              {socialDetails?.whatsapp_number && (
                <SocialLink
                  icon={<FaPhone className="w-6 h-6 text-green-500" />}
                  label="Phone Number"
                  onClick={handleCopyWhatsApp}
                  isButton={true}
                />
              )}
              {socialDetails?.github_url && (
                <SocialLink
                  href={socialDetails.github_url}
                  icon={<FaGithub className="w-6 h-6" />}
                  label="GitHub"
                />
              )}
              {socialDetails?.linkedin_url && (
                <SocialLink
                  href={socialDetails.linkedin_url}
                  icon={<FaLinkedin className="w-6 h-6 text-blue-500" />}
                  label="LinkedIn"
                />
              )}
            </div>
          </div>
        </main>
      </div>
      <ToastProvider>
          <Toaster/>
        </ToastProvider>
    </div>
  );
};

function SocialLink({ href, icon, label, onClick, isButton = false }: SocialLinkProps) {
  const commonClasses = "flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ease-in-out dark:border-white/[0.2] border-transparent border transform hover:scale-105 bg-background cursor-pointer";

  if (isButton) {
    return (
      <button
        onClick={onClick}
        className={commonClasses}
      >
        <div className="rounded-full w-[1rem]">{icon}</div>
        <span className="text-white font-semibold">{label}</span>
      </button>
    );
  }

  return (
    <Link
      href={href || '#'}
      className={commonClasses}
    >
      <div className="rounded-full w-[1rem]">{icon}</div>
      <span className="text-white font-semibold">{label}</span>
    </Link>
  );
}

export default ContactListComponent;