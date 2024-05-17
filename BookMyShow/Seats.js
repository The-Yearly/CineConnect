let seats = [];
let booked=["seat-6"];
function addseat(seat){
    var seatid = seat.id;
    let seato = document.getElementById(seatid);
    if (seato.checked==true){
        seats.push(seatid);
    }else{
        let sr=seats.indexOf(seat.id);
        seats.splice(sr,1);
    }
}
function Book(){
        alert(seats+" is booked");
}
