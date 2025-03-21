
import { db } from "@/server/db";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      console.log("Received Clerk Webhook Data:", body);
  
      
      const user = body.data;
  
      if (!user || !user.id || !user.email_addresses?.length) {
        console.error("Missing required fields in Clerk webhook payload", user);
        return new Response("Invalid payload", { status: 400 });
      }
  
      await db.user.create({
        data: {
          id: user.id,
          email: user.email_addresses[0].email_address, 
          firstname: user.first_name || "Unknown",
          lastname: user.last_name || "Unknown",
          imageUrl: user.image_url || null,
          createdAt: new Date(), 
          updatedAt: new Date()
        }
      });
  
      return new Response("User created successfully", { status: 200 });
    } catch (error) {
      console.error("Error processing Clerk webhook:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  