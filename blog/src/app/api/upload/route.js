// import { NextResponse } from "next/server";
// import path from "path";
// import { writeFile } from "fs/promises";
// import { getAuthSession } from "@/utils/auth";


// export const runtime = 'edge'; 

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export const POST = async (req) => {
//   const session = await getAuthSession();
//   console.log(session);
  
//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//     );
//   }

//   if (session.user.email !== "debswarnadeep85@gmail.com") {
//     return new NextResponse(
//       JSON.stringify({ message: "Uploading is not allowed for you. Please contact us." }, { status: 401 })
//     );
//   }
  
//   console.log("File upload initiated...");

//   // Parse the form data from the request
//   const formData = await req.formData();

//   // Extract the file from form data
//   const file = formData.get("file");
//   if (!file) {
//     console.error("No file received");
//     return NextResponse.json({ error: "No files received." }, { status: 400 });
//   }

//   // Read the file as a buffer
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = file.name.replaceAll(" ", "_"); // Replace spaces with underscores in the filename
//   const uploadDir = path.join(process.cwd(), "public", "uploads");

//   console.log(`Uploading file: ${filename} to ${uploadDir}`);

//   try {
//     // Write the file to the upload directory
//     await writeFile(path.join(uploadDir, filename), buffer);
//     console.log("File upload successful:", filename);
//     return NextResponse.json({ message: "Success", status: 201 });
//   } catch (error) {
//     console.error("Error occurred while uploading file:", error);
//     return NextResponse.json({ message: "Failed", status: 500 });
//   }
// };



import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { getAuthSession } from "@/utils/auth";

export const POST = async (req) => {
  const session = await getAuthSession();
  console.log(session);
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  if (session.user.email !== "debswarnadeep85@gmail.com") {
    return new NextResponse(
      JSON.stringify({ message: "Uploading is not allowed for you. Please contact us." }, { status: 401 })
    );
  }
  
  console.log("File upload initiated...");

  // Parse the form data from the request
  const formData = await req.formData();

  // Extract the file from form data
  const file = formData.get("file");
  if (!file) {
    console.error("No file received");
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // Read the file as a buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_"); // Replace spaces with underscores in the filename
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  console.log(`Uploading file: ${filename} to ${uploadDir}`);

  try {
    // Write the file to the upload directory
    await writeFile(path.join(uploadDir, filename), buffer);
    console.log("File upload successful:", filename);
    return NextResponse.json({ message: "Success", status: 201 });
  } catch (error) {
    console.error("Error occurred while uploading file:", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};
