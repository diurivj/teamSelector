
const speed = 5000;
let interval;
let teams = [];
let team = [];
//const mp3 = new Audio();
let mp3 = document.createElement('audio');
mp3.src="assets/fail.mp3";
//mp3.src="assets/im.mp3";
mp3.loop = true;
// mp3.addEventListener('ended', ()=>{
//     this.currentTime = 0;
//     this.play();
// }, false);

// setInterval(()=>{
//     mp3.pause();
//     mp3.currentTime = 0;
//     mp3.play();
// },30000)
function shuffle(){
    for(s of Array(100)){
        let random = Math.floor(students.length * Math.random());
        let aux = students[random];
        students[random] = students[0];
        students[0] = aux;
    }
}

function setStudents(){
    //clear
    $('.cuadricula').html('');
    clearInterval(interval);
    interval = 0;
    students = JSON.parse(respaldo);
    shuffle();
    for(s of students){
        $('.cuadricula').append(`
        <div id="${s.name}" class="cover"></div>
        `);
    }
}

function doInterval(){
    if(interval > 0) return;
    interval = setInterval(()=>{
        uncover();
        console.log("open");
    },speed);

}
function uncover(){
    const total = students.length;
    if(total<1){
        clearInterval(interval);
        $('.teams').addClass("animated pulse infinite")
        return;
    }
    let random = Math.floor(students.length * Math.random());
    let student = students[random];
    $(`#${student.name}`).css('background-image', `url('${student.pic}')`);
    //$(`#${student.name}`).addClass('animated flipInY')
    $(`#${student.name}`).addClass('flip')
    makeTeam(students.splice(random,1)[0]);
}

function makeTeam(student){
    //console.log(student);
    if(team.length === 1){
        team.push(student);
        teams.push(team);
        console.log(team)
        team = [];
        showTeams();
    }else{
        team.push(student);
        console.log(team);
    }
}

function showTeams(){
    const div = $('.teams').html('');
    for(let team of teams){
        div.append(`
        <div class="team animated wobble">
            <img src="${team[0].pic}" />
            <img src="${team[1].pic}" />
        <p>Equipo: ${teams.indexOf(team) + 1}</p>
        <h2>${team[0].name} + ${team[1].name}</h2>
        </div>
        `)
    }
}

function start(){
    doInterval();
    mp3.currentTime = 0;
    mp3.play();
}

function reset(){
    setStudents();
    allClear();
}

function allClear(){
    mp3 = new Audio();
    mp3.src="assets/fail.mp3";
    mp3.loop = true;
    teams = [];
    $('.teams').removeClass("animated pulse infinite");
    showTeams();
}


$('#start').click(()=>{
    start();
});

$('#reset').click(()=>{
    reset();
});


//<div style="background-image:url('${s.pic}')" class="cover">${s.name}</div>