new autoComplete({
    data: {                              // Data src [Array, Function, Async] | (REQUIRED)
        src: async () => {
            // Fetch External Data Source
            let query   = document.getElementById('autoComplete').value;
            console.log("Query: " + query);
            const source = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=67d6da3847ec38002c6ddd186648528d&language=en-US&query=${query}&page=1&include_adult=false`);
            // const source = await fetch(`https://jsonplaceholder.typicode.com/posts`);

            // Format data into JSON
            const data = await source.json();
            // Return Fetched data
            return data.results;
        },
        key: ["title"],
        cache: false
    },
    query: {                               // Query Interceptor                 | (Optional)
        manipulate: (query) => {
            return query;
        }
    },
    // sort: (a, b) => {                    // Sort rendered results ascendingly | (Optional)
    //     if (a.match < b.match) return -1;
    //     if (a.match > b.match) return 1;
    //     return 0;
    // },
    placeHolder: "Movie Search...",     // Place Holder text                 | (Optional)
    selector: "#autoComplete",           // Input field selector              | (Optional)
    threshold: 2,                        // Min. Chars length to start Engine | (Optional)
    debounce: 300,                       // Post duration for engine to start | (Optional)
    searchEngine: "strict",              // Search Engine type/mode           | (Optional)
    resultsList: {                       // Rendered results list object      | (Optional)
        render: true,
        container: source => {
            resultsListID = "food_List";
            return resultsListID;
        },
        destination: document.querySelector("#autoComplete"),
        position: "afterend",
        element: "ul"
    },
    maxResults: 5,                         // Max. number of rendered results | (Optional)
    highlight: true,                       // Highlight matching results      | (Optional)
    resultItem: {                          // Rendered result item            | (Optional)
        content: (data, source) => {
            source.innerHTML = data.match;
        },
        element: "li"
    },
    // noResults: () => {                     // Action script on noResults      | (Optional)
    //     const result = document.createElement("li");
    //     result.setAttribute("class", "no_result");
    //     result.setAttribute("tabindex", "1");
    //     result.innerHTML = "No Results";
    //     document.querySelector("#autoComplete_results_list").appendChild(result);
    // },
    onSelection: feedback => {             // Action script onSelection event | (Optional)
        console.log(feedback.selection.value.image_url);
    }
});
