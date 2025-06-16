import { randomUUID } from 'crypto';

export function generateUUID(data: any[]): string {
  const id = randomUUID();
  if (data.find((item) => item?.id === id)) return generateUUID(data);
  return id;
}
