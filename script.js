"use strict";

// Define el arreglo que contiene todas las recetas.
const recipes = [
  {
    id: 1,
    name: "Body Butter",
    servings: 1,
    baseAmount: 200,
    ingredients: [
      { name: "Karité", amount: 128, unit: "gr" },
      { name: "Estearico", amount: 12, unit: "gr" },
      { name: "Aceite", amount: 44, unit: "gr" },
      { name: "Maicena", amount: 15, unit: "gr" },
      { name: "Vit. E", amount: 2, unit: "gr" },
    ],
  },

  {
    id: 2,
    name: "Exfoliante",
    servings: 1,
    baseAmount: 210,
    ingredients: [
      { name: "Aceite", amount: 70, unit: "gr" },
      { name: "Lannette", amount: 28, unit: "gr" },
      { name: "Estearico", amount: 9, unit: "gr" },
      { name: "Conservante", amount: 3.15, unit: "gr" },
      { name: "Vit. E", amount: 1, unit: "gr" },
      { name: "Sal EPSON / Azúcar", amount: 110, unit: "gr" },
    ],
  },

  {
    id: 3,
    name: "Jabón Batido",
    servings: 1,
    baseAmount: 210,
    ingredients: [
      { name: "Agua Destilada", amount: 47, unit: "gr" },
      { name: "Glicerina", amount: 49, unit: "gr" },
      { name: "Betaína", amount: 45, unit: "gr" },
      { name: "CSI", amount: 45, unit: "gr" },
      { name: "Estearico", amount: 15, unit: "gr" },
      { name: "Conservador", amount: 2, unit: "gr" },
      { name: "Karité", amount: 13, unit: "gr" },
      { name: "Aceite", amount: 13, unit: "gr" },
    ],
  },

  {
    id: 4,
    name: "Espresso Scrub",
    servings: 1,
    baseAmount: 210,
    ingredients: [
      { name: "Agua Destilada", amount: 120, unit: "gr" },
      { name: "Glicerina", amount: 20, unit: "gr" },
      { name: "CAF. anhidra", amount: 2, unit: "gr" },
      { name: "Goma Xantana", amount: 1, unit: "gr" },
      { name: "Aceite", amount: 20, unit: "gr" },
      { name: "Arroz", amount: 15, unit: "gr" },
      { name: "Café", amount: 25, unit: "gr" },
      { name: "Centella Asiática", amount: 15, unit: "gotas" },
      { name: "Vit. E", amount: 1, unit: "gr" },
      { name: "Conservante", amount: 3, unit: "gr" },
    ],
  },

  {
    id: 5,
    name: "Bálsamo Mamalon",
    servings: 3,
    baseAmount: 8,
    ingredients: [
      { name: "Cera de candelilla", amount: 5, unit: "gr" },
      { name: "Karité", amount: 7, unit: "gr" },
      { name: "Aceite", amount: 12, unit: "gr" },
      { name: "Vit. E", amount: 5, unit: "gr" },
    ],
  },

  {
    id: 6,
    name: "Skin Nectar",
    servings: 1,
    baseAmount: 30, // Basado en el título "30 ml"
    ingredients: [
      { name: "Agua bidestilada", amount: 24.5, unit: "ml" },
      { name: "AH alto", amount: 1.2, unit: "ml" },
      { name: "AH bajo", amount: 0.06, unit: "ml" },
      { name: "Niacinamida", amount: 1.5, unit: "ml" },
      { name: "Regaliz", amount: 0.6, unit: "ml" },
      { name: "Centella Hidroglicolica", amount: 1.8, unit: "ml" },
      { name: "Xantana", amount: 0.3, unit: "ml" },
      { name: "Conservante", amount: 0.3, unit: "ml" }, // Corregí "Consevante"
    ],
  },

  {
    id: 7,
    name: "Glow Essence Mist",
    servings: 1,
    baseAmount: 110,
    ingredients: [
      { name: "Hamamelis", amount: 35, unit: "ml" },
      { name: "Extracto de té verde", amount: 5.5, unit: "ml" },
      { name: "Niacinamida", amount: 3.3, unit: "ml" },
      { name: "Glicerina vegetal", amount: 2.2, unit: "ml" },
      { name: "Árbol de té", amount: 0.33, unit: "ml" }, // Puse el acento
      { name: "Agua destilada", amount: 64, unit: "ml" },
      { name: "Conservante", amount: 1, unit: "ml" },
    ],
  },
];

// Busca en el HTML el elemento donde pondremos la lista de botones.
const recipeContainer = document.getElementById("recipe-list-container");

