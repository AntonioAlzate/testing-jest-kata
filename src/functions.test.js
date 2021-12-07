import { createEvent } from './functions'

beforeAll(() => { 
    global.Date.now = jest.fn(() => new Date('2021-12-07T10:20:30Z').getTime()) 
});

const data = {
    weekday: "mon",
    week: 1,
    openHour: 8,
    closeHour:14
}

test('Validation a event title and content basic', () => {
    
    const result = createEvent(data.weekday, data.week, data.openHour, data.closeHour);

    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([6,"hour"]);
});

test('Validation start date', () => {
    //TODO: hacer las verificaciones
});

test('Validation date', () => {
   //TODO: hacer las verificaciones
});


test('Validation illegal arguments', () => {
    //TODO: hacer las verificaciones
});


test('create an event list of at least 10 events', () => {
    //TODO: hacer las verificaciones
});