export async function getCurrentTime(): Promise<number> {
  const date = new Date();
  return date.getDate();
}

