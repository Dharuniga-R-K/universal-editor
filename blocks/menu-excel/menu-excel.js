export async function decorate({ props, fetch }) {
    const path = props.reference;
  
    if (!path) {
      return { spreadsheetData: null };
    }
  
    try {
      const response = await fetch(path);
      const spreadsheet = await response.json();
  
      return { spreadsheetData: spreadsheet };
    } catch (err) {
      return {
        spreadsheetData: null,
        error: `Failed to load spreadsheet: ${err.message}`
      };
    }
  }
  