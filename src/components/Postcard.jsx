import supabaseService from "../supabase/config";
import { Link } from "react-router-dom";

export default function Postcard({
	slug, title, featured_image
}) {
	return(
		<Link to={`/post/${slug}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4">
				<div className="w-full justify-center mb-4">
					<img 
						src={supabaseService.getFilePreview(featured_image)} 
						alt={title}
						className="rounded-xl" 
					/>
				</div>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
		</Link>
	)
}