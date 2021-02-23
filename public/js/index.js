// currently-online

function fetch_currently_online() {
    fetch('/info')
        .then(data => data.json())
        .then(json => {
            document.getElementById('currently-online').innerHTML = `${json['players_online']} out of ${json['max_players']}`;
        });
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        fetch_currently_online();
    }
};
