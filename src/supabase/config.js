import conf from '../conf/conf.js';
import { createClient } from '@supabase/supabase-js';

export class Service {
    supabase;

    constructor() {
        this.supabase = createClient(conf.supabaseUrl, conf.supabaseAnonKey);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            const { data, error } = await this.supabase
                .from(conf.supabasePostsTable)
                .insert([{
                    title,
                    slug,
                    content,
                    featured_image: featuredImage,
                    status,
                    user_id: userId,
                }])
                .select();
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.log("Supabase service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const { data, error } = await this.supabase
                .from(conf.supabasePostsTable)
                .update({
                    title,
                    content,
                    featured_image: featuredImage,
                    status,
                })
                .eq('slug', slug)
                .select();
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.log("Supabase service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            const { error } = await this.supabase
                .from(conf.supabasePostsTable)
                .delete()
                .eq('slug', slug);
            if (error) throw error;
            return true;
        } catch (error) {
            console.log("Supabase service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const { data, error } = await this.supabase
                .from(conf.supabasePostsTable)
                .select('*')
                .eq('slug', slug)
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.log("Supabase service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(status = 'active') {
        try {
            const { data, error } = await this.supabase
                .from(conf.supabasePostsTable)
                .select('*')
                .eq('status', status);
            if (error) throw error;
            return data;
        } catch (error) {
            console.log("Supabase service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            const fileName = `${Date.now()}_${file.name}`;
            const { data, error } = await this.supabase.storage
                .from(conf.supabaseStorageBucket)
                .upload(fileName, file);
            if (error) throw error;
            return data;
        } catch (error) {
            console.log("Supabase service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileName) {
        try {
            const { error } = await this.supabase.storage
                .from(conf.supabaseStorageBucket)
                .remove([fileName]);
            if (error) throw error;
            return true;
        } catch (error) {
            console.log("Supabase service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileName) {
        const { data } = this.supabase.storage
            .from(conf.supabaseStorageBucket)
            .getPublicUrl(fileName);
        return data.publicUrl;
    }
}

const service = new Service();
export default service;