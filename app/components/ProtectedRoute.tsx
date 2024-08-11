import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode;
  user: boolean; 
}

const ProtectedRoute = ({ children, user }: ProtectedRouteProps) => {
  const router = useRouter()

  return user ? children : router.push('/')
}

export default ProtectedRoute