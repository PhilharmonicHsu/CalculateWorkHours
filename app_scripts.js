/**
 * Lists 10 upcoming events in the user's calendar.
 * @see https://developers.google.com/calendar/api/v3/reference/events/list
 */
function doGet() {
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

        if (events.length === 0) {
            console.log('No upcoming events found');

            return;
        }

        const formattedData = JSON.stringify(events)

        return ContentService.createTextOutput(formattedData).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        console.log('Failed with error %s', err.message);
    }
}

function doPost(postPackage) {
    const calendarId = 'primary';
    const optionalArgs = {
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        timeMin: postPackage.postData.timeMin,
        timeMax: postPackage.postData.timeMax,
    };

    try {
        const response = Calendar.Events.list(calendarId, optionalArgs);
        const events = response.items.filter(event => {
            return event.summary.includes('Manchu');
        });

        if (events.length === 0) {
            console.log('No upcoming events found');

            return;
        }

        const formattedData = JSON.stringify(events)

        return ContentService.createTextOutput(formattedData).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        console.log('Failed with error %s', err.message);
    }
}