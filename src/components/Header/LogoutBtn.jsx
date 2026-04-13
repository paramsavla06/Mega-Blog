import { useDispatch } from "react-redux"
import authService from "../../supabase/auth"
import { logout } from "../../store/authSlice"

export default function LogoutBtn() {
	const dispath = useDispatch()
	const logoutHandler = () => {
		authService.logout().then(() => {
			dispath(logout())
		})
	}
	return(
		<button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer"
		onClick={logoutHandler}>
			Logout
		</button>
	)
}