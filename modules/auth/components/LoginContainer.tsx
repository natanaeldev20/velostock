import { LoginForm } from './LoginForm'
import { Box } from '@gravity-ui/icons'

export function LoginContainer() {
  return (
    <section className="w-full md:h-dvh grid grid-cols-1 md:grid-cols-2">
      <div className="bg-indigo-600 rounded-b-2xl flex items-center justify-center md:rounded-b-none">
        <div className="text-center py-6 flex flex-col gap-6 md:gap-2">
          <div className="flex gap-1 md:gap-0 md:flex-col items-center justify-center">
            <Box className="size-8 md:size-15" />
            <h1 className="text-white text-3xl font-extrabold md:text-5xl lg:text-6xl">
              Velostock
            </h1>
          </div>
          <p className="text-white text-lg font-bold md:text-xl">
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
