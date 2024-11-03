document.getElementById("search-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const query = document.getElementById("search-input").value;
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayResults(data.collection.items);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  });
  
  function displayResults(items) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Limpiar resultados anteriores
  
    items.forEach(item => {
      const { title, description, date_created } = item.data[0];
      const imageUrl = item.links?.[0]?.href || '';
  
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
  
      card.innerHTML = `
        <div class="card">
          <img src="${imageUrl}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description || 'No description available.'}</p>
            <p class="text-muted">${new Date(date_created).toLocaleDateString()}</p>
          </div>
        </div>
      `;
  
      resultsContainer.appendChild(card);
    });
  }
  