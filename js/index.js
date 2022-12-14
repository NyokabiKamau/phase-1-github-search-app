const GITHUBAPI = 'https://api.github.com'
const GITHUBSEARCH = 'https://api.github.com/search/users?q='

// Add event listener to submit button
document.querySelector('form').addEventListener('submit',search);

// function to execute when submit button is clicked
function search(e){
    e.preventDefault();
    const searchValue = e.target.querySelector('#search').value;

    fetch(`${GITHUBSEARCH}${searchValue}`)
    .then(resp => resp.json())
    .then(users)
}

function users(info){
    console.log(info)
    const names = info.items;
    
    for(let item of names){
        // Create button to display username
        const header = document.createElement('button');
        header.textContent = item.login;

        // Create img element to display image
        const image = document.createElement('img')
        image.src = item.avatar_url;
        image.alt = `${image.login} image`

        // create div to arrange header and img
        const div = document.createElement('div');
        div.className = 'heading'
        div.append(image,header);

        // create <a> element to display link to profile
        const link = document.createElement('a');
        link.href = item.html_url
        link.target = "_blank";
        link.textContent = `Visit ${item.login}`;

        // Append to li item
        const li = document.createElement('li');
        li.append(div,link);

        // Appned li element to ul with id 'user-list'
        document.getElementById('user-list').append(li);

        // Add event listener to img item
        header.addEventListener('click',(e)=>{
            document.getElementById('repos-list').innerHTML = "";
            document.getElementById('repos-list').style.border = "none";
            console.log(item.login);
            e.preventDefault();
            fetch(`https://api.github.com/users/`+item.login+`/repos`)
            .then(response => response.json())
            .then(printRepos)
        })


        // Function to display the repositories on the page
        function repositories(repos){
            console.log(repos)
            const title = document.createElement('h2');
            title.textContent = `${item.login} Repositories`
            document.getElementById('repos-list').append(title)
            document.getElementById('repos-list').style.border = "dotted 5px red";

            for (let i of repos){
                const repoItem = document.createElement('li')
                repoItem.textContent = i.name
                document.getElementById('repos-list').append(repoItem);
            }
        }  
    }
}
