export const useWishes = () => {
  // Get the Supabase connection from our plugin
  const { $supabase } = useNuxtApp()

  // Function 1: Fetch all wishes from database
  const fetchWishes = async () => {
    try {
      const { data, error } = await $supabase
        .from('wishes')                           // Table name
        .select('*')                              // Get all columns
        .order('created_at', { ascending: false }) // Newest first

      if (error) throw error
      return data  // Return the wishes
    } catch (error) {
      console.error('Error fetching wishes:', error)
      return []  // Return empty array on error
    }
  }

  // Function 2: Add a new wish to database
  const addWish = async (wishData) => {
    try {
      const { data, error } = await $supabase
        .from('wishes')
        .insert([{
          content: wishData.content,
          author: wishData.author,
          wallpaper_id: wishData.wallpaperId
        }])
        .select()   // Return the inserted data
        .single()   // We only inserted 1 row, get it as object

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error adding wish:', error)
      return { success: false, error: error.message }
    }
  }

  // Function 3: Delete a wish from database
  const deleteWish = async (wishId) => {
    try {
      const { error } = await $supabase
        .from('wishes')
        .delete()
        .eq('id', wishId)  // Where id equals wishId

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error deleting wish:', error)
      return { success: false, error: error.message }
    }
  }

  // Export all functions so components can use them
  return {
    fetchWishes,
    addWish,
    deleteWish
  }
}