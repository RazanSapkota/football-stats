import { Club, Match } from "./types";

const initialState: Club = {
  club: "",
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  gf: 0,
  ga: 0,
  gd: 0,
  points: 0,
  forms: [],
};

// export function mapbyClubname(list: Match[]) {
//   let categoryMap: any = {};
//   list.forEach((match) => {
//     if (categoryMap.hasOwnProperty(match.team1)) {
//       categoryMap[match.team1].push(match);
//     } else {
//       categoryMap[match.team1] = [match];
//     }
//     if (categoryMap.hasOwnProperty(match.team2)) {
//       categoryMap[match.team2].push(match);
//     } else {
//       categoryMap[match.team2] = [match];
//     }
//   });
//   return categoryMap;
// }
const generateClub = (prev: Club, current: Match, name: string) => {
  let ownteam: 0 | 1 = current.team1 === name ? 0 : 1;
  let anotherteam: 0 | 1 = !!ownteam ? 0 : 1;

  let won = 0;
  let lost = 0;
  let drawn = 0;
  let gf = 0;
  let ga = 0;
  let gd = 0;
  let points = 0;
  let status: string[] = [...prev.forms];

  if (current.score) {
    won =
      current.score?.ft[ownteam] * 1 > current.score.ft[anotherteam] * 1
        ? 1
        : 0;
    lost =
      current.score?.ft[ownteam] * 1 < current.score.ft[anotherteam] * 1
        ? 1
        : 0;
    drawn =
      current.score.ft[ownteam] * 1 === current.score.ft[anotherteam] * 1
        ? 1
        : 0;
    gf = current.score.ft[ownteam] * 1;
    ga = current.score.ft[anotherteam] * 1;
    gd = gf - ga;
    points = !!won ? 3 : !!drawn ? 1 : 0;
    !!won
      ? status.unshift("w")
      : !!lost
      ? status.unshift("l")
      : status.unshift("d");
    if (status.length > 5) status.pop();
  }

  const newValue: Club = {
    club: name,
    played: prev.played + 1,
    won: prev.won + won,
    drawn: prev.drawn + drawn,
    lost: prev.lost + lost,
    gf: prev.gf + gf,
    ga: prev.ga + ga,
    gd: prev.gd + gd,
    points: prev.points + points,
    forms: status,
  };
  return newValue;
};

export function mapbyClubname(list: Match[]) {
  let categoryMap: any = {};
  list.forEach((match) => {
    if (categoryMap.hasOwnProperty(match.team1)) {
      categoryMap[match.team1] = generateClub(
        categoryMap[match.team1],
        match,
        match.team1
      );
    } else {
      categoryMap[match.team1] = generateClub(initialState, match, match.team1);
    }
    if (categoryMap.hasOwnProperty(match.team2)) {
      categoryMap[match.team2] = generateClub(
        categoryMap[match.team2],
        match,
        match.team2
      );
    } else {
      categoryMap[match.team2] = generateClub(initialState, match, match.team2);
    }
  });
  return categoryMap;
}

// export function createData(name: string, match: Match[]) {
//   return match.reduce(
//     (prev: Club, own) => {
//       let ownteam: 0 | 1 = own.team1 === name ? 0 : 1;
//       let anotherteam: 0 | 1 = !!ownteam ? 0 : 1;

//       let won = 0;
//       let lost = 0;
//       let drawn = 0;
//       let gf = 0;
//       let ga = 0;
//       let gd = 0;
//       let points = 0;
//       let status: string[] = [...prev.forms];

//       if (own.score) {
//         won =
//           own.score?.ft[ownteam] * 1 > own.score.ft[anotherteam] * 1 ? 1 : 0;
//         lost =
//           own.score?.ft[ownteam] * 1 < own.score.ft[anotherteam] * 1 ? 1 : 0;
//         drawn =
//           own.score.ft[ownteam] * 1 === own.score.ft[anotherteam] * 1 ? 1 : 0;
//         gf = own.score.ft[ownteam] * 1;
//         ga = own.score.ft[anotherteam] * 1;
//         gd = gf - ga;
//         points = !!won ? 3 : !!drawn ? 1 : 0;
//         if (status.length !== 5)
//           !!won
//             ? status.push("w")
//             : !!lost
//             ? status.push("l")
//             : status.push("d");
//       }

//       const newValue: Club = {
//         club: name,
//         played: prev.played + 1,
//         won: prev.won + won,
//         drawn: prev.drawn + drawn,
//         lost: prev.lost + lost,
//         gf: prev.gf + gf,
//         ga: prev.ga + ga,
//         gd: prev.gd + gd,
//         points: prev.points + points,
//         forms: status,
//       };
//       return newValue;
//     },
//     {
//       club: "",
//       played: 0,
//       won: 0,
//       drawn: 0,
//       lost: 0,
//       gf: 0,
//       ga: 0,
//       gd: 0,
//       points: 0,
//       forms: [],
//     }
//   );
// }
