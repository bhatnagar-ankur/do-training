// login function
function loginUser(username) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (username) {
        resolve("User " + username + " logged in successfully");
      } else {
        reject("Login failed: Username is empty");
      }
    }, 1000);
  });
}

// getting user data
function getUserData(username) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (username == "Prathyusha_Asam") {
        var userData = {
          username: username,
          name: "Prathyusha",
          age: 22,
          email: "asam.p@saksoft.com"
        };
        resolve(userData);
      } else {
        reject("User data not found for: " + username);
      }
    }, 2000);
  });
}

// dashboard display
function displayDashboard(data) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (!data || !data.name || !data.email) {
        reject("Dashboard error: Incomplete user data");
      } else {
        var dashboard = `
        Dashboard display
        Name: ${data.name}
        Email: ${data.email}
        Age: ${data.age}
        `;
        resolve(dashboard);
      }
    }, 1000);
  });
}

// to run the flow
var username = "Prathyusha_Asam"; 

loginUser(username)
  .then(function(message) {
    console.log(message);
    return getUserData(username);
  })
  .then(function(userData) { 
    console.log("User Data Retrieved:", userData); 
    return displayDashboard(userData);
  })
  .then(function(dashboardMessage) {
    console.log(dashboardMessage);
  })
  .catch(function(error) {
    console.log(" Error:", error);
  });
