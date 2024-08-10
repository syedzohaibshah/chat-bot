import { useRouter } from "next/navigation"
const ProtectedRoute = ({children, user}) => {
  const router = useRouter()
  return user ? children : router.push('/')
}
export default ProtectedRoute