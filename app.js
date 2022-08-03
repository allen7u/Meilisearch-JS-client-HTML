


import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
    host: "http://localhost:7700",
    // apiKey: "YourAPIKey"
});

const index = client.index("linely");

await index.updateSortableAttributes([ 'id' ])
await index.updateFilterableAttributes([ "day_index"]);

var r = await index.search(
    "",
    {
        attributesToHighlight: ["content"],
        filter:['day_index = 11'],
        sort: ['id:asc'],
    }
);
console.log(r);

// const search = await index.search(
//     "pup",
//     {
//         attributesToRetrieve: ["day_index", "file_name", "content"],
//         attributesToHighlight: ["content"],
//         filter:['day_index = 11'],
//         sort: ['id:asc'],
//         facets: ['day_index'],
//         limit: 999,
//         offset: 0,
//     }
// );

// await index.updateAttributesForFaceting([
//     'day_index'
//   ])

// {
//     id: 1939,
//     day_index: 400,
//     date: '7月28日',
//     file_name: '#GitHub待续（2022年7月28日～）.txt',
//     content: '** webcord - command line tool that creates scrolling webpages - powered by puppeteer #ffmpeg '
//   }
// ],
// estimatedTotalHits: 12,
// query: 'pup',
// limit: 20,
// offset: 0,
// processingTimeMs: 1
// }

// import { MeiliSearch } from "./meilisearch.esm";
// import { MeiliSearchClient } from "./meilisearch.esm";