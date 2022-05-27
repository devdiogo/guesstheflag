import { Header } from '..'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black text-white">
      <Header />
      {children}
    </div>
  )
}
