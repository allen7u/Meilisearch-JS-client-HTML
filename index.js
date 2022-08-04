










var index

async function search( index_id, query, options ) {
    
    const client = new MeiliSearch({
        host: "http://localhost:7700",
    });
    
    index = client.index( index_id );
    // await index.updateFilterableAttributes([ "day_index"]);
    var results = await index.search(
        query,
        options
    );
    // console.log(r);
    return results;
}

function appendHitsToUl(results){
    const ul = document.createElement('ul');
    ul.classList.add('hits');
    results.hits.forEach( hit => {
        const li = document.createElement('li');
        li.classList.add('hit-item');
        li.innerText = hit.content;
        ul.appendChild(li);
    } );
    var container = document.getElementById('hits');
    container.innerText = '';
    container.appendChild(ul);
}

function appendFacetsToUl(results){
    const ul = document.createElement('ul');
    ul.classList.add('facets');
    console.log(results.facetDistribution);
    for (var i in results.facetDistribution) {
        if (results.facetDistribution.hasOwnProperty(i)) {
            for (var j in results.facetDistribution[i] ) {
                if ( results.facetDistribution[i].hasOwnProperty(j)) {
                    console.log(i + " -> " + j.slice(0,9) + " -> " + results.facetDistribution[i][j]);
                    const li = document.createElement('li');
                    li.classList.add('facet-item');
                    li.innerText = i + " -> " + j.slice(0,9) + " -> " + results.facetDistribution[i][j];
                    ul.appendChild(li);
                }
            } 
        }
    }
    var container = document.getElementById('facets');
    container.innerText = '';
    container.appendChild(ul);
}

document.querySelector("#search_input").addEventListener("input", async (e) => {
    const query = e.target.value;
    console.log(query);
    const options = {
        limit:20,
        offset:0,
        facets:['day_index','file_name']
    };
    const r = await search( "linely", query, options );
    console.log(r);
    for (var i = 0; i < r.hits.length; i++) {
        console.log(r.hits[i]);
    }
    appendHitsToUl(r);
    appendFacetsToUl(r);
}
);

// on document load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    randomDivBg();
    }
);

function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
  
function randomDivBg(){
// console.log('from randomDivBg')
document.querySelectorAll('div').forEach(function(div){
    console.log(div)
    console.log(div.style)
    console.log(div.textContent)
    div.style.background = getRandomColor()
})
}

// console.log(r.hits[i].id);
// console.log(r.hits[i].content);

// const client = new MeiliSearch({
//     host: "http://localhost:7700",
//     // apiKey: "YourAPIKey"
// });

// const index = client.index("linely");

// // await index.updateSortableAttributes([ 'id' ])
// // await index.updateFilterableAttributes([ "day_index"]);

// var r = await index.search(
//     "",
//     {
//         attributesToHighlight: ["content"],
//         filter:['day_index = 11'],
//         sort: ['id:asc'],
//     }
// );
// console.log(r);








// "F:\Anaconda_Play\Meilisearch - Vanilla Meilisearch.js\node_modules\meilisearch\dist\bundles\meilisearch.esm.js"

// import { MeiliSearch } from 'meilisearch';
// import { MeiliSearch } from "./dist/bundles/meilisearch.esm.js";
// import  {MeiliSearch}  from "./cdn.js";

// console.log('from index.js');