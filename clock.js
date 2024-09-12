// format any unit of digital clock
function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}

// Select time zone
let ist = true;

// rotate every hand of clock accordingly
function updateDigitalClock(){
    // Get the current UTC time
    let nowUTC = new Date();
    let utcHours = nowUTC.getUTCHours();
    let utcMinutes = nowUTC.getUTCMinutes();
    let utcSeconds = nowUTC.getUTCSeconds();

    // Calculate the IST time
    let nowIST = new Date();
    let istHours = nowIST.getHours();
    let istMinutes = nowIST.getMinutes();
    let istSeconds = nowIST.getSeconds();


    // // Calculate the IST time

    // nowIST is calculated by creating a new Date object with the time adjusted by 5 hours and 30 minutes (5.5 hours) from UTC. This is done by adding (5.5 * 60 * 60 * 1000) milliseconds to the UTC time.
    // let nowIST = new Date(nowUTC.getTime() + (5.5 * 60 * 60 * 1000));
    // let istHours = nowIST.getUTCHours();
    // let istMinutes = nowIST.getUTCMinutes();
    // let istSeconds = nowIST.getUTCSeconds();

    // Analog Clock - UTC
    let utcHourRotation = (30 * utcHours) + (utcMinutes / 2);
    let utcMinuteRotation = 6 * utcMinutes;
    let utcSecondRotation = 6 * utcSeconds;

    // Analog Clock - IST
    let istHourRotation = (30 * istHours) +  (istMinutes / 2);
    let istMinuteRotation = 6 * istMinutes;
    let istSecondRotation = 6 * istSeconds;

    let hourRotation = (!ist) ? utcHourRotation : istHourRotation;
    let minuteRotation = (!ist) ? utcMinuteRotation : istMinuteRotation;
    let secondRotation = (!ist) ? utcSecondRotation : istSecondRotation;

    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    let second = document.getElementById("second");

    function getHandRotation(hourRotation,minuteRotation,secondRotation){
        hour.style.transform = `rotate(${hourRotation}deg)`;
        minute.style.transform = `rotate(${minuteRotation}deg)`;
        second.style.transform = `rotate(${secondRotation}deg)`;
    }

    getHandRotation(hourRotation, minuteRotation, secondRotation);



    // Digital clock - IST
    let UTCorIST = document.getElementById("UTCorIST");
    let digitalHour = document.getElementById("digitalHour");
    let digitalMinute = document.getElementById("digitalMinute");
    let digitalSecond = document.getElementById("digitalSecond");

    let UTCorISTZone = (!ist) ? "UTC" : "IST";
    let hourTime = (!ist) ? utcHours : istHours;
    let minuteTime = (!ist) ? utcMinutes : istMinutes;
    let secondTime = (!ist) ? utcSeconds : istSeconds;
    
    UTCorIST.innerHTML = `${UTCorISTZone}=== `;
    digitalHour.innerHTML = formatTime(hourTime);
    digitalMinute.innerHTML = formatTime(minuteTime);
    digitalSecond.innerHTML = formatTime(secondTime);

    let differenceUTCIST = document.getElementById("differenceUTC-IST");
    differenceUTCIST.innerHTML = `Difference (UTC - IST): 5 hours 30 minutes`
}

// Function to handle time zone change
function handleTimeZoneChange() {
    const zoneSelect = document.getElementById("zone");
    ist = zoneSelect.value === "true"; // Update the 'ist' variable based on selection
    updateDigitalClock(); // Update clock immediately after changing time zone
}

// Attach event listener for the dropdown selection change
document.getElementById("zone").addEventListener("change", handleTimeZoneChange);

// Call this function every second
setInterval(updateDigitalClock, 1000);




// Date code
let date = new Date();
let digitalDate = document.getElementById("today-date");
digitalDate.innerHTML = `Date: ${formatTime(date.getDate())}-${formatTime(date.getMonth() + 1)}-${date.getFullYear()}`;