// import { db } from "@/server/db";

import { db } from "@/server/db";


// export const POST = async (req: Request) =>{
//     const  {data} = await req.json();
//     console.log('webhook recevied',data);
//     const email = data.email_addresses[0].email_address;
//     const firstName = data.first_name;
//     const lastName = data.last_name;
//     const image_url = data.image_url;
//     const id = data.id;

//     await db.user.create({
//        data:{
//         id: id,
//         email:email,
//         firstname: firstName,
//         lastname: lastName,
//         imageUrl: image_url,
//        }
//     });
//     console.log('user created');

//     return new Response('Webhook received',{status:200});
// }
export async function POST(req: Request) {
    try {
      const body = await req.json();
      console.log("📌 Received Clerk Webhook Data:", body);
  
      // Extract user details from the nested "data" object
      const user = body.data;
  
      if (!user || !user.id || !user.email_addresses?.length) {
        console.error("❌ Missing required fields in Clerk webhook payload", user);
        return new Response("Invalid payload", { status: 400 });
      }
  
      await db.user.create({
        data: {
          id: user.id,
          email: user.email_addresses[0].email_address, // Extract email correctly
          firstname: user.first_name || "Unknown",
          lastname: user.last_name || "Unknown",
          imageUrl: user.image_url || null,
          createdAt: new Date(), // Explicitly set timestamps
          updatedAt: new Date()
        }
      });
  
      return new Response("User created successfully", { status: 200 });
    } catch (error) {
      console.error("❌ Error processing Clerk webhook:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  