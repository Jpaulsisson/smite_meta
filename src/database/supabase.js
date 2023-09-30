import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation';


const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_KEY

// Create a single supabase client for interacting with your database
  export const supabase = createClient(url, key);

  export const authStateChangeListener = () => {
    const response = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    });
    return response;
    }    

    export const signUpWithEmailAndPassword = async (email, password) => {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if(data) console.log(data);
      if(error) console.error(error);
    }

    export const signInWithEmailAndPassword = async (email, password) => {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      }, {redirectTo: 'http://localhost:3000'});
      if (error) alert(`That email and password combo doesn't exist in our database`)
    } 

    export const signInWithThirdParty = async (provider) => {
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      }, {redirectTo: 'http://localhost:3000'});
      console.log(data);
      if (error) {
        console.log(error.message);
      }
    }

    export const signOut = async () => {
      let { error } = await supabase.auth.signOut()
    }

    export const getUser = async () => {
      let { data } = await supabase.auth.getUser()
      return data;
    }


  module.exports = {
    supabase,
    authStateChangeListener,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithThirdParty,
    signOut,
    getUser
  }
