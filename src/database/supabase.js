import { createClient } from '@supabase/supabase-js'


const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_KEY

// Create a single supabase client for interacting with your database
  export const supabase = createClient(url, key);

  ///// AUTH SECTION /////

  // Auth state listener //
  export const authStateChangeListener = () => {
    const response = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    });
    return response;
    }    

  // Sign UP with email and password //
  export const signUpWithEmailAndPassword = async (email, password) => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if(data) console.log(data);
    if(error) console.error(error);
  }

  // Sign IN with email and password
  export const signInWithEmailAndPassword = async (email, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    }, {redirectTo: 'http://localhost:3000'});
    if (error) alert(`That email and password combo doesn't exist in our database`)
  } 

  // Sign in with google, facebook, or discord //
  export const signInWithThirdParty = async (provider) => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    }, {redirectTo: 'http://localhost:3000'});
    if (error) {
      console.log(error.message);
    }
  }

  // Sign out current user //
  export const signOut = async () => {
    let { error } = await supabase.auth.signOut()
  }

  // Get current user info //
  export const getUser = async () => {
    let { data } = await supabase.auth.getUser()
    return data;
  }

  ///// END OF AUTH /////
  ///// ///// ///// /////
  ///// GET FROM SUPABASE SECTION /////

  // Get all gods data //
  export const getGods = async () => {
    let { data: gods, error } = await supabase
    .from('gods')
    .select('*');

    if(gods) return gods;
    if(error) alert('something went wrong. Try hitting refresh');
  }

  // Get all items data //
  export const getItems = async () => {
    let { data: items, error } = await supabase
    .from('items')
    .select('*');

    if(items) return items;
    if(error) alert('something went wrong. Try hitting refresh');
  }

  ///// POST TO SUPABASE SECTION /////

  // Insert on the BUILDS table //
  export const addBuild = async (values) => {
    const { user_id, item_1_id, item_2_id, item_3_id, item_4_id, item_5_id, item_6_id, god_id } = values;
    const { data, error } = await supabase
    .from('builds')
    .insert([
      { 
        user_id: user_id,
        item_1_id: item_1_id,
        item_2_id: item_2_id,
        item_3_id: item_3_id,
        item_4_id: item_4_id,
        item_5_id: item_5_id,
        item_6_id: item_6_id,
        god_id: god_id
      },
    ])
    .select()

      }


  module.exports = {
    supabase,
    authStateChangeListener,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithThirdParty,
    signOut,
    getUser,
    getGods,
    getItems,
    addBuild
  }
