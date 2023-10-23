import { Item, God } from '@/contexts/data.context'

type BuildStats = {
  physical_power:  number,
  magical_power:  number,
  critical_strike_chance: number,
  physical_lifesteal: number,
  magical_lifesteal:  number,
  physical_percent_penetration:  number,
  magical_percent_penetration:  number,
  physical_flat_penetration:  number,
  magical_flat_penetration:  number,
  attack_speed: number,
  basic_attack_damage:  number,
  hp5:  number,
  mp5:  number,
  health:  number,
  mana:  number,
  speed:  number,
  physical_protection:  number,
  magical_protection:  number,
  damage_reduction:  number,
  cooldown_reduction:  number,
  crowd_control_reduction:  number,
}

type GodStats = {
  attack_speed: number,
  health: number,
  magical_power: number,
  magical_protection: number,
  mana: number,
  physical_power: number,
  physical_protection: number,
  speed: number,
}

export const buildStatsCalculator = (buildItems: Item[]) => {
  
  // Set up the final form
  const build = {
  physical_power: 0,
  magical_power: 0,
  critical_strike_chance:0,
  physical_lifesteal:0,
  magical_lifesteal: 0,
  physical_percent_penetration: 0,
  magical_percent_penetration: 0,
  physical_flat_penetration: 0,
  magical_flat_penetration: 0,
  attack_speed:0,
  basic_attack_damage: 0,
  hp5: 0,
  mp5: 0,
  health: 0,
  mana: 0,
  speed: 0,
  physical_protection: 0,
  magical_protection: 0,
  damage_reduction: 0,
  cooldown_reduction: 0,
  crowd_control_reduction: 0,
  }

  if (buildItems.length === 0) return build;
  // Map through the build items' stats
  buildItems.map((item) => {
    
    // Grab the stat names and values
    const stats = [ 
      { desc: item?.stat_1_desc, val: item?.stat_1_val},
      { desc: item?.stat_2_desc, val: item?.stat_2_val},
      { desc: item?.stat_3_desc, val: item?.stat_3_val},
      { desc: item?.stat_4_desc, val: item?.stat_4_val},
      { desc: item?.stat_5_desc, val: item?.stat_5_val},
      { desc: item?.stat_6_desc, val: item?.stat_6_val}
    ]

    // Add them up dependent on their type
    stats.forEach((stat) => {
      if (stat.val) {
        switch(true) {
        case stat.desc?.toLowerCase() === 'physical power':
          build.physical_power += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'magical power':
          build.magical_power += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'critical strike chance':
          build.critical_strike_chance += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'physical lifesteal':
          build.physical_lifesteal  += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'magical lifesteal':
          build.magical_lifesteal += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'physical penetration':
          stat.val.includes('%') ? build.physical_percent_penetration += parseInt(stat.val) : build.physical_flat_penetration += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'magical penetration':
          stat.val.includes('%') ? build.magical_percent_penetration += parseInt(stat.val) : build.magical_flat_penetration += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'attack speed':
          build.attack_speed += parseInt(stat.val) / 100;
          break;
        case stat.desc?.toLowerCase() === 'basic attack damage':
          build.basic_attack_damage += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'hp5':
          build.hp5 += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'mp5':
          build.mp5 += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'hp5 & mp5':
          build.hp5 += parseInt(stat.val);
          build.mp5 += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'health':
          build.health += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'mana':
          build.mana += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'movement speed':
          build.speed += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'physical protection':
          build.physical_protection += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'magical protection':
          build.magical_protection += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'damage reduction':
          build.damage_reduction += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'cooldown reduction':
          build.cooldown_reduction += parseInt(stat.val);
          break;
        case stat.desc?.toLowerCase() === 'crowd control reduction':
          build.crowd_control_reduction += parseInt(stat.val);
          break;
          default: 
            return;
      }
      }
    })
  })
  return build;
}

export const godStatsCalculator = (god: God) => {
  if (!god) {
    return {
      attack_speed: 0,
      health: 0,
      magical_power: 0,
      magical_protection: 0,
      mana: 0,
      physical_power: 0,
      physical_protection: 0,
      speed: 0,
    }
  }

  const { 
    attack_speed, attack_speed_per_level, 
    health, health_per_level,
    magical_power, magical_power_per_level,
    magical_protection, magical_protection_per_level,
    mana, mana_per_level,
    physical_power, physical_power_per_level,
    physical_protection, physical_protection_per_level,
    speed
  } = god || 0;

  const finalGodStats = {
    attack_speed: attack_speed + ((attack_speed_per_level * 20) / 100),
    health: health + (health_per_level * 20),
    magical_power: magical_power + (magical_power_per_level * 20),
    magical_protection: magical_protection + (magical_protection_per_level * 20),
    mana: mana + (mana_per_level * 20),
    physical_power: physical_power + (physical_power_per_level * 20),
    physical_protection: physical_protection + (physical_protection_per_level * 20),
    speed: speed
  }
  return finalGodStats;
}

export const combineStats = (buildStats: BuildStats, godStats: GodStats) => {
  const combined = {
    ...buildStats,
    attack_speed: buildStats.attack_speed + godStats.attack_speed,
    health: buildStats.health + godStats.health,
    magical_power: buildStats.magical_power + godStats.magical_power,
    magical_protection: buildStats.magical_protection + godStats.magical_protection,
    mana: buildStats.mana + godStats.mana,
    physical_power: buildStats.physical_power + godStats.physical_power,
    physical_protection: buildStats.physical_protection + godStats.physical_protection,
  }
  return combined;
}

export const itemWarningHelper = (items: Item[], buildItems: Item[]) => {

  // Set the base level
  let physical_power_base = 0;
  let magical_power_base = 0;

  // Pull out all items with both types of power
  const dualPowerItems = items?.filter((item) => {
    if ((item.stat_1_desc?.toLowerCase() === 'magical power' && item.stat_2_desc?.toLowerCase() === 'physical power') || (item.stat_1_desc?.toLowerCase() === 'physical power' && item.stat_2_desc?.toLowerCase() === 'magical power')) return true;
  })
  
  // Iterate through the build items checking for matches to dualPowerItems
  // and adding that item's powers to their respective base variables
  buildItems.forEach((item) => {
    if (dualPowerItems.includes(item)) {
      physical_power_base += parseInt(item.stat_1_val!)
      magical_power_base += parseInt(item.stat_2_val!)
    }
  })

  // Return the new base levels for measuring against
  return { 
    physical_power_base: physical_power_base,
    magical_power_base: magical_power_base,
  }
}

export const checkItemsForChildItemDupes = (array: Item[]) => {
  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i];

    for (let j = 0; j < array.length; j++) {
      // Skip comparing a string to itself
      if (i === j) continue;

      const anotherItem = array[j];

      //
      if (currentItem?.id === anotherItem?.child_item_id) {
        return true;
      }
    }
  }
  return false;
}


module.exports = {
  buildStatsCalculator,
  godStatsCalculator,
  combineStats,
  itemWarningHelper,
  checkItemsForChildItemDupes
}

