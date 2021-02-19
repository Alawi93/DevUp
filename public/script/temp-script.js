/*
Temporary script to load content into the content body of the frame
 */

$(document).ready(function () {
    refreshContent();      
});

function refreshContent() {
    const contentDiv = document.getElementById("content");
    // Clear div
    contentDiv.innerHTML = "";
    // Populate div
    for(i = 0 ; i < 9 ; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card-test shadow";
        contentDiv.appendChild(cardDiv);

        const header = document.createElement("p");
        header.className = "card-header";
        header.innerHTML = "Name";
        cardDiv.appendChild(header);

        const breadText = document.createElement("p");
        breadText.innerHTML = "Hello";
        cardDiv.appendChild(breadText); 

        /*
        Will create this inside <content>:

        <div class="card-test shadow">
            <p class="card-header">Name</p>
            <p>Hello</p>
        </div>
        */
    }
}