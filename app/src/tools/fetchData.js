/**
 * 
 */
export default function(url,params){
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: "json",
            body: JSON.stringify({ ...params })
        }).then(
            response => {
                if (response.status === 200) {
                    return response;
                }else{
                    reject(response.status)
                }
            }
        ).then(
            response => {
                return response.json()
            }
        ).then(
            response => {
                resolve(response);
            }
        )
    });
}