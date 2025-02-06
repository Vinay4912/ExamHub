import { db } from "@/server/db";


export const POST = async (req: Request) =>{
    const  {data} = await req.json();
    console.log('webhook recevied',data);
    const emailAddress = data.email_addresses[0].email_address;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const image_url = data.image_url;
    const id = data.id;

    await db.user.create({
       data:{
        id: id,
        email:emailAddress,
        firstname: firstName,
        lastname: lastName,
        imageUrl: image_url,
       }
    });
    console.log('user created');

    return new Response('Webhook received',{status:200});
}