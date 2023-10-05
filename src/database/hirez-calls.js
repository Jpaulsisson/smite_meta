import md5 from 'md5';
import { supabase } from './supabase';

const devId = process.env.HIREZ_DEVID;
const authKey = process.env.HIREZ_AUTHKEY;
const smiteAPI = process.env.HIREZ_API_URL;

/// Create Timestamp ///

// formatting helper for timestamp //
const pad2 = (n) => {
  return (n < 10 ? '0' : '') + n;
};

// create timestamp in hirez required format //
const createTimestamp = () => {
  const current = new Date();
  const timestamp = `${pad2(current.getUTCFullYear())}${pad2(
    current.getUTCMonth() + 1
  )}${pad2(current.getUTCDate())}${pad2(current.getUTCHours())}${pad2(
    current.getUTCMinutes()
  )}${pad2(current.getUTCSeconds())}`;
  return timestamp;
};

// timestamp variable assignment
const timestamp = createTimestamp();

// end of timestamp section //

/// Create Signatures for specific API calls ///

// create a correctly formatted signature for hirez API calls //
const makeSignature = (method) => {
  return md5(`${devId}${method}${authKey}${timestamp}`);
};

// call signature variable assignments //
const sessionSignature = makeSignature('createsession')
const testSignature = makeSignature('testsession');
const playerSignature = makeSignature('getplayer');
const matchHistorySignature = makeSignature('getmatchhistory');
const godsSignature = makeSignature('getgods');
const godSkinsSignature = makeSignature('getgodskins');
const itemsSignature = makeSignature('getitems');
const recommendedItemsSignature = makeSignature('getgodrecommendeditems');
const eSportsProLeagueDetailsSignature = makeSignature('getesportsproleaguedetails');

// end of signatures section //

///// Calls to hirez API  /////
/// Table of Contents: (* includes a note) ///
// - Create session * //
// - Test Session //
// - Get Gods //
// - Get Gods With SessionId * //
// - Get Items //
// - Get Player * //
// - Get Player Match History * //
// - Get Recommended Items * //
// - Get Pro League Info //
// - Get All Skins for a God * //

// create a session id //
//  * a session ID must be included in every call //
export const getSessionId = async () => {
  const response = await fetch(
    `${smiteAPI}/createsessionjson/${devId}/${sessionSignature}/${timestamp}`
  );
  const jsonData = await response.json();
  const newSessionId = await jsonData.session_id;
  return newSessionId;
};

// test the current session id //
const testSession = async () => {
  const response = await fetch(
    `${smiteAPI}/testsessionjson/${devId}/${testSignature}/${sessionId}/${timestamp}`
  );
  const jsonData = await response.json();
  console.log(jsonData);
};

// GET all god data from hirez API //
const getGods = async () => {
  const sessionId = await getSessionId();
  const response = await fetch(
    `${smiteAPI}/getgodsjson/${devId}/${godsSignature}/${sessionId}/${timestamp}/1`
  );
  const jsonData = await response.json();
  return jsonData;
};

// GET all gods with a provided sessionId //
// * This is a helper function to populate the skins table //
// * It is used in unison with getAllGodSkinsHelper() //
const getGodsWithSessionId = async (sessionId) => {
  const session = sessionId;
  const response = await fetch(
    `${smiteAPI}/getgodsjson/${devId}/${godsSignature}/${session}/${timestamp}/1`
  );
  const jsonData = await response.json();
  return jsonData;
}

// GET all item data from hirez API //
const getItems = async () => {
  const sessionId = await getSessionId();
  const response = await fetch(
    `${smiteAPI}/getitemsjson/${devId}/${itemsSignature}/${sessionId}/${timestamp}/1`
  );
  const jsonData = await response.json();
  return jsonData;
};

// GET player profile by username 
// * requires the player name from the user //
const getPlayer = async (playerName) => {
  const sessionId = await getSessionId();
  const response = await fetch(
    `${smiteAPI}/getplayerjson/${devId}/${playerSignature}/${sessionId}/${timestamp}/${playerName}`
  );
  const jsonData = await response.json();
  console.log(jsonData);
};

// GET player match history //
// * requires the internal playerId from Hirez //
// * playerId can be obtained from the getPlayer function //
const getPlayerMatchHistory = async (playerId) => {
  const sessionId = await getSessionId();
  const response = await fetch(
    `${smiteAPI}/getmatchhistoryjson/${devId}/${matchHistorySignature}/${sessionId}/${timestamp}/${playerId}`
  );
  const jsonData = await response.json();
  console.log(jsonData);
};

