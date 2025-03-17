import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_API_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Generate a proper filename with timestamp and original name
  const filename = image.name
    ? `${image.name.replace(/\s+/g, "_")}_${Date.now()}`
    : `image_${Date.now()}.jpg`;

  // Convert file to ArrayBuffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const data = await supabase.storage
    .from("thumbnails")
    .upload(filename, buffer, {
      contentType: image.type || "image/jpeg",
    });

  console.log({ data });

  if (!data.data?.path) throw new Error("failed to upload the file");
  const urlData = await supabase.storage
    .from("thumbnails")
    .getPublicUrl(data.data?.path);

  return urlData.data.publicUrl;
}
