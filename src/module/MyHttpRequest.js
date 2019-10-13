export function postTapData(tapInfoArray) {
    const processData = (tapInfoArray) => {
        return JSON.stringify({
            user: "kame",
            device: "ipad9.7",
            tapInfo: tapInfoArray,
        });
    }

    $.ajax({
        type: "post",
        url: "https://us-central1-invisiblesplitkeyboard.cloudfunctions.net/helloWorld",
        data: processData(tapInfoArray),
        contentType: 'application/json',
        dataType: "json",
        success: () => {
            console.log("success!!!");
        },
        error: (e) => {
            console.log(e)
        },
        complete: () => {
        }
    })
}