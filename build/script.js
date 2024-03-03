// Sample JavaScript logic with a button click event
document.getElementById('analyzeButton').addEventListener('click', () => {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        analyzeChat(data);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid JSON file.');
    }
  });  function calculateResponseTime(previousTimestamp, currentTimestamp) {
    return currentTimestamp - previousTimestamp;
}
  // Function to analyze chat data
  function analyzeChat(data) {
    const messageCounts = {};
    const userResponseTimes = {};
    data.messages.forEach((message,index,messages) => {
      const sender = message.from;
      const userId = message.from_id;
      
      messageCounts[sender] = (messageCounts[sender] || 0) + 1;
      if(index>0){
        const previousMessage = messages[index - 1];
        const responseTime = calculateResponseTime(previousMessage.date_unixtime, message.date_unixtime);

        if (!userResponseTimes[userId] || responseTime < userResponseTimes[userId]) {
            userResponseTimes[userId] = responseTime;
        }
      }
    });
    const fastestResponder = Object.keys(userResponseTimes).reduce((a, b) =>
    userResponseTimes[a] < userResponseTimes[b] ? a : b
);
    const mostActiveSender = Object.keys(messageCounts).reduce((a, b) => messageCounts[a] > messageCounts[b] ? a : b);
    
    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>The Most Talkative User:</h3>
    <p>User: ${mostActiveSender}</p>
    <p>Total Messages: ${messageCounts[mostActiveSender]}</p>
    <h3>Fastest Responder:</h3>
    <p>User: ${fastestResponder}</p>
    <p>Response Time: ${userResponseTimes[fastestResponder]} seconds</p>
    `;
  }
