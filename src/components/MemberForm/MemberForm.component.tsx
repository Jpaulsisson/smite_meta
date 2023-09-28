import React from 'react'





export default function LinkAccount() {
  return (
    <form>
      {/* info needed:
          * user must be logged in to the site *
          - auth id (from supabase)
          - name
          - platform (from hirez call)
          - alt_platform (from hirez call)
          - smite_username (used to make hirez call)
          - smite_player_id (from hirez call stored in supabase to save a call later)
          - content_creator (defaults to false and will only be changed manually by Paul)
          */}
      <label htmlFor=""></label>
      <input name='name' type="text" />
      <label htmlFor=""></label>
      <input type="text" />
      <label htmlFor=""></label>
      <input type="text" />
      <label htmlFor=""></label>
      <input type="text" />
      <label htmlFor=""></label>
      <input type="text" />
    </form>
  )
}
