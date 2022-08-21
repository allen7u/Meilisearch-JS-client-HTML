










// var index
var index_id
var offset
var options
var query
var estimatedTotalHits 

async function preQuery() {
  
    const client = new MeiliSearch({ host: 'http://127.0.0.1:7700' });
  
    var res = await client.getIndexes({ limit: 999 })
    console.log(res)
    for (let i in res.results) {
        if (res.results.hasOwnProperty(i)) {
            console.log(i,res.results[i])
            console.log(i,res.results[i].uid)
            let button = document.createElement('button')
            button.textContent = res.results[i].uid
            button.onclick = async () => {
                console.log(index_id);
                index_id = res.results[i].uid;
                index = client.index(index_id);
                var updated = await index.updateFilterableAttributes(["parent_id"]);
                var p = document.createElement('p')
                p.innerText = `${index_id}["parent_id"] updateFilterableAttributes done`
                document.body.append(p);
            }
            var button_container = document.getElementById('index_selector_container')
            button_container.append(button)
        }
    }
  }
preQuery()

async function search( index_id, query, options ) {
    
    const client = new MeiliSearch({
        host: "http://localhost:7700",
    });
    
    index = client.index( index_id );
    // await index.updateFilterableAttributes([ "parent_id"]);
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
        const content = hit._formatted.content;
        const contentWithBreaks = content.replace(/__LINE_BREAK__/g, '<br>');
        li.innerHTML = contentWithBreaks;
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
    query = e.target.value;
    console.log(query);
    options = {
        limit:20,
        offset:0,
        attributesToHighlight: ["content"],
        highlightPreTag: "<mark>",
        highlightPostTag: "</mark>",
        facets:['parent_id']
    };
    const r = await search( index_id, query, options );
    console.log(r);
    // for (var i = 0; i < r.hits.length; i++) {
    //     console.log(r.hits[i]);
    // }
    estimatedTotalHits = r.estimatedTotalHits;
    appendHitsToUl(r);
    // appendFacetsToUl(r);
}
);

// next page
document.querySelector("#next_page").addEventListener("click", next_page
);

// previous page
document.querySelector("#previous_page").addEventListener("click", previous_page
);

// bind right arrow key to next page
document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowRight' || e.key == 'f') {
        next_page();
        }
    }
);

// bind left arrow key to previous page
document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowLeft' || e.key == 'd') {
        previous_page();
        }
    }
);

// on document load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    randomDivBg();
    }
);

async function previous_page (e) {
    if(options.offset - options.limit >= 0) {
    options.offset -= options.limit;
    }
    const r = await search(index_id, query, options);
    console.log(r);
    // for (var i = 0; i < r.hits.length; i++) {
    //     console.log(r.hits[i]);
    // }
    appendHitsToUl(r);
};


async function next_page (e) {
    if(options.offset + options.limit < estimatedTotalHits) {
        options.offset += options.limit;
    }
    const r = await search(index_id, query, options);
    console.log(r);
    // for (var i = 0; i < r.hits.length; i++) {
    //     console.log(r.hits[i]);
    // }
    appendHitsToUl(r);
};

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
    // console.log(div)
    // console.log(div.style)
    // console.log(div.textContent)
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