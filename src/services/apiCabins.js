import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://tgzsciesnrnuesinbkep.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // Create cabin

  let query = supabase.from("cabins");

  // create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be created");
  }

  if (hasImage) return data;

  // Upload Image
  const { error: stroageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (stroageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(stroageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created."
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
