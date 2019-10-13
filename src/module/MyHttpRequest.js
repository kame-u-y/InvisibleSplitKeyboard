export function postTapData(tapInfoArray) {
    $.ajax({
        type: "post",
        url: "https://us-central1-invisiblesplitkeyboard.cloudfunctions.net/helloWorld",
        data: JSON.stringify(tapInfoArray),
        contentType: 'application/json',
        dataType: "json",
        success: (jsonData) => {
            if (!jsonData[0]) {
                alert("Transaction error. " + jsonData[1]);
                return;
            }
            console.log("success!!!");
        },
        error: () => {
            alert("error")
        },
        complete: () => {
        }
    })
}