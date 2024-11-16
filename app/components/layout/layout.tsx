import Navbar from "./navbar"
import Footer from "./footer"

interface LayoutProps {
  children: React.ReactNode
  userType?: "mentor" | "mentee"
  hideFooter?: boolean
}

export default function Layout({ children, userType, hideFooter = false }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userType={userType} />
      <main className="flex-1 pt-16">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
} 