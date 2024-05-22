import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from "axios";

const vercelToken = "7Gl6hTJtBBdEc44Yzvbja1mM";
// export async function POST(request: NextApiRequest, response: NextResponse) {
//   try {
//     const requestBody = {
//       gitSource: {
//         ref: "master",
//         repoId: "790806378",
//         type: "github",
//         sha: "d0856f6",
//       },
//       name: "propello-morning-test2",
//       deploymentId:"prj_4MO1vaP0klYgNDMwu0t8j8XE5gKt", // only to redeploy

//       projectSettings: {
//         framework: "nextjs",
//       },
//       gitMetadata: {
//         remoteUrl: "https://github.com/lokichaulagain/propello-storefront",
//       },
//     };

//     const response = await axios.post("https://api.vercel.com/v13/deployments", requestBody, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${vercelToken}`,
//       },
//     });

//     // const res = await axios.get("https://jsonplaceholder.typicode.com/users ");
//     return NextResponse.json(response.data, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(error, { status: 500 });
//   }
// }

// export async function POST(request: any, response: any) {
//   try {
//     const result = await fetch("https://api.vercel.com/v10/projects/prj_4MO1vaP0klYgNDMwu0t8j8XE5gKt", {
//       body: JSON.stringify({
//         key: "NEXT_PUBLIC_USER_ID",
//         value: "1",
//         // type: "plain",
//         target: ["preview", "production", "development"],
//         gitBranch: "master",
//         comment: "database connection string for production",
//       }),
//       headers: {
//         Authorization: `Bearer ${vercelToken}`,
//         "Content-Type": "application/json",
//       },
//       method: "post",
//     });
//     const data = await result.json();
//     // res.status(200).json(data);
//   } catch (error: any) {
//     return NextResponse.json(error, { status: 500 });
//   }
// }

// export async function POST(request: NextApiRequest, response: NextResponse) {
//   try {

//     const requestBody = {
//       key: "NEXT_PUBLIC_USER_ID",
//       value: 1,
//       type: "plain",
//       target: ["preview"],
//       gitBranch: "feature-1",
//       comment: "database connection string for production",
//     };

//     // await fetch("https://api.vercel.com/v10/projects/prj_XLKmu1DyR1eY7zq8UgeRKbA7yVLA/env?slug=SOME_STRING_VALUE&teamId=SOME_STRING_VALUE&upsert=true", {

//     const response = await axios.post("https://api.vercel.com/v10/projects/propello-morning-3", requestBody, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${vercelToken}`,
//       },
//     });

//     // const res = await axios.get("https://jsonplaceholder.typicode.com/users ");
//     return NextResponse.json(response.data, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(error, { status: 500 });
//   }
// }

// key: "NEXT_PUBLIC_USER_ID",
// value: 1,
// type: "plain",
// target: ["preview"],

// await fetch("https://api.vercel.com/v13/deployments", {
//   "body": {
//     "name": "my-instant-deployment"
//   },
//   "headers": {
//     "Authorization": "Bearer <TOKEN>"
//   },
//   "method": "post"
// })

// export default async function handler(request: NextApiRequest, response: NextApiResponse<{}>) {
//   const result = await fetch("https://api.vercel.com/v13/deployments?forceNew=0&skipAutoDetectionConfirmation=0&slug=SOME_STRING_VALUE&teamId=SOME_STRING_VALUE", {
//     body: {
//       name: "my-instant-deployment",
//       deploymentId: "SOME_STRING_VALUE",
//       files: [
//         {
//           InlinedFile: {
//             data: "SOME_STRING_VALUE",
//             encoding: "base64",
//             file: "folder/file.js",
//           },
//         },
//       ],
//       gitMetadata: {
//         remoteUrl: "https://github.com/vercel/next.js",
//         commitAuthorName: "kyliau",
//         commitMessage: "add method to measure Interaction to Next Paint (INP) (#36490)",
//         commitRef: "main",
//         commitSha: "dc36199b2234c6586ebe05ec94078a895c707e29",
//         dirty: true,
//       },
//       gitSource: {
//         ref: "SOME_STRING_VALUE",
//         repoId: "",
//         sha: "SOME_STRING_VALUE",
//         type: "github",
//       },
//       meta: "{foo:bar}",
//       monorepoManager: "SOME_STRING_VALUE",
//       project: "my-deployment-project",
//       projectSettings: {
//         buildCommand: "SOME_STRING_VALUE",
//         commandForIgnoringBuildStep: "SOME_STRING_VALUE",
//         devCommand: "SOME_STRING_VALUE",
//         framework: "blitzjs",
//         installCommand: "SOME_STRING_VALUE",
//         nodeVersion: "20.x",
//         outputDirectory: "SOME_STRING_VALUE",
//         rootDirectory: "SOME_STRING_VALUE",
//         serverlessFunctionRegion: "SOME_STRING_VALUE",
//         skipGitConnectDuringLink: true,
//         sourceFilesOutsideRootDirectory: true,
//       },
//       target: "staging",
//       withLatestCommit: true,
//     },
//     headers: {
//       Authorization: "Bearer <TOKEN>",
//     },
//     method: "post",
//   });
//   const data = await result.json();
//   res.status(200).json(data);
// }
