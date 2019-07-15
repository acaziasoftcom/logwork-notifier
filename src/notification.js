function sendNotification() {
  if (isNotificable()) {
    var noti = new Notification(
      'Nhớ log work nhé!',
      {
        icon: '../icons/icon48.png',
        body: 'Không log work là bị trừ lương!'
      }
    );

    noti.onclick = function() {
      noti.close();
    }
  }
}

function isNotificable() {
  return Notification && Notification.permission === 'granted'
}

function initNotifications(){
	if (!Notification) {
    console.error('Desktop notifications not available in your browser.'); 
    return;
  }

  if (Notification.permission === "default")
    Notification.requestPermission();
}

function createAlarm() {
  chrome.alarms.create('Logwork Alarm', {
    delayInMinutes: 0.1, periodInMinutes: 1
  });
}

chrome.runtime.onInstalled.addListener(function() {
  createAlarm();
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
  var date = new Date();
  if (date.getHours() === 16 && date.getMinutes() === 0) {
    sendNotification();
  }
});

initNotifications();
