//User Login Function.
async function login() {
    const formData = new FormData();
    formData.append('email', 'malik.yousaf3339@gmail.com');
    formData.append('password', 'abcd1234');

    let response = await fetch('https://amiotaliouniversity.herokuapp.com/api/v1/login', {
        method: "post",
        headers: {
            Accept: "application/json"
        },
        body: formData
    });
    let result = await response.json();
    return result;
}

async function refreshToken() {
    let response = await fetch('https://amiotaliouniversity.herokuapp.com/api/v1/getNewAccesToken', {
        method: "post",
        headers: {
            Accept: "application/json",
            Credentials: "include"
        },
    });
    let result = await response.json();
    return result;
}


//first form check unique user email

async function newUser() {
    const formData = new FormData();
    formData.append('email', 'emailsssss@example.com');
    let response = await fetch('https://amiotaliouniversity.herokuapp.com/api/v1/newUser', {
        method: "post",
        headers: {
            Accept: "application/json"
        },
        body: formData
    });

    let result = await response.json();
    return result;
}

//User Register Function
async function register() {
    const formData = new FormData();
    formData.append('name', 'malik');
    formData.append('email', 'malik.yousaf3339@gmail.com');
    formData.append('password', 'abcd1234');
    formData.append('phone', '07424327530');
    formData.append('age', 16);
    formData.append('agree', 1);
    formData.append('terms', 0);
    formData.append('invest', 1);
    formData.append('joinVip', 1);
    formData.append('mentorship', 0);
    formData.append('message', 'long string');
    formData.append('learnExpand', 1);
    formData.append('learnBusiness', 1);
    formData.append('learnTrade', 0);
    formData.append('learnCryptoInvest', 1);
    formData.append('learnCrypto', 1);
    formData.append('learnCryptoNew', 1);


    let response = await fetch('https://amiotaliouniversity.herokuapp.com/api/v1/register', {
        method: "post",
        headers: {
            Accept: "application/json"
        },
        body: formData
    });

    let result = await response.json();
    return result;
}



async function logout() {
    const formData = new FormData();
    formData.append('email', 'malik.yousaf3339@gmail.com');
    formData.append('password', 'abcd1234');

    let response = await fetch('https://amiotaliouniversity.herokuapp.com/api/v1/logout', {
        method: "get",
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMGY3YTE2NjFiODEwYzU5MTdmMjc2MDMyNDFmMzNiZjliMDI0NzFkNTI0NGY3ZWMxMGJkMzI5OGQwYTVhNjE3YjRhYjc2NTJkY2MwODQwODYiLCJpYXQiOjE2NDIyNjE5ODUuMjM5MDEsIm5iZiI6MTY0MjI2MTk4NS4yMzkwMTUsImV4cCI6MTY3Mzc5Nzk4NC4yMTAxNzcsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.eyXj0DU-ncYo1m8sq4w-BEkF8408yEePAgz-N1JmK9w8p8wBIcU9TZQmhgz_mx5WFtFypXPVplzoyPaNEuKS7OhzRBdT2EF22BdpYT5TzNXZTcZfQwo4aiXXYa1C7jpiuywquRXq56bUtWK0SRzMQzOE4aY5rxkalvVQf-x4pzFoQFEqOXPfDtd3O4Nz3e9debgeK8ow9pF9Q7aR492APLWwI_Bb6B6K2m_08Dg17GWJy-uysulYyGkZs0dwXowYiyUz33pIVoiald-mbsXMdsE5P8Sf1o-_u5w1OLit2Rnn9MaCtfYCovRWx5y5RqHaosgXZ2PB_MYhlX2GLfMYHS0RVUhVXNTHh3vbxjNqAO-1Hzqd3-NTnIfIwTgDyPZv2yLcfs3u1WriMNpTegFxakKO_ae9aJ06-g555YWjoO-FsTCLJJjNuXZ2vQbsSGkdciqB1p0CcPxTS2cM4kWqYoBXxmqvZd4LW3TyxgmTsr98kFSGevblTjtlz1z-Dy0sF3N0SoNTdE_3jBWb1o3SODtQlKKLVyY30LwdIRekR9j8RspfxvRMAOVLmtAhjy-SBYnEOjCYGiFlrjbbIQ71FoC7S-GL7ciLqaGY0TAQoJZIq7kAO8ErQIdHugy2zmz2N6DAgo5KVFjWV44SlJWuYVWiemVPPFK71DUGsPrMLxU"
        }
    });
    let result = await response.json();
    return result;
}
