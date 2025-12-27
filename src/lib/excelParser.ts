import * as XLSX from "xlsx";
import { ETFEngine, EngineType } from "./types";
import path from "path";
import fs from "fs";

export function parseExcelFile(filePath: string): ETFEngine[] {
  try {
    // Read the Excel file
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    // Transform to ETFEngine array
    const engines: ETFEngine[] = data.map((row: any) => {
      const geqs = row["Gavel Engine Quality Score (GEQS)"] || "";
      const engineType = mapGEQSToEngineType(geqs);
      
      return {
        ticker: row["Ticker/Fund"] || "",
        frequency: row["Frequency"] || "",
        shares: parseFloat(row["# of Shares"]) || 0,
        currentValue: parseFloat(row["Current Value"]) || 0,
        yearlyThrust: parseFloat(row["Yearly Thrust"]) || 0,
        escapeRatio: row["Escape Ratio (ER)"] || "",
        distributionStabilityIndex: row["Distribution Stability Index (DSI)"] || "",
        geqs: geqs,
        engineEnergyCost: row["Engine Energy Cost (EEC)"] || "",
        engineType: engineType,
      };
    });
    
    return engines.filter(engine => engine.ticker); // Filter out empty rows
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    throw error;
  }
}

function mapGEQSToEngineType(geqs: string): EngineType | undefined {
  const geqsLower = geqs.toLowerCase();
  
  if (geqsLower.includes("nuclear")) {
    return EngineType.NUCLEAR;
  } else if (geqsLower.includes("elite")) {
    return EngineType.ELITE;
  } else if (geqsLower.includes("stabilized")) {
    return EngineType.STABILIZED;
  } else if (geqsLower.includes("baseline")) {
    return EngineType.BASELINE;
  } else if (geqsLower.includes("wind")) {
    return EngineType.WIND_DEPENDENT;
  }
  
  return undefined;
}