// GET recommended items //
// * requires a godId (primary key on gods table) //
const getSmiteRecommendedItemsByGod = async (godId) => {
  const sessionId = await getSessionId();
  const response = await fetch(
    `${smiteAPI}/getgodrecommendeditemsjson/${devId}/${recommendedItemsSignature}/${sessionId}/${timestamp}/${godId}/1`
  )
  const jsonData = await response.json();
  console.log(jsonData);
}

// GET pro league match details //
const getESportsProLeagueDetails = async () => {
  try {
    const sessionId = await getSessionId();
    const response = await fetch(
      `${smiteAPI}/getesportsproleaguedetailsjson/${devId}/${eSportsProLeagueDetailsSignature}/${sessionId}/${timestamp}`    
    )
    const jsonData = await response.json();
    console.log(jsonData);
  } catch (error) {
    console.error(error);
  }
}

// GET all skins for a god by ID //
// * IMPORTANT * There is no call to get all the god skins at once //
// * This must be provided a sessionId unlike the other calls //
const getAllGodSkinsHelper = async (godId, sessionId) => {
  try { 
    const response = await fetch(
      `${smiteAPI}/getgodskinsjson/${devId}/${godSkinsSignature}/${sessionId}/${timestamp}/${godId}/1`
    )
    const skinsInfo = await response.json();

    return skinsInfo;

  } catch(err) {
      console.error(err);
  }

}



///// Supabase insert functions /////

// Populate the Items table from the hirez API //
export const addAllItemsToSupabase = async () => {
  try {
  
    const items = await getItems();

    items.forEach(async (item) => {
        const { ItemId, ActiveFlag, DeviceName, itemIcon_URL, RestrictedRoles, StartingItem, Glyph, ItemTier, ShortDesc, Type, Price } = item;
  
      const { data, error } = await supabase
        .from('items')
        .insert({ 
              id: ItemId ,
              name: DeviceName ,
              pic_url: itemIcon_URL ,
              restricted: RestrictedRoles ,
              starter: StartingItem ,
              glyph: Glyph ,
              tier: ItemTier ,
              special: item?.ItemDescription?.SecondaryDescription ,
              short_description: ShortDesc ,
              stat_1_desc: item?.ItemDescription?.Menuitems[0]?.Description ,
              stat_1_val: item?.ItemDescription?.Menuitems[0]?.Value ,
              stat_2_desc: item?.ItemDescription?.Menuitems[1]?.Description,
              stat_2_val: item?.ItemDescription?.Menuitems[1]?.Value,
              stat_3_desc: item?.ItemDescription?.Menuitems[2]?.Description,
              stat_3_val: item?.ItemDescription?.Menuitems[2]?.Value,
              stat_4_desc: item?.ItemDescription?.Menuitems[3]?.Description,
              stat_4_val: item?.ItemDescription?.Menuitems[3]?.Value,
              stat_5_desc: item?.ItemDescription?.Menuitems[4]?.Description,
              stat_5_val: item?.ItemDescription?.Menuitems[4]?.Value,
              stat_6_desc: item?.ItemDescription?.Menuitems[5]?.Description,
              stat_6_val: item?.ItemDescription?.Menuitems[5]?.Value,
              active_status: ActiveFlag,
              type: Type,
              price: Price 
            })      
      })

    console.log('item added successfully');

  } catch (error) {
    console.error(error.message)
  }
}

// Populate the Gods table from the hirez API //
export const addAllGodsToSupabase = async () => {
  try {
    const gods = await getGods();
  
    gods.forEach(async (god) => {
      const { id, Name, AttackSpeed, AttackSpeedPerLevel, Health, HealthPerLevel, MagicalPower, MagicalPowerPerLevel, MagicProtection, MagicProtectionPerLevel, Mana, ManaPerLevel, PhysicalPower, PhysicalPowerPerLevel, PhysicalProtection, PhysicalProtectionPerLevel, Speed, Roles, Type, godCard_URL, AbilityId1, AbilityId2, AbilityId3, AbilityId4, AbilityId5 } = god;
  
      const { data, error } = await supabase
      .from('gods')
      .insert({ 
        id: id,
        name: Name,
        attack_speed: AttackSpeed,
        attack_speed_per_level: AttackSpeedPerLevel, 
        health: Health,
        health_per_level: HealthPerLevel, 
        magical_power: MagicalPower,
        magical_power_per_level: MagicalPowerPerLevel,
        magical_protection: MagicProtection,
        magical_protection_per_level: MagicProtectionPerLevel,
        mana: Mana,
        mana_per_level: ManaPerLevel,
        physical_power: PhysicalPower,
        physical_power_per_level: PhysicalPowerPerLevel,
        physical_protection: PhysicalProtection,
        physical_protection_per_level: PhysicalProtectionPerLevel,
        speed: Speed,
        role: Roles,
        type: Type,
        pic_url: godCard_URL,
        ability_id_1: AbilityId1,
        ability_id_2: AbilityId2,
        ability_id_3: AbilityId3,
        ability_id_4: AbilityId4,
        ability_id_5: AbilityId5, 
      })
      .select('*')
    })
    console.log('all gods data is up to date.')
  }
  catch(err) {
    console.error(err);
  }
}

