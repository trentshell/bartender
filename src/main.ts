interface Ingredient {
  ingredient: string;
  quantity: number;
  unit: string;
  direction: string;
}

interface Cocktail {
  name: string;
  category: string;
  ingredients: Ingredient[];
  garnish?: string;
  method: string;
}

export async function retrieveCockTails(): Promise<Cocktail[]> {
  try {
    const response = await fetch('/data/iba-cocktails-web.json');
    return await response.json();
  } catch (err) {
    console.error('Failed to fetch cocktails:', err);
    throw err;
  }
}

export async function displayJson() {
  const container = document.getElementById('app');
  const pre = document.createElement('pre');
  pre.id = 'json-dump';
  pre.style.whiteSpace = 'pre-wrap';
  pre.style.wordBreak = 'break-word';
  container?.appendChild(pre);

  try {
    const cocktails = await retrieveCockTails();

    cocktails.forEach((cocktail) => {
      pre.textContent += '\n' + cocktail.name;
    });
  } catch (err) {
    pre.textContent = 'Failed to load data.';
    console.error(err);
  }
}
