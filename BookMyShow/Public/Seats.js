const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('c'); 
let seats= [];
let abooked;
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
        abooked=abooked.concat(seats);

        fetch("/abooked", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ no: index, seats: abooked })
    });
         window.location.replace('confirmation.html');
        
}
document.addEventListener("DOMContentLoaded", function(){
    async function getseats(){
        var dets=await fetch("/api/booked",{
            method:"POST",
                headers:{
                    "Content-Type":"text/plain"   
                },
                body:index
            });
        var booked=await dets.json();
        bookedseats(booked);
    }
    getseats();});
function bookedseats(booked){
    if(booked==""){
        booked=[];
    }
    for(let g in booked){
        let s=document.getElementById(booked[g]);
        s.disabled=true;
        var label = document.querySelector('label[for='+booked[g]+']');
        label.style.backgroundColor= "#282727"; 
        }
    abooked=booked;
    }
