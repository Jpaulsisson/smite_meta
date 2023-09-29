import { createClient } from '@supabase/supabase-js'


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
      })
      if(data) console.log(data);
      if(error) console.log(error);
    } 

    export const signInWithThirdParty = async (provider) => {
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      })
      console.log(data);
      if (error) {
        console.log(error.message);
      }
    }

    export const signOut = async () => {
      
      let { error } = await supabase.auth.signOut()

    }

  module.exports = {
    supabase,
    authStateChangeListener,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithThirdParty,
    signOut
  }
