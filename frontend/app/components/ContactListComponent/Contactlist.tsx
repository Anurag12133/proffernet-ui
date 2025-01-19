"use client"
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const ContactListComponent = () => {
  return (
    <div className="min-h-screen w-full dark:bg-black to-background dark:bg-grid-small-white/[0.3] bg-grid-small-black/[0.3] text-white overflow-hidden relative">

    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-gray-500/30 to-transparent rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-gray-600/30 to-transparent rounded-full blur-3xl" />
      <div className="relative z-10">
        <main className="flex justify-center items-center min-h-screen">
          <div className="space-y-12 p-6  mb-[10rem] max-w-xl w-full">
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
                  <p className="font-medium">Arther</p>
                  <p className="text-sm text-gray-400">Proposer</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <SocialLink
                href="https://wa.me/1234567890"
                icon={<FaWhatsapp className="w-6 h-6 text-green-500" />}
                label="WhatsApp"
              />
              <SocialLink
                href="https://github.com/johndoe"
                icon={<FaGithub className="w-6 h-6" />}
                label="GitHub"
              />
              <SocialLink
                href="https://www.linkedin.com/in/johndoe"
                icon={<FaLinkedin className="w-6 h-6 text-blue-500" />}
                label="LinkedIn"
              />
              <SocialLink
                href="tel:+1234567890"
                icon={<FaPhone className="w-6 h-6 text-green-300" />}
                label="+1 (234) 567-890"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ease-in-out dark:border-white/[0.2] border-transparent border transform hover:scale-105 bg-background"
    >
      <div className="rounded-full w-[1rem]">{icon}</div>
      <span className="text-white font-semibold">{label}</span>
    </Link>
  )
}

export default ContactListComponent;