// currently-online

function fetch_and_update() {
    fetch('/info')
        .then(data => data.json())
        .then(json => {
            document.getElementById('currently-online').innerHTML = `${json['players_online']} out of ${json['max_players']}`;
            document.getElementById('game-difficulty').innerHTML = json["difficulty"];
            document.getElementById('seed').innerHTML = json["seed"];
            document.getElementById('world-border').innerHTML = json["worldborder"];
            document.getElementById('current-day').innerHTML = `The day is ${json['day']}`;
        });
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        fetch_and_update();
    }
};