// Esta función se encarga de mostrar los detalles de la receta que fue seleccionada.
function displaySelectedRecipe(recipeId) {
  const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

  if (!selectedRecipe) {
    console.error("Receta no encontrada!");
    return;
  }

  const container = document.getElementById("selected-recipe-container");

  // Construimos el HTML. Ahora incluye un input para la cantidad y un botón.
  // También hemos añadido un nuevo div con id="calculated-recipe" para el resultado.

  let recipeHtml = `
  <h3>${selectedRecipe.name}</h3>
  <p><strong>Ingredientes para ${selectedRecipe.servings} ${
    selectedRecipe.servings > 1 ? "lotes" : "lote"
  }:</strong></p>
  <ul>
`;
  selectedRecipe.ingredients.forEach((ingredient) => {
    recipeHtml += `<li>${ingredient.name}: ${ingredient.amount} ${ingredient.unit}</li>`;
  });

  recipeHtml += `
    </ul>
    <hr>
    <h4>Calcular para Múltiples Lotes</h4>
    <div class="calculator">
        <label for="quantity">Cantidad de lotes a preparar:</label>
        <input type="number" id="quantity" value="1" min="1">
        <button id="calculate-btn">Calcular</button>
    </div>
    <div id="calculated-recipe"></div>
  `;

  container.innerHTML = recipeHtml;

  // ---- LÓGICA NUEVA ----
  // Obtenemos la referencia al botón que acabamos de crear en el HTML.
  const calculateButton = document.getElementById("calculate-btn");

  // Le decimos al botón que escuche por un clic.
  calculateButton.addEventListener("click", () => {
    // Cuando se haga clic, buscamos el input y obtenemos su valor.
    const quantity = document.getElementById("quantity").value;

    // Llamamos a una nueva función que se encargará de hacer los cálculos.
    calculateAndDisplay(selectedRecipe, quantity);
  });
}

// Esta función principal se encarga de crear y mostrar los botones de las recetas.
function displayRecipeList() {
  // Limpia el contenedor para no duplicar botones si se llama la función de nuevo.
  recipeContainer.innerHTML = "";

  // Recorre cada objeto 'recipe' dentro del arreglo 'recipes'.
  recipes.forEach((recipe) => {
    // Por cada receta, crea un elemento <button> en memoria.
    const button = document.createElement("button");

    // Asigna el nombre de la receta como el texto visible del botón.
    button.innerText = recipe.name;

    // Agrega una clase CSS al botón para poder darle estilos.
    button.classList.add("recipe-button");

    // Guarda el 'id' único de la receta en el botón (ej: data-id="3").
    button.dataset.id = recipe.id;

    // Añade el botón recién creado al contenedor en el HTML.
    recipeContainer.appendChild(button);

    // Le dice al botón que "escuche" por un clic.
    button.addEventListener("click", () => {
      // Cuando se hace clic, llama a la función 'displaySelectedRecipe' y le pasa el ID de la receta actual.
      displaySelectedRecipe(recipe.id);
    });
  });
}

// En script.js, añade esta nueva función al final

function calculateAndDisplay(recipe, quantity) {
  // Validamos que la cantidad no sea un número inválido o menor a 1.
  if (!quantity || quantity < 1) {
    alert("Por favor, introduce una cantidad válida (1 o más).");
    return;
  }

  // Buscamos el contenedor donde irá el resultado.
  const resultContainer = document.getElementById("calculated-recipe");

  // Empezamos a construir el HTML para el resultado.
  let resultHtml = `
    <h4>Receta calculada para ${quantity} lote(s):</h4>
    <ul>
  `;

  // Recorremos los ingredientes de la receta.
  recipe.ingredients.forEach((ingredient) => {
    // ¡LA MAGIA OCURRE AQUÍ!
    // Multiplicamos la cantidad base del ingrediente por la cantidad de lotes.
    const calculatedAmount = ingredient.amount * quantity;

    // Añadimos el ingrediente con su nueva cantidad a la lista.
    // .toFixed(2) es para redondear a 2 decimales, útil si hay números como 3.15.
    resultHtml += `<li>${ingredient.name}: ${calculatedAmount.toFixed(2)} ${
      ingredient.unit
    }</li>`;
  });

  resultHtml += `</ul>`;

  // Finalmente, inyectamos el resultado en su contenedor.
  resultContainer.innerHTML = resultHtml;
}

// Llama a la función para que se ejecute en cuanto carga la página.
displayRecipeList();
