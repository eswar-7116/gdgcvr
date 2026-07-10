import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.BLOG_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Webhook URL not configured" },
      { status: 500 },
    );
  }

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const author = formData.get("author") as string | null;
    const topic = formData.get("topic") as string | null;
    let markdown = formData.get("markdown") as string | null;

    if (!title || !author || !topic || !markdown) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Collect uploaded image files (keys are "image:<id>")
    const imageFiles: { id: string; file: File; fileName: string }[] = [];
    let imageIndex = 1;

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image:") && value instanceof File) {
        const id = key.slice("image:".length);
        const ext = value.name.split(".").pop() || "png";
        const fileName = `image_${imageIndex}.${ext}`;
        imageFiles.push({ id, file: value, fileName });
        imageIndex++;
      }
    }

    // Replace upload://id references in markdown with filenames
    for (const img of imageFiles) {
      markdown = markdown.split(`upload://${img.id}`).join(img.fileName);
    }

    // Build FormData for Discord webhook
    const discordFormData = new FormData();

    const messageContent = [
      "📝 **New Blog Request**",
      "",
      `**Title:** ${title}`,
      `**Author:** ${author}`,
      `**Topic:** ${topic}`,
    ].join("\n");

    // Discord uses payload_json for multipart requests
    discordFormData.append(
      "payload_json",
      JSON.stringify({ content: messageContent }),
    );

    // Attach the markdown file
    const mdBlob = new Blob([markdown], { type: "text/markdown" });
    discordFormData.append(
      "files[0]",
      mdBlob,
      `${title.toLowerCase().replace(/\s+/g, "-")}.md`,
    );

    // Attach image files
    for (let i = 0; i < imageFiles.length; i++) {
      discordFormData.append(
        `files[${i + 1}]`,
        imageFiles[i].file,
        imageFiles[i].fileName,
      );
    }

    // Discord has a 25MB file size limit per request and max 10 files
    const response = await fetch(webhookUrl, {
      method: "POST",
      body: discordFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord webhook error:", errorText);
      return NextResponse.json(
        { error: "Failed to send to Discord" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
