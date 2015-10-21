var btToken;
$.get("/token", function (token) {
    btToken = token;
    console.log(btToken);
});