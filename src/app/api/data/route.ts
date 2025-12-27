import { NextResponse } from "next/server";
import { parseExcelFile } from "@/lib/excelParser";
import path from "path";
import fs from "fs";

// Cache for parsed data
let cachedData: any = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    // Check cache
    const now = Date.now();
    if (cachedData && (now - cacheTime) < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }
    
    // Get the Excel file path
    const excelPath = path.join(process.cwd(), "data", "PhysOfWealth.xlsx");
    
    // Check if file exists
    if (!fs.existsSync(excelPath)) {
      return NextResponse.json(
        { error: "Excel file not found" },
        { status: 404 }
      );
    }
    
    // Parse the Excel file
    const engines = parseExcelFile(excelPath);
    
    // Cache the data
    cachedData = { engines };
    cacheTime = now;
    
    return NextResponse.json({ engines });
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return NextResponse.json(
      { error: "Failed to read Excel file", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

