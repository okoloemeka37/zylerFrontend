export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }
  
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted!");
    } else {
      console.log("Notification permission denied!");
    }
  };
  