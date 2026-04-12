import conf from '../conf/conf.js';
import { createClient } from '@supabase/supabase-js';

export class AuthService {
    supabase;

    constructor() {
        this.supabase = createClient(conf.supabaseUrl, conf.supabaseAnonKey);
    }

    async createAccount({email, password, name}) {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name }
                }
            });
            if (error) throw error;
            return this.login({email, password});
			} catch (error) {
				throw error;
        }
    }

    async login({email, password}) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const { data: { user }, error } = await this.supabase.auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.log("Supabase auth :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.supabase.auth.signOut();
        } catch (error) {
            console.log("Supabase auth :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;