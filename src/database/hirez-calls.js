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


export const addItemToSupabase = async () => {
  try {
    const { data, error } = await supabase
  .from('items')
  .insert([
    { id: '1234', name: 'otherValue' },
  ])
  .select();

  console.log('hit')
  } catch (error) {
    console.error(error);
  }
}

// IT'S ALIVE!!!!!! (it's working now) //
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