export async function decorate({ props, fetch }) {
    const path = props.spreadsheet;
  
    if (!path) {
      return { spreadsheetData: null };
    }
  
    try {
      const response = await fetch(path);
      const data = await response.json();
      return { spreadsheetData: data };
    } catch (e) {
      return { spreadsheetData: null, error: e.message };
    }
  }
  