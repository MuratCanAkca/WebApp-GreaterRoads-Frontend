import secureLocalStorage from "react-secure-storage"

const authHeader = () => {

    const token = secureLocalStorage.getItem("token");

    let header = {};

    if(token){

        header = {Authorization: `Bearer ${token}`};

    }

    return header;

}

export default authHeader;
//token işlemlerını her seferde tek yek yapmamak ıcın boyle yaptık