// Populate the Abilties table from the hirez API //
export const addAllAbilitiesToSupabase = async () => {
  try {
    const gods = await getGods();
  
    gods.forEach(async (god) => {
      const {data, error } = await supabase
      .from('abilities')
      .insert([
        { //Ability 1 start
          id: god.Ability_1.Id,
          name: god.Ability_1.Summary,
          description: god.Ability_1.Description.itemDescription.description,
          cooldown: god.Ability_1.Description.itemDescription.cooldown,
          mana_cost: god.Ability_1.Description.itemDescription.cost,
          ability_type: god.Ability_1.Description.itemDescription.menuitems[0].value,
          effect_1: god.Ability_1?.Description?.itemDescription?.rankitems[0]?.description,
          effect_1_value: god.Ability_1?.Description?.itemDescription?.rankitems[0]?.value,
          effect_2: god?.Ability_1?.Description?.itemDescription?.rankitems[1]?.description,
          effect_2_value: god?.Ability_1?.Description?.itemDescription?.rankitems[1]?.value,
          effect_3: god?.Ability_1?.Description?.itemDescription?.rankitems[2]?.description,
          effect_3_value: god?.Ability_1?.Description?.itemDescription?.rankitems[2]?.value,
          effect_4: god?.Ability_1?.Description?.itemDescription?.rankitems[3]?.description,
          effect_4_value: god?.Ability_1?.Description?.itemDescription?.rankitems[3]?.value,
          effect_5: god?.Ability_1?.Description?.itemDescription?.rankitems[4]?.description,
          effect_5_value: god?.Ability_1?.Description?.itemDescription?.rankitems[4]?.value,
          pic_url: god.Ability_1.URL
        }, //Ability 1 end
        {  //Ability 2 start
          id: god.Ability_2.Id,
          cooldown: god.Ability_2.Description.itemDescription.cooldown,
          mana_cost: god.Ability_2.Description.itemDescription.cost,
          description: god.Ability_2.Description.itemDescription.description,
          ability_type: god.Ability_2.Description.itemDescription.menuitems[0].value,
          effect_1: god.Ability_2?.Description?.itemDescription?.rankitems[0]?.description,
          effect_1_value: god.Ability_2?.Description?.itemDescription?.rankitems[0]?.value,
          effect_2: god.Ability_2?.Description?.itemDescription?.rankitems[1]?.description,
          effect_2_value: god.Ability_2?.Description?.itemDescription?.rankitems[1]?.value,
          effect_3: god.Ability_2?.Description?.itemDescription?.rankitems[2]?.description,
          effect_3_value: god.Ability_2?.Description?.itemDescription?.rankitems[2]?.value,
          effect_4: god.Ability_2?.Description?.itemDescription?.rankitems[3]?.description,
          effect_4_value: god.Ability_2?.Description?.itemDescription?.rankitems[3]?.value,
          effect_5: god.Ability_2?.Description?.itemDescription?.rankitems[4]?.description,
          effect_5_value: god.Ability_2?.Description?.itemDescription?.rankitems[4]?.value,
          name: god.Ability_2.Summary,
          pic_url: god.Ability_2.URL
        }, //Ability 2 end
        {  //Ability 3 start
          id: god.Ability_3.Id,
          cooldown: god.Ability_3.Description.itemDescription.cooldown,
          mana_cost: god.Ability_3.Description.itemDescription.cost,
          description: god.Ability_3.Description.itemDescription.description,
          ability_type: god.Ability_3.Description.itemDescription.menuitems[0].value,
          effect_1: god.Ability_3?.Description?.itemDescription?.rankitems[0]?.description,
          effect_1_value: god.Ability_3?.Description?.itemDescription?.rankitems[0]?.value,
          effect_2: god.Ability_3?.Description?.itemDescription?.rankitems[1]?.description,
          effect_2_value: god.Ability_3?.Description?.itemDescription?.rankitems[1]?.value,
          effect_3: god.Ability_3?.Description?.itemDescription?.rankitems[2]?.description,
          effect_3_value: god.Ability_3?.Description?.itemDescription?.rankitems[2]?.value,
          effect_4: god.Ability_3?.Description?.itemDescription?.rankitems[3]?.description,
          effect_4_value: god.Ability_3?.Description?.itemDescription?.rankitems[3]?.value,
          effect_5: god.Ability_3?.Description?.itemDescription?.rankitems[4]?.description,
          effect_5_value: god.Ability_3?.Description?.itemDescription?.rankitems[4]?.value,
          name: god.Ability_3.Summary,
          pic_url: god.Ability_3.URL
        }, //Ability 3 end
        {  //Ability 4 start
          id: god.Ability_4.Id,
          cooldown: god.Ability_4.Description.itemDescription.cooldown,
          mana_cost: god.Ability_4.Description.itemDescription.cost,
          description: god.Ability_4.Description.itemDescription.description,
          ability_type: god.Ability_4.Description.itemDescription.menuitems[0].value,
          effect_1: god.Ability_4?.Description?.itemDescription?.rankitems[0]?.description,
          effect_1_value: god.Ability_4?.Description?.itemDescription?.rankitems[0]?.value,
          effect_2: god.Ability_4?.Description?.itemDescription?.rankitems[1]?.description,
          effect_2_value: god.Ability_4?.Description?.itemDescription?.rankitems[1]?.value,
          effect_3: god.Ability_4?.Description?.itemDescription?.rankitems[2]?.description,
          effect_3_value: god.Ability_4?.Description?.itemDescription?.rankitems[2]?.value,
          effect_4: god.Ability_4?.Description?.itemDescription?.rankitems[3]?.description,
          effect_4_value: god.Ability_4?.Description?.itemDescription?.rankitems[3]?.value,
          effect_5: god.Ability_4?.Description?.itemDescription?.rankitems[4]?.description,
          effect_5_value: god.Ability_4?.Description?.itemDescription?.rankitems[4]?.value,
          name: god.Ability_4.Summary,
          pic_url: god.Ability_4.URL
        }, //Ability 4 end
        {  //Ability 5 start
          id: god.Ability_5.Id,
          cooldown: god.Ability_5.Description.itemDescription.cooldown,
          mana_cost: god.Ability_5.Description.itemDescription.cost,
          description: god.Ability_5.Description.itemDescription.description,
          ability_type: god.Ability_5.Description.itemDescription.menuitems[0].value,
          effect_1: god.Ability_5?.Description?.itemDescription?.rankitems[0]?.description,
          effect_1_value: god.Ability_5?.Description?.itemDescription?.rankitems[0]?.value,
          effect_2: god.Ability_5?.Description?.itemDescription?.rankitems[1]?.description,
          effect_2_value: god.Ability_5?.Description?.itemDescription?.rankitems[1]?.value,
          effect_3: god.Ability_5?.Description?.itemDescription?.rankitems[2]?.description,
          effect_3_value: god.Ability_5?.Description?.itemDescription?.rankitems[2]?.value,
          effect_4: god.Ability_5?.Description?.itemDescription?.rankitems[3]?.description,
          effect_4_value: god.Ability_5?.Description?.itemDescription?.rankitems[3]?.value,
          effect_5: god.Ability_5?.Description?.itemDescription?.rankitems[4]?.description,
          effect_5_value: god.Ability_5?.Description?.itemDescription?.rankitems[4]?.value,
          name: god.Ability_5.Summary,
          pic_url: god.Ability_5.URL
        } //Ability 5 end
        ]);      
    })

    console.log('abilities table updated');
  }
  catch(err) {
    console.error(err);
  }
}

// Populate the Items table from the hirez API //
// * Because of the structure of Hirez's database this //
// * this call has to be done in a very specific way //
export const addAllSkinsToSupabase = async () => {
  //Create one instance of a sessionId to save calls to Hirez then get all gods
  try {
    const sessionId = await getSessionId();
    const gods = await getGodsWithSessionId(sessionId);

    // for every god we need to grab just the god_id
    // so we can call Hirez to get the skins for that god
    gods.forEach(async(god) => {

      const god_id = god.id;

      const skins = await getAllGodSkinsHelper(god_id, sessionId);

      // then we populate a new row in our supabase for each skin on each god
      skins.forEach(async(skin) => {

        const { skin_id1, god_id, godSkin_URL, obtainability, price_favor, price_gems } = skin;

        const { data, error } = await supabase
        .from('skins')
        .insert({
          id: skin_id1,
          god_id: god_id,
          pic_url: godSkin_URL,
          tier: obtainability,
          price_favor: price_favor,
          price_gems: price_gems
        })
        .select('*');
      })

      console.log('skins table updated')

    })
  } catch (error) {
    console.error(error)
  }
}