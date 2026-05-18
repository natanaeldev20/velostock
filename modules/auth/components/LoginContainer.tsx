import Image from 'next/image'
import { LoginForm } from './LoginForm'

export function LoginContainer() {
  return (
    <section className="w-full md:h-dvh grid grid-cols-1 md:grid-cols-2">
      <div className="bg-indigo-600 rounded-b-2xl flex items-center justify-center md:rounded-b-none">
        <div className="text-center py-6 flex flex-col gap-2">
          <figure className="flex flex-col items-center justify-center">
            <Image
              alt="Velostock"
              src="/logo-velostock.png"
              width={1183}
              height={700}
              loading="eager"
              className="w-40 md:w-60"
            />
            <h1 className="text-white text-4xl font-extrabold md:text-5xl lg:text-6xl">
              Velostock
            </h1>
          </figure>
          <p className="text-white text-lg md:text-xl">
            Que bueno tenerte de vuelta ;)
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-10 md:px-0 md:py-0">
        <LoginForm />
      </div>
    </section>
  )
}
