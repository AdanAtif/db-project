import { createConnection } from "@/db/Db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const db = await createConnection();
        const sql = "SELECT * FROM Customers";
        const [posts] = await db.query(sql);
        return NextResponse.json(posts);
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
        
    }
}