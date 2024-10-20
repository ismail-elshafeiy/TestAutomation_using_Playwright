import { Workbook, Worksheet } from "exceljs";
import { get } from "http";

let excelFilePath: string;
let workbook: Workbook;
let sheet: Worksheet;

export async function loadExcelData(filePath: string, sheetName: string): Promise<Worksheet> {
  excelFilePath = filePath;
  workbook = new Workbook();
  console.log(`Reading file [ ${filePath} ]`);
  return workbook.xlsx.readFile(filePath).then(function () {
    console.log(`Reading sheet [ ${sheetName} ]`);
    getSheet(sheetName);
    if (!sheet) {
      throw new Error(`Sheet ${sheetName} not found in ${filePath}`);
    }
    sheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
      console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
    });
    return sheet;
  });
}

export async function getSheet(sheetName: string): Promise<Worksheet> {
  sheet = workbook.getWorksheet(sheetName);
  return sheet;
}

export async function getDataByIndex(rowNum: number, cellNum: number): Promise<string> {
  return sheet.getRow(rowNum).getCell(cellNum).toString();
}

export async function getDataByName(rowName: string, colName: string): Promise<string | ""> {
  const rowIndex: number = await getRowIndex(rowName);
  const colIndex: number = await getColumnIndex(colName);
  const desiredCell = await getDataByIndex(rowIndex, colIndex);
  console.log(`Get value [ ${desiredCell} ] from Row[${rowIndex}]= ${rowName} and Column[${colIndex}]= ${colName}`);
  return desiredCell ? desiredCell.toString() : "";
}

export async function writeDataIntoCellByIndex(rowNum: number, cellNum: number, data: string): Promise<void> {
  sheet.getRow(rowNum).getCell(cellNum).value = data;
  console.log(`Write value [ ${data} ] into Row[${rowNum}] and Column[${cellNum}]`);
  await sheet.workbook.xlsx.writeFile(excelFilePath).then(function () {
    console.log(`Data written successfully into ${excelFilePath}`);
  });
}
export async function writeDataIntoCellByName(rowName: string, colName: string, data: string): Promise<void> {
  const rowIndex: number = await getRowIndex(rowName);
  const colIndex: number = await getColumnIndex(colName);
  await writeDataIntoCellByIndex(rowIndex, colIndex, data);
}

async function getRowIndex(rowName: string): Promise<number> {
  let rowIndex: number | undefined;
  sheet.eachRow((row, rowNumber) => {
    let numberOfRows: number = sheet.rowCount;
    for (let i = 1; i <= numberOfRows; i++) {
      if (row.getCell(i).value === rowName) {
        rowIndex = rowNumber;
        break;
      }
    }
  });
  if (!rowIndex) {
    throw new Error(`Row ${rowName} not found in ${this.sheet}`);
  }
  return rowIndex;
}

async function getColumnIndex(colName: string): Promise<number> {
  let colIndex: number | undefined;
  const headerRow = sheet.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    if (cell.value === colName) {
      colIndex = colNumber;
    }
  });
  if (!colIndex) {
    throw new Error(`Column ${colName} not found in ${this.sheet}`);
  }
  return colIndex;
}
