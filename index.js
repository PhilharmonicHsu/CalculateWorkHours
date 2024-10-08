/**
 * Lists 10 upcoming events in the user's calendar.
 * @see https://developers.google.com/calendar/api/v3/reference/events/list
 * @App script: https://script.google.com/home/projects/1Bu-GHwcs4wJX0OdtK0LGVBQo1DZVS-JpR0O-AdfJl8IjNzHasJoqL5pD/edit
 */
function calculateWorkHours() {
    const calendarId = 'primary';
    const optionalArgs = {
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        timeMin: '2024-09-01T00:00:00-07:00',
        timeMax: '2024-10-31T00:00:00-07:00',
    };

    try {
        const response = Calendar.Events.list(calendarId, optionalArgs);
        const events = response.items.filter(event => {
            return event.summary.includes('Manchu');
        });
        let totalHours = 0;

        if (events.length === 0) {
            console.log('No upcoming events found');

            return;
        }

        // Print the calendar events
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

        console.log(totalHours);
    } catch (err) {
        console.log('Failed with error %s', err.message);
    }
}