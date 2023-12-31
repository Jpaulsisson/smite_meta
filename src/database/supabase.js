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
    }, {redirectTo: 'http://smite-meta.vercel.app/'});
    if (error) alert(`That email and password combo doesn't exist in our database`)
  } 

  // Sign in with google, facebook, or discord //
  export const signInWithThirdParty = async (provider) => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    }, {redirectTo: 'http://smite-meta.vercel.app/'});
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
    if(error) console.error(error);
  }

  // Get all items data //
  export const getItems = async () => {
    let { data: items, error } = await supabase
    .from('items')
    .select('*');

    if(items) return items;
    if(error) console.error(error);
  }
  
  // Get all abilities data //
  export const getAbilities = async () => {
    let { data: abilities, error } = await supabase
    .from('abilities')
    .select('*');

    if(abilities) return abilities;
    if(error) console.error(error);
  }

  // Get all skins for ONE GOD //
  export const getGodSkins = async (god_id) => {

    let { data: skins, error } = await supabase
    .from('skins')
    .select("*")
    .eq('god_id', god_id)

    if(skins) return skins;
    if(error) return console.error(error)
  }

  // Get a user's 3 most recent builds
  export const getUserBuildsPreview = async (user_id) => {
    let { data: builds, error } = await supabase
      .from('builds')
      .select("*")
      .eq('user_id', user_id)
      .order('id', {ascending: false})
      .range(0, 2);

    if (builds) return builds;
    if (error) return console.error(error);
  }
  // Get a user's 10 most recent builds
  export const getUserRecentBuilds = async (user_id) => {
    let { data: builds, error } = await supabase
      .from('builds')
      .select("*")
      .eq('user_id', user_id)
      .order('id', {ascending: false})
      .range(0, 9);

    if (builds) return builds;
    if (error) return console.error(error);
  }

  // Get all of a user's builds
  export const getAllUserBuilds = async (user_id) => {
    let { data: builds, error } = await supabase
      .from('builds')
      .select("*")
      .eq('user_id', user_id)
      .order('id', {ascending: false})

    if (builds) return builds;
    if (error) return console.error(error);
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

    if (data) return data;
    if (error) console.error(error);
      }

  export const addMember = async (values) => {
    const { id, name, platform, smite_username, smite_player_id, avatar_photo } = values;
    const { data, error } = await supabase
    .from('members')
    .insert([
      { 
        id: id,
        name: name,
        platform: platform,
        smite_username: smite_username,
        smite_player_id: smite_player_id,
        avatar_photo: avatar_photo
      },
    ])
    .select()

  }

  ///// DELETE FROM SUPABASE SECTION /////

  // Delete on the BUILDS table //
  export const deleteBuild = async (id) => {
    const { error } = await supabase
    .from('builds')
    .delete()
    .eq('id', id);
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
    getGodSkins,
    getAbilities,
    getUserBuildsPreview,
    getUserRecentBuilds,
    getAllUserBuilds,
    addBuild,
    deleteBuild
  }
