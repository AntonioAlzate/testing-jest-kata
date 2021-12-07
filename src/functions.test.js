import { createEvent } from "./functions";

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date("2021-12-07T10:20:30Z").getTime());
});

// Datos y métodos necesarios para pruebas
const data = {
  weekday: "mon",
  week: 1,
  openHour: 8,
  closeHour: 14
};

const NUM_DAY = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 };

function addDays(days) {
  return new Date(new Date().setDate(new Date().getDate() + days));
}

function getDateCalendar(numDay, currentDay) {
  if (numDay >= currentDay && parseInt(closeHour) >= hour) {
    //posterior a dia de la semana
    return addDays(numDay - currentDay + 7 * (data.week - 1));
  }
  return addDays(numDay - currentDay + 7 * (data.week - 1));
}

test("Validation a event title and content basic", () => {
  const result = createEvent(
    data.weekday,
    data.week,
    data.openHour,
    data.closeHour
  );

  expect(result.title).toBe("[SOFKA U] Meeting Room");
  expect(result.description).toBe("Mentoring and Practice");
  expect(result.duration).toEqual([6, "hour"]);
});

test("Validation start date", () => {
  const startDate = getDateCalendar(NUM_DAY[data.weekday], new Date().getDay());

  const result = createEvent(
    data.weekday,
    data.week,
    data.openHour,
    data.closeHour
  );

  expect(result.start).toEqual(startDate);
});

test("Validation date", () => {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const startDate = getDateCalendar(NUM_DAY[data.weekday], new Date().getDay());

  const date = new Date(startDate).toLocaleDateString("es-ES", options);
  const result = createEvent(
    data.weekday,
    data.week,
    data.openHour,
    data.closeHour
  );

  expect(result.date).toEqual(date);
});

test("Validation illegal arguments", () => {
  // Para Argumento ilegal en el horario de entrada. --> (closeHour - openHour) < 0)
  const errorHorario = () => {
    createEvent(dat.weekday, data.week, 24, 10);
  };

  // Para Argumento ilegal para la semana, debe ser un valor positivo. --> (week < 0)
  const ErrorSemana = () => {
    createEvent(data.weekday, -10, data.openHour, data.closeHour);
  };

  // Para Argumento ilegal el dia de la semana, valores posibles; 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' y 'sun'.
  const ErrorDiaSemana = () => {
    createEvent("m", data.week, data.openHour, data.closeHour);
  };

  // Comprobaciones
  expect(errorHorario).toThrow(Error);
  expect(ErrorSemana).toThrow(Error);
  expect(ErrorDiaSemana).toThrow(Error);
});

test("create an event list of at least 10 events", () => {
  const listaEventos = [
    {
      weekday: "mon",
      week: 1,
      openHour: 8,
      closeHour: 10
    },
    {
      weekday: "tue",
      week: 2,
      openHour: 12,
      closeHour: 14
    },
    {
      weekday: "wed",
      week: 3,
      openHour: 20,
      closeHour: 24
    },
    {
      weekday: "thu",
      week: 4,
      openHour: 18,
      closeHour: 22
    },
    {
      weekday: "fri",
      week: 5,
      openHour: 10,
      closeHour: 16
    },
    {
      weekday: "sat",
      week: 6,
      openHour: 19,
      closeHour: 24
    },
    {
      weekday: "sun",
      week: 7,
      openHour: 9,
      closeHour: 13
    },
    {
      weekday: "mon",
      week: 8,
      openHour: 10,
      closeHour: 14
    },
    {
      weekday: "tue",
      week: 9,
      openHour: 8,
      closeHour: 10
    },
    {
      weekday: "wed",
      week: 10,
      openHour: 16,
      closeHour: 19
    },
  ];

  listaEventos.map(e => {
    const result = createEvent(
        e.weekday,
        e.week,
        e.openHour,
        e.closeHour
      );

      const duracion = [e.closeHour - e.openHour, "hour"];
    
      expect(result.title).toBe("[SOFKA U] Meeting Room");
      expect(result.description).toBe("Mentoring and Practice");
      expect(result.duration).toEqual(duracion);
  })
});
