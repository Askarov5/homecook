import Image from 'next/image'

export default function ContactHeader() {
  return (
    <section className="bg-green-800 text-white py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">We&apos;re Here to Help!</h1>
          <p className="text-xl">Have questions or need assistance? Reach out to us anytime.</p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/chef-support.svg"
            alt="Chef with phone"
            width={300}
            height={300}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}

