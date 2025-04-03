// tests\dbInit.test.js
import Dexie from 'dexie';

let db;

beforeAll(() => {
  db = new Dexie('TestDB');
  db.version(1).stores({
    games: '++id, description, abbreviation, capStamina',
  });
});

test('Simple IndexedDB test', async () => {
  await db.games.add({
    description: 'Test Game',
    abbreviation: 'TG',
    capStamina: 100,
  });

  const allGames = await db.games.toArray();

  expect(allGames.length).toBe(1);
  expect(allGames[0].description).toBe('Test Game');
  expect(allGames[0].abbreviation).toBe('TG');
  expect(allGames[0].capStamina).toBe(100);
});

afterAll(async () => {
  await db.games.clear();
});
