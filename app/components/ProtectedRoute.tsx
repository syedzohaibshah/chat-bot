import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { User } from 'firebase/auth';

interface ProtectedRouteProps {
  user: User | null;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return null; // or return a loading indicator
  }

  return <>{children}</>
}

export default ProtectedRoute