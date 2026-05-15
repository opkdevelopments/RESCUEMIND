
export async function getFloodStatus() {
  return new Promise<{ flood_level: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        flood_level: Math.floor(Math.random() * 100),
      });
    }, 1000);
  });
}

export async function getAIAnalysis() {
  const response = await fetch(
    "http://127.0.0.1:8000/ai-analysis"
  );

  return response.json();
}   