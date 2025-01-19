"use client"
import Link from 'next/link'
import { FaGithub,  FaLinkedin, FaWhatsapp, FaPhone} from 'react-icons/fa';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ContactPointer } from './ContactFollowing';

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
  }

 
const ContactListComponent = () => {

  return (
    <div className="min-h-screen w-full dark:bg-black to-background dark:bg-grid-small-white/[0.3] bg-grid-small-black/[0.3] text-white overflow-hidden">
      

      <div className="relative z-10">


        <main className="grid lg:grid-cols-2 gap-12 p-6 pt-12 max-w-7xl mx-auto">
          <div className="space-y-12">
            <h1 className="text-7xl font-sans font-bold">
              Connect Here<span className="align-super text-4xl">^</span>
            </h1>

            {/* Global Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                  🌍
                </div>
                <Link href="/" className='font-bold font-sans'>Proffernet</Link>
              </div>
              <blockquote className="text-2xl font-thin">
                &quot;Connect by using any of the given socials provided here.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
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
            icon={<FaLinkedin className="w-6 h-6 text-blue-500  " />}
            label="LinkedIn"
          />
          <SocialLink
            href="tel:+1234567890"
            icon={<FaPhone className="w-6 h-6 text-green-300" />}
            label="+1 (234) 567-890"
          />

            </div>
          </div>

          <div className="relative h-[600px] hidden lg:block">
           
               <ContactPointer/>
           
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