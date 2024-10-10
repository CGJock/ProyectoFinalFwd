// Guarda datos en localStorage
export const saveToLocalStorage = (key, value) => {
    if (value) {
        localStorage.setItem(key, value);
    }
};

// Recupera datos de localStorage
export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
};

// Convierte un archivo (imagen) a base64
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });
};
