import { addDays, format } from "date-fns";

export interface BookingDate {
  title: Date;
  data: string[];
}

const CosmosClient = require("@azure/cosmos").CosmosClient;
const endpoint = "https://office-booking-app.documents.azure.com:443/";
const authOrResourceToken =
  "44b6UQH8JT8cIo17GOw3BAsJlQlf4MG3NeDM7i9zYMSYCBbbSkSFGsHNRbhQdUTAOfg2j50nvqB3Tr8E6YpsZg==";
const databaseId = "office-bookings";
const containerId = "bookings";
const client = new CosmosClient({ endpoint, authOrResourceToken });

export async function loadCalendar(date: Date): Promise<BookingDate[]> {
  // const querySpec = {
  //   query: `SELECT * from c where c.date >= ${format(
  //     date,
  //     "yyyy-MM-dd"
  //   )} and c.date < ${format(addDays(date, 7), "yyyy-MM-dd")}`,
  // };

  // const response = client
  //   .database(databaseId)
  //   .container(containerId)
  //   .items.query(querySpec)
  //   .fetchAll();

  // console.log(JSON.stringify(response, null, 2));

  const response2 = {
    json: [
      { title: date, data: randomStringArray() },
      { title: addDays(date, 1), data: randomStringArray() },
      { title: addDays(date, 2), data: randomStringArray() },
      { title: addDays(date, 3), data: randomStringArray() },
      { title: addDays(date, 4), data: randomStringArray() },
    ],
  };
  const json = await response2.json;
  return json;
}

const names: string[] = [
  "leo.tester@extrinsicaglobal.com",
  "james.tester@extrinsicaglobal.com",
  "hannah.tester@extrinsicaglobal.com",
  "neil.tester@extrinsicaglobal.com",
  "alex.tester@extrinsicaglobal.com",
  "kate.tester@extrinsicaglobal.com",
  "dave.tester@extrinsicaglobal.com",
  "chris.tester@extrinsicaglobal.com",
];

function randomStringArray(): string[] {
  let firstRandom = getRndInteger(0, names.length - 1);
  var result: string[] = [];
  for (var i = 0; i < firstRandom; i++) {
    result.push(names[getRndInteger(0, names.length - 1)]);
  }
  return result;
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
