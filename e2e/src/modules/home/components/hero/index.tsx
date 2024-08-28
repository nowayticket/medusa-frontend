import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-8 gap-6 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
        <Heading level="h1" className="text-4xl leading-10 font-bold">
          Welcome to Chill Samurai Store
        </Heading>
        <Heading level="h2" className="text-2xl leading-10 font-normal">
          Your one-stop shop for all things awesome
        </Heading>
        <Button variant="primary" className="mt-4">
          Shop Now
        </Button>
       
      </div>
      <Image src="/path/to/your/image.jpg" alt="Hero Image" layout="fill" objectFit="cover" />
    </div>
  )
}

export default Hero
