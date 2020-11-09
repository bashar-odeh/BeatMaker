 class Drumkit {
     constructor() {

         this.pad = document.querySelectorAll(".pad");
         this.kickSound = document.querySelector(".kick-sound");
         this.snareSound = document.querySelector(".snare-sound");
         this.hihatSound = document.querySelector(".hihat-sound");
         this.index = 0;
         this.bpm = 50; //beat per minute;
         this.counter = 2;
         this.addSound = document.querySelector(".addSound");
         this.kickSelect = document.querySelector("#kick-select");
         this.snareSelect = document.querySelector("#snare-select");
         this.hihatSelect = document.querySelector("#hihat-select");
         this.stopOrPlay = false;
     }
     soundAdder() {

         const file = document.querySelector("#file");
         const addSelect = document.querySelector("#add-select");
         addSelect.addEventListener("change", () => {
             const type = addSelect.value;
             file.addEventListener("change", (event) => {
                 const addSound = document.querySelector(".addSound")
                 addSound.addEventListener("click", () => {
                     const option = document.createElement("option");
                     const reader = new FileReader();
                     reader.onload = function() {

                         option.value = reader.result;
                         var s = file.value;
                         var x = s.lastIndexOf('\\') + 1;
                         s = s.substring(x, s.length);
                         option.innerText = s.substring(0, s.length - 4);

                     }
                     console.log(file.files[0]);
                     reader.readAsDataURL(file.files[0]);

                     if (type === "Kick") {
                         this.kickSelect.appendChild(option);
                     } else if (type === "Snare") {
                         this.snareSelect.appendChild(option);
                     } else {
                         this.hihatSelect.appendChild(option);
                     }
                 });
             });
         });

     }
     abilityToChangeSound() {

         const kickSound = document.querySelector(".kick-sound");
         this.kickSelect.addEventListener("change", () => {
             kickSound.src = this.kickSelect.value;
         });

         const snareSound = document.querySelector(".snare-sound");
         this.snareSelect.addEventListener("change", () => {
             snareSound.src = this.snareSelect.value;
         });

         const hihatSound = document.querySelector(".hihat-sound");
         this.hihatSelect.addEventListener("change", () => {
             hihatSound.src = this.hihatSelect.value;
         });
     }
     abilityToMute() {
         const kickVolume = document.querySelector(".kick-volume");
         kickVolume.addEventListener("click", () => {
             if (drumkit.kickSound != null) {
                 drumkit.muteKick()
             } else {
                 drumkit.kickSound = document.querySelector(".kick-sound");
             }
         })
         const snareVolume = document.querySelector(".snare-volume");
         snareVolume.addEventListener("click", () => {

             if (drumkit.snareSound != null) {
                 drumkit.muteSnare()
             } else {
                 drumkit.SnareSound = document.querySelector(".kick-sound");
             }
         })
         const hihatVolume = document.querySelector(".hihat-volume");
         hihatVolume.addEventListener("click", () => {

             if (drumkit.hihatSound != null) {
                 drumkit.muteHihat()
             } else {
                 drumkit.hihatSound = document.querySelector(".kick-sound");
             }
         })
     }
     muteKick() {
         this.kickSound = null;
     }
     muteSnare() {
         this.snareSound = null;
     }
     muteHihat() {
         this.hihatSound = null;
     }
     repeat() {
         let step = this.index % 8;
         const activeBars = document.querySelectorAll(`.b${step}`);

         activeBars.forEach((bar) => {

             bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
             if (bar.classList.contains("active")) {
                 if (bar.classList.contains("kick-pad")) {
                     if (this.kickSound != null) {
                         this.kickSound.currentTime = 0
                         this.kickSound.play();
                     }
                 }
                 if (bar.classList.contains("snare-pad")) {

                     if (this.snareSound != null) {
                         this.snareSound.currentTime = 0

                         this.snareSound.play();
                     }
                 }
                 if (bar.classList.contains("hihat-pad")) {
                     this.kickSound.currentTime = 0

                     if (this.hihatSound != null) {
                         this.hihatSound.currentTime = 0

                         this.hihatSound.play();
                     }
                 }
             }
         });


     }
     start() {
         var interval = (this.bpm / 60) * 1000;

         //start 
         this.intervalstate = setInterval(() => {

             this.repeat();
             this.index++;

         }, interval);


     }

     activePad() {
         this.pad.forEach((pad) => {
             pad.addEventListener("animationend", () => {

                 pad.style.animation = "";
             });
             pad.addEventListener("click", () => {
                 pad.classList.toggle("active");
             });

         });
     }

     startPlaying() {

         const play = document.querySelector(".play");
         play.addEventListener("click", () => {
             if (this.counter % 2 == 0) {
                 this.start();
             } else {
                 clearInterval(this.intervalstate);
                 this.index = 0;
             }
             this.counter++;
         });
     }

 }
 const drumkit = new Drumkit();
 drumkit.activePad();
 drumkit.startPlaying();
 drumkit.abilityToMute();
 drumkit.abilityToChangeSound();
 drumkit.soundAdder();