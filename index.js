/*
* 參考網站
* - https://medium.com/@Hsu.Yang-Min/apps-script-%E9%96%8B%E7%99%BC%E7%9A%84%E5%B0%8F%E5%B9%AB%E6%89%8B-cd1f15eb722b
*
*/
async function getData() {
    const res = await fetch(
        "https://script.google.com/macros/s/AKfycbySZ-gCqT6jK7kc-tu0LVAWW_o9oK2r44-syZitre_NlrbAfgaWdo2Ns-xMkOGJhyRj/exec"
    );
    const events = await res.json();

    let totalHours = 0;

    for (const event of events) {
        let startTime = event.start.dateTime;
        if (! startTime) {
            startTime = event.start.date;
        }

        let endTime = event.end.dateTime;
        if (! endTime) {
            endTime = event.end.date;
        }

        let startTimeObj = new Date(startTime);
        let endTimeObj = new Date(endTime);

        console.log('%s (%s - %s)', event.summary, startTimeObj.toLocaleString(), endTimeObj.toLocaleString());
        totalHours += (endTimeObj.valueOf() - startTimeObj.valueOf()) / (1000 * 60 * 60);
    }

    console.log(totalHours)
}

getData();