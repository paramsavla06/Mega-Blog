const conf = {
    supabaseUrl: String(import.meta.env.VITE_SUPABASE_URL),
    supabaseAnonKey: String(import.meta.env.VITE_SUPABASE_ANON_KEY),
    supabaseStorageBucket: "blog-uploads",
    supabasePostsTable: "posts",
}

export default conf