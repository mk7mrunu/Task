// JavaScript code
async function fetchAndPopulateTable() {
    const url = 'https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      let tableData = '';
      data.result.forEach((values) => {
        tableData += `<tr>
          <td class="panel-name">${values.panel_name}</td>
          <td>${values.mac_id}</td>
          <td>${values.Lat}</td>
          <td>${values.Lng}</td>
          <td>${values.Location}</td>
        </tr>`;
      });
  
      document.getElementById('table_body').innerHTML = tableData;
  
      // Add click event listener to the "Panel Name" cells
     const panelNameCells = document.getElementsByClassName('panel-name');
     for (const cell of panelNameCells) {
     cell.addEventListener('click', () => {
      // Get the index of the clicked panel name
      const rowIndex = cell.parentElement.rowIndex;

      // Display the panel details
      const panelDetails = data.result[rowIndex - 1];
      document.getElementById('r_phase_voltage_status').innerText = panelDetails.r_volt_status;
      document.getElementById('mcb_status').innerText = panelDetails.r_mcb_status;
      document.getElementById('load_status').innerText = panelDetails.r_load_status;
      document.getElementById('pf_status').innerText = panelDetails.r_pf_status;

      // Show the list
      document.getElementById('panel_details').style.display = 'block';
    });
  }
  // Add event listener for the escape key
  document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    // Hide the panel details
    document.getElementById('panel_details').style.display = 'none';
  }
});
   } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Call the function to fetch and populate the table
  fetchAndPopulateTable();
  