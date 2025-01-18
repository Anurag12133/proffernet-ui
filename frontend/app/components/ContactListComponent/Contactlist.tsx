import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Phone, PhoneIcon as WhatsApp } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    gradient: string;
  }
const ContactListComponent = () => {

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      <div
        className="fixed inset-0 bg-gradient-to-tr from-black via-black to-[#39FF14] opacity-80"
        style={{
          backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-88dc803448c6ff96b232f8deed33fbb1-E1oe9z7vtCvAlbKwzadwIVhjj9RETO.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}
      />

      <div className="relative z-10">


        <main className="grid lg:grid-cols-2 gap-12 p-6 pt-12 max-w-7xl mx-auto">
          <div className="space-y-12">
            <h1 className="text-7xl font-serif">
              Connect with me<span className="align-super text-4xl">^</span>
            </h1>

            {/* Global Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                  🌍
                </div>
                <span>Proffernet</span>
              </div>
              <blockquote className="text-2xl font-light leading-relaxed">
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

            <div className="flex gap-4">
            <SocialLink
            href="https://wa.me/1234567890"
            icon={<WhatsApp className="w-6 h-6" />}
            label="WhatsApp"
            gradient="from-green-400 to-green-600"
          />
          <SocialLink
            href="https://github.com/johndoe"
            icon={<Github className="w-6 h-6" />}
            label="GitHub"
            gradient="from-gray-600 to-gray-800"
          />
          <SocialLink
            href="https://www.linkedin.com/in/johndoe"
            icon={<Linkedin className="w-6 h-6" />}
            label="LinkedIn"
            gradient="from-blue-400 to-blue-600"
          />
          <SocialLink
            href="tel:+1234567890"
            icon={<Phone className="w-6 h-6" />}
            label="+1 (234) 567-890"
            gradient="from-yellow-400 to-orange-600"
          />

            </div>
          </div>

          <div className="relative h-[600px] hidden lg:block">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-2xl overflow-hidden"
                style={{
                  width: '200px',
                  height: '250px',
                  top: `${Math.sin(i * 0.8) * 100 + 150}px`,
                  right: `${Math.cos(i * 0.8) * 100 + 150}px`,
                  transform: `rotate(${i * 5}deg)`,
                  zIndex: i,
                }}
              >
                <Image
                  src="/"
                  alt={`Creator ${i + 1}`}
                  width={200}
                  height={250}
                  className="w-full h-full object-cover grayscale bg-white"
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}


function SocialLink({ href, icon, label, gradient }: SocialLinkProps) {
    return (
      <Link
        href={href}
        className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r ${gradient}`}
      >
        <div className="bg-white p-2 rounded-full">{icon}</div>
        <span className="text-white font-semibold">{label}</span>
      </Link>
    )
  }



    export default ContactListComponent